import React from 'react'
import { useEffect } from 'react';
import { ActivityIndicator, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { Formik } from 'formik';
import { Input } from 'components';
import { NativeBaseProvider } from 'native-base';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import { setParentId, setChildId, setPaired } from 'config/slices/pairingSlice';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import databaseErrorMessageParse from 'utils/databaseErrorMessageParse';
import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from 'styles/colors';
import styles from './Pairing.style'
const Pairing = () => {

    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [token, setToken] = React.useState('');
    const userid = auth().currentUser.uid;
    const dispatch = useDispatch();
    useEffect(() => {
        database()
            .ref('userDetails')
            .once('value')
            .then(snapshot => {
                for (let i in snapshot.val()) {
                    if (snapshot.val()[i].userid === userid) {
                        setUsername(snapshot.val()[i].username);
                    }
                }
            })
        getFCMToken();
    }, [])
    const getFCMToken = async () => {
        await messaging()
            .getToken()
            .then(token => {
                setToken(token);
            });
    };
    const handleSendCode = async (formValues) => {
        setLoading(true);
        let count = 0;
        if ((formValues.code).length < 6 || (formValues.code).length > 6) {
            showMessage({
                message: 'Hata',
                description: 'Lütfen 6 haneli kodu giriniz.',
                backgroundColor: colors.main_pink,
                icon: 'danger',
                duration: 3000,
            })
            setLoading(false);
            return;
        }
        await database()
            .ref('parentPairingCodes')
            .once('value')
            .then(snapshot => {
                for (let i in snapshot.val()) {
                    if (snapshot.val()[i].pairingCode == formValues.code) {
                        if (snapshot.val()[i].isPaired == false) {
                            database()
                                .ref('pairingTable')
                                .push({
                                    parentid: snapshot.val()[i].userid,
                                    parentmail: snapshot.val()[i].usermail,
                                    childid: userid,
                                    childmail: auth().currentUser.email,
                                    parenttoken: snapshot.val()[i].token,
                                    childtoken: token,
                                })
                                .then(() => {
                                    database()
                                        .ref('parentPairingCodes')
                                        .child(i)
                                        .update({
                                            isPaired: true,
                                        })
                                        .then(() => {
                                            showMessage({
                                                message: 'Eşleştirme Başarılı',
                                                description: 'Ebeveyn hesabıyla eşleştirme tamamlandı.',
                                                backgroundColor: colors.main_green,
                                                icon: 'success',
                                                duration: 3000,
                                            })
                                            dispatch(setParentId(snapshot.val()[i].userid));
                                            dispatch(setChildId(userid));
                                            dispatch(setPaired(true));
                                        })
                                        .catch((error) => {
                                            showMessage({
                                                message: 'Hata',
                                                description: databaseErrorMessageParse(error.code),
                                                backgroundColor: colors.main_pink,
                                                icon: 'danger',
                                            })
                                            database()
                                                .ref('pairingTable')
                                                .child(i)
                                                .remove()
                                                .then(() => {
                                                    database()
                                                        .ref('parentPairingCodes')
                                                        .child(i)
                                                        .update({
                                                            isPaired: false,
                                                        })
                                                })
                                        })
                                })
                                .catch((error) => {
                                    showMessage({
                                        message: 'Hata',
                                        description: databaseErrorMessageParse(error.code),
                                        backgroundColor: colors.main_pink,
                                        icon: 'danger',
                                    })
                                })
                        }
                        else {
                            showMessage({
                                message: 'Hata',
                                description: 'Bu ebeveyn cihazı zaten bir çocuk cihazı ile bağlı.',
                                backgroundColor: colors.main_pink,
                                icon: 'danger',
                            })
                        }
                    }
                    else count++;
                }
                if (count === Object.keys(snapshot.val()).length) {
                    showMessage({
                        message: 'Geçersiz kod.',
                        description: 'Lütfen ebeveyn ekranındaki kodu giriniz.',
                        backgroundColor: colors.main_pink,
                        icon: 'danger',
                    })
                    return;
                }
            })
            .catch((error) => {
                showMessage({
                    message: 'Hata',
                    description: databaseErrorMessageParse(error.code),
                    backgroundColor: colors.main_pink,
                    icon: 'danger',
                    duration: 3000,
                })
            })
            .finally(() => {
                setLoading(false);
            })

    }
    handleLogout = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('assets/images/bg_full.png')}
                style={styles.bg_image}>
                <TouchableOpacity style={styles.logout_button} onPress={handleLogout}>
                    <Icon name="logout" style={styles.logout_button_icon} />
                </TouchableOpacity>
                <View style={styles.pairing_view}>
                    <View style={styles.greeting_view}>
                        <Text style={styles.greeting_text}>Hoş geldin
                            <Text style={styles.greeting_text_child}> {username}</Text>.
                        </Text>
                        <Text style={styles.greeting_text}>Seni burada görmek çok güzel!</Text>
                        <Text style={styles.pairing_text}>
                            Uygulamayı kullanmaya başlamak için ebeveyninin seninle paylaştığı kodu aşağıya girmelisin.
                        </Text>
                    </View>
                    <View style={styles.formik_view}>
                        <Formik initialValues={{ code: '' }} onSubmit={handleSendCode}>
                            {({ handleChange, handleSubmit, values }) => (
                                <>
                                    <NativeBaseProvider>
                                        <Input
                                            placeholder="Eşleştirme Kodu" leftIcon='key-arrow-right' type='text'
                                            value={values.code}
                                            onChangeText={handleChange('code')}
                                        />
                                        <TouchableOpacity style={styles.send_code_button} onPress={handleSubmit} >
                                            {loading ? (
                                                <ActivityIndicator color={colors.main_white} />
                                            ) : (
                                                <Text style={styles.send_code_button_text}>Kodu Gönder</Text>
                                            )}
                                        </TouchableOpacity>
                                    </NativeBaseProvider>
                                </>
                            )}
                        </Formik>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Pairing
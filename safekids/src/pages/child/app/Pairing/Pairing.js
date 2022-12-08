import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { Formik } from 'formik';
import { Input } from 'components';
import { NativeBaseProvider } from 'native-base';
import { showMessage } from 'react-native-flash-message';
import {useDispatch} from "react-redux";
import {setPaired} from "redux/pairing/pairingSlice";
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import databaseErrorMessageParse from 'utils/databaseErrorMessageParse';
import colors from 'styles/colors';
import styles from './Pairing.style'
import {pairingChildAsync} from "redux/pairing/pairingSlice";
const Pairing = () => {

    const userid = auth().currentUser.uid;
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        getUserName().catch((error) => {
            console.log(error);
        });
        getFCMToken().then(token => {
            setToken(token);
        })
    }, [])

    useEffect(() => {
        dispatch(pairingChildAsync(userid))
    });

    async function getUserName(){
        database().ref('userDetails').once('value').then(snapshot => {
            for (let i in snapshot.val()) {
                if (snapshot.val()[i].userid === userid) {
                    setUsername(snapshot.val()[i].username);
                }
            }
        })
    }
    const getFCMToken = async () => {
        await messaging().getToken().then(token => {
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
        await database().ref('pairingCodes').once('value').then(snapshot => {
            for (let i in snapshot.val()) {
                if (snapshot.val()[i].pairingCode === formValues.code) {
                    if (snapshot.val()[i].isPaired === false) {
                        database().ref('pairingCodes/' + i).update({
                            isPaired: true,
                            childid: userid,
                            childemail: auth().currentUser.email,
                            childname: username,
                            childtoken: token,
                        })
                        database().ref('pairingChild/' + userid).update({
                            isPaired: true,
                            parentid: snapshot.val()[i].parentid,
                            parentemail: snapshot.val()[i].parentemail,
                            childid: userid,
                            childemail: auth().currentUser.email,
                            parenttoken: snapshot.val()[i].childtoken,
                            childtoken: token,
                            parentname: snapshot.val()[i].parentname,
                            childname: username,
                        }).then(() => {
                            database().ref('pairingCodes').child(i).update({
                                isPaired: true,
                            }).then(() => {
                                showMessage({
                                    message: 'Eşleştirme Başarılı',
                                    description: 'Ebeveyn hesabıyla eşleştirme tamamlandı.',
                                    backgroundColor: colors.main_green,
                                    icon: 'success',
                                    duration: 3000,
                                })
                                dispatch(setPaired(true));
                            }).catch((error) => {
                                showMessage({
                                    message: 'Hata',
                                    description: databaseErrorMessageParse(error.code),
                                    backgroundColor: colors.main_pink,
                                    icon: 'danger',
                                })
                                database().ref('pairingChild/' + userid).child(i).remove().then(() => {
                                    database().ref('pairingCodes').child(i).update({
                                        isPaired: false,
                                    })
                                })
                            })
                        }).catch((error) => {
                            showMessage({
                                message: 'Hata',
                                description: databaseErrorMessageParse(error.code),
                                backgroundColor: colors.main_pink,
                                icon: 'danger',
                            })
                        })
                    } else {
                        showMessage({
                            message: 'Hata',
                            description: 'Bu ebeveyn cihazı zaten bir çocuk cihazı ile bağlı.',
                            backgroundColor: colors.main_pink,
                            icon: 'danger',
                        })
                    }
                } else count++;
            }
            if (count === Object.keys(snapshot.val()).length) {
                showMessage({
                    message: 'Geçersiz kod.',
                    description: 'Lütfen ebeveyn ekranındaki kodu giriniz.',
                    backgroundColor: colors.main_pink,
                    icon: 'danger',
                })
                return
            }
        }).catch((error) => {
            showMessage({
                message: 'Hata',
                description: databaseErrorMessageParse(error.code),
                backgroundColor: colors.main_pink,
                icon: 'danger',
                duration: 3000,
            })
        }).finally(() => {
            setLoading(false);
        })
    }
    async function handleLogout () {
       await auth().signOut().then(r=> console.log(r))
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('assets/images/bg_full.png')} style={styles.bg_image}>
                <TouchableOpacity style={styles.logout_button} onPress={handleLogout}>
                    <Icon name="logout" style={styles.logout_button_icon} />
                </TouchableOpacity>
                <View style={styles.pairing_view}>
                    <View style={styles.greeting_view}>
                        <Text style={styles.greeting_text}>Hoş geldin  <Text style={styles.greeting_text_child}> {username}</Text>.</Text>
                        <Text style={styles.greeting_text}>Seni burada görmek çok güzel!</Text>
                        <Text style={styles.pairing_text}>Uygulamayı kullanmaya başlamak için ebeveyninin seninle paylaştığı kodu aşağıya girmelisin.</Text>
                    </View>
                    <View style={styles.formik_view}>
                        <Formik initialValues={{ code: '' }} onSubmit={handleSendCode}>
                            {({ handleChange, handleSubmit, values }) => (
                                <>
                                    <NativeBaseProvider>
                                        <Input placeholder="Eşleştirme Kodu" leftIcon='key-arrow-right' type='text' value={values.code} onChangeText={handleChange('code')}/>
                                        <TouchableOpacity style={styles.send_code_button} onPress={handleSubmit} >
                                            {loading ? (
                                                <ActivityIndicator color={colors.main_white} />
                                            ) : (
                                                <Text style={styles.send_code_button_text}>Kodu Gönder</Text>
                                            )
                                            }
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

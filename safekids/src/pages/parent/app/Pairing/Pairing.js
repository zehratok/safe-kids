import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { setChildId, setParentId, setPaired } from 'config/slices/pairingSlice';
import { showMessage } from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from 'styles/colors';
import styles from './Pairing.style'

const Pairing = () => {

    const userid = auth().currentUser.uid;
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

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
        setCode(makeid(6))
        database()
            .ref('parentPairingCodes')
            .once('value')
            .then(snapshot => {
                for (let i in snapshot.val()) {
                    if (snapshot.val()[i].pairingCode == code) {
                        setCode(makeid(6));
                    }
                }
            })
        database()
            .ref('pairingTable')
            .on('child_added', snapshot => {
                if (snapshot.val().parentid === userid) {
                    showMessage({
                        message: 'Eşleştirme Başarılı',
                        description: 'Çocuk hesabıyla eşleştirme tamamlandı.',
                        backgroundColor: colors.main_green,
                        icon: 'success',
                        duration: 3000,
                    })
                    dispatch(setParentId(snapshot.val().parentid));
                    dispatch(setChildId(snapshot.val().childid));
                    dispatch(setPaired(true));
                }
            })
    }, [])

    function handleLogOut() {
        auth().signOut()
    }
    function handleGetCode() {
        setLoading(true);
        database()
            .ref('parentPairingCodes')
            .once('value')
            .then(snapshot => {
                for (let i in snapshot.val()) {
                    if (snapshot.val()[i].userid == userid) {
                        database()
                            .ref('parentPairingCodes')
                            .child(i)
                            .update({
                                pairingCode: code
                            })
                    }
                }
            })
        setShowCode(true);
        setLoading(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('assets/images/bg_full.png')}
                style={styles.bg_image}>
                <TouchableOpacity style={styles.logout_button} onPress={handleLogOut}>
                    <Icon name="logout" style={styles.logout_button_icon} />
                </TouchableOpacity>
                <View style={styles.pairing_view}>
                    <View style={styles.greeting_view}>
                        <Text style={styles.greeting_text}>Hoş geldin
                            <Text style={styles.greeting_text_child}> {username}</Text>.
                        </Text>
                        <Text style={styles.greeting_text}>Seni burada görmek çok güzel!</Text>
                        <Text style={styles.pairing_text}>
                            {showCode ? 'Aşağıdaki kodu çocuğun cihazına girerek eşleştirme işlemini tamamlamalısın.' : 'Uygulamayı kullanmaya başlamak için eşleştirme kodunu alman gerekiyor.'}
                        </Text>
                    </View>
                    <View style={styles.code_view}>
                        {!showCode ? (
                            <TouchableOpacity style={styles.get_code_button} onPress={handleGetCode}>
                                {loading ? (<ActivityIndicator color={colors.main_white} />
                                ) : (
                                    <Text style={styles.get_code_button_text}>Kodu Al</Text>)}
                            </TouchableOpacity>
                        ) : (
                            <Text style={styles.code_text}>{code}</Text>
                        )}
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Pairing
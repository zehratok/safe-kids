import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from 'styles/colors';
import styles from './Pairing.style'
import { useDispatch } from 'react-redux';
import { setChildId, setParentId, setPaired } from 'config/slices/pairingSlice';
import { showMessage } from 'react-native-flash-message';

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
    function handleCompletePairing() {
        setLoading(true);
        database()
            .ref('pairingTable')
            .once('value')
            .then(snapshot => {
                let count = 0;
                for (let i in snapshot.val()) {
                    if (snapshot.val()[i].parentid == userid) {
                        dispatch(setPaired(true));
                        dispatch(setParentId(snapshot.val()[i].parentid));
                        dispatch(setChildId(snapshot.val()[i].childid));
                        showMessage({
                            message: "Eşleşme Başarılı",
                            description: "Çocuk hesabıyla eşleştirme tamamlandı.",
                            backgroundColor: colors.main_green,
                            icon: "success",
                            duration: 3000
                        })
                    }
                   else count++;
                }
                if (count == Object.keys(snapshot.val()).length) {
                    showMessage({
                        message: "Eşleşme Bulunamadı.",
                        description: "Kodunuzu çocuğunuzla paylaşın ve eşleşmeyi tamamlayın.",
                        backgroundColor: colors.main_pink,
                        icon: "danger",
                        duration: 3000
                    })
                }
            })
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
                    {!showCode ? (
                        <View style={styles.code_view}>
                            <TouchableOpacity style={styles.get_code_button} onPress={handleGetCode}>
                                {loading ? (<ActivityIndicator color={colors.main_white} />
                                ) : (
                                    <Text style={styles.get_code_button_text}>Kodu Al</Text>)}
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.code_view}>
                            <Text style={styles.code_text}>{code}</Text>
                            <TouchableOpacity style={styles.complete_pairing_button} onPress={handleCompletePairing}>
                                {loading ? (<ActivityIndicator color={colors.main_white} />) : (
                                    <Text style={styles.complete_pairing_button_text}>Eşleştirme İşlemini Tamamla</Text>)}
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Pairing
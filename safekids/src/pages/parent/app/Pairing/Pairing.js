import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from "react-redux";
import { setPaired } from "redux/pairing/pairingSlice";
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import colors from 'styles/colors';
import styles from './Pairing.style'
import {pairingParentAsync} from "redux/pairing/pairingSlice";

const Pairing = () => {

    const userid = auth().currentUser.uid;
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(pairingParentAsync(userid));
    });
    useEffect(() => {
        getUserName().catch((error) => {
            console.log(error);
        });
        isPairing().catch((err) => {
            console.log(err);
        })
    }, [])

    function makeid(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    async function getUserName () {
        await  database()
            .ref('userDetails')
            .once('value')
            .then(snapshot => {
                for (let i in snapshot.val()) {
                    if (snapshot.val()[i].userid === userid) {
                        setUsername(snapshot.val()[i].username);
                    }
                }
            })
    }
   async function isPairing (){
     setCode(makeid(6))
     await  database().ref('pairingCodes').once('value').then(snapshot => {
         for (let i in snapshot.val()) {
             if (snapshot.val()[i].pairingCode === code) {
                 setCode(makeid(6));
             }
         }
         database().ref('pairingCodes').on('child_changed', snapshot => {
             if(snapshot.val().parentid === userid){
                 if(snapshot.val().isPaired === true){
                     database().ref('pairingParent/' + userid).update({
                         isPaired: true,
                         parentid: snapshot.val().parentid,
                         parentemail: snapshot.val().usermail,
                         childid: snapshot.val().childid,
                         childemail: snapshot.val().childemail,
                         parenttoken: snapshot.val().childtoken,
                         childtoken: snapshot.val().childtoken,
                         parentname: snapshot.val().parentname,
                         childname: snapshot.val().childname,
                     })
                     showMessage({
                         message: 'Eşleştirme Başarılı',
                         description: 'Çocuk hesabıyla eşleştirme tamamlandı.',
                         backgroundColor: colors.main_green,
                         icon: 'success',
                         duration: 3000,
                     });
                     dispatch(setPaired(true))
                 }
             }
         })
     })
   }

    async function handleLogOut() {
      await auth().signOut().then(r => console.log(r))
    }

    async function handleGetCode() {
       setLoading(true);
       await database().ref('pairingCodes').once('value').then(snapshot => {
           for (let i in snapshot.val()) {
               if (snapshot.val()[i].parentid === userid) {
                   database()
                       .ref('pairingCodes')
                       .child(i)
                       .update({
                           pairingCode: code
                       }).then(r => {console.log(r)})
                   }
               }
           })
       setShowCode(true);
       setLoading(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('assets/images/bg_full.png')} style={styles.bg_image}>
                <TouchableOpacity style={styles.logout_button} onPress={handleLogOut}>
                    <Icon name="logout" style={styles.logout_button_icon} />
                </TouchableOpacity>
                <View style={styles.pairing_view}>
                    <View style={styles.greeting_view}>
                        <Text style={styles.greeting_text}>Hoş geldin <Text style={styles.greeting_text_child}> {username}</Text>.</Text>
                        <Text style={styles.greeting_text}>Seni burada görmek çok güzel!</Text>
                        <Text style={styles.pairing_text}>{showCode ? 'Aşağıdaki kodu çocuğun cihazına girerek eşleştirme işlemini tamamlamalısın.' : 'Uygulamayı kullanmaya başlamak için eşleştirme kodunu alman gerekiyor.'}</Text>
                    </View>
                    <View style={styles.code_view}>
                        {!showCode ?
                            ( <TouchableOpacity style={styles.get_code_button} onPress={handleGetCode}>
                                {loading ?
                                    ( <ActivityIndicator color={colors.main_white} /> ) :
                                    ( <Text style={styles.get_code_button_text}>Kodu Al</Text> )
                                }
                            </TouchableOpacity> ) :
                            ( <Text style={styles.code_text}>{code}</Text> )
                        }
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default Pairing

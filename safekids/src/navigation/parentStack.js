import React from 'react'
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Pairing } from 'pages/parent/app/index.js';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import ParentTab from './parentTab'
const Stack = createNativeStackNavigator();

const parentStack = () => {

    const [pairing, setPairing] = useState(false);

    useEffect(() => {
        database()
            .ref('pairingTable')
            .once('value')
            .then(snapshot => {
                for (let i in snapshot.val()) {
                    if (snapshot.val()[i].parentid === auth().currentUser.uid) {
                        setPairing(true);
                    }
                }
            })
    }, [])


    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!pairing ? (
                <Stack.Screen name="Pairing" component={Pairing} />
            ) : (
                <Stack.Screen name="Parent Home" component={ParentTab} />
            )}
        </Stack.Navigator>
    )
}
export default parentStack
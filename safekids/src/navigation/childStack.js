import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChildTab from './childTab';
import { Loading } from 'pages/both/app';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { Pairing } from 'pages/child/app';
const Stack = createNativeStackNavigator();

const ChildStack = ({ pairingg }) => {
    const [pairing, setPairing] = useState(false);


    useEffect(() => {
        console.log("calisiyor");
        database()
            .ref('pairingTable')
            .once('value')
            .then(snapshot => {
                for (let i in snapshot.val()) {
                    if (snapshot.val()[i].childid === auth().currentUser.uid) {
                        setPairing(true);
                    }
                }
            })

    }, [])

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {(pairing || pairingg) ? (
                <Stack.Screen name='Child Home' component={ChildTab} />
            ) : (
                !pairing ? (
                    <>
                        <Stack.Screen name="Pairing" component={Pairing} />
                        {/* <Stack.Screen name="childStack" component={ChildStack} /> */}
                    </>
                ) : (
                    <Stack.Screen name="Loading" component={Loading} />
                )
            )}
        </Stack.Navigator>
    )
}
export default ChildStack
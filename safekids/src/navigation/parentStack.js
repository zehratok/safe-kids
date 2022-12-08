import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Loading } from 'pages/both/app';
import { Pairing } from 'pages/parent/app';
import auth from '@react-native-firebase/auth';
import ParentTab from './parentTab'
import {pairingParentAsync} from "redux/pairing/pairingSlice";
import database from "@react-native-firebase/database";

const Stack = createNativeStackNavigator();

const parentStack = () => {

    const [pairing, setPairing] = useState(2);
    const isPaired = useSelector((state) => state.pairing.isPaired);
    const parentid = useSelector((state) => state.pairing.parentid);
    const userid = auth().currentUser.uid;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pairingParentAsync(userid))
        if(isPaired && parentid === userid){setPairing(1)}
    });

    useEffect(() => {
        isPairing().catch((error) => console.log(error));
    }, [])
    async function isPairing () {
        await database().ref('pairingParent/' + userid).once('value').then((snapshot) => {
            if(snapshot.val().isPaired === true){
                setPairing(1)
            }
            else {
                setPairing(0)
            }
        })
    }
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
         {pairing === 0 ? (
                <Stack.Screen name="Pairing" component={Pairing} />
            ) : (
                pairing === 1 ? (
                    <Stack.Screen name="Parent Home" component={ParentTab} />
                ) : (
                    <Stack.Screen name="Loading" component={Loading} />
                )
            )}
        </Stack.Navigator>
    )
}
export default parentStack

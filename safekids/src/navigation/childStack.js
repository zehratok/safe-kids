import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { setChildId, setParentId, setPaired } from 'config/slices/pairingSlice';
import { Loading } from 'pages/both/app';
import { Pairing } from 'pages/child/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import ChildTab from './childTab';

const Stack = createNativeStackNavigator();

const childStack = () => {

    const [pairing, setPairing] = useState(2);
    const isPaired = useSelector((state) => state.pairing.isPaired);
    const childId = useSelector((state) => state.pairing.childId);
    const dispatch = useDispatch();
    const userid = auth().currentUser.uid;

    useEffect(() => {
        if (isPaired && (childId == userid)) {
            setPairing(1);
        }
        database()
            .ref('pairingTable')
            .once('value')
            .then(snapshot => {
                let count = 0;
                for (let i in snapshot.val()) {
                    if (snapshot.val()[i].childid == userid) {
                        dispatch(setPaired(true));
                        dispatch(setParentId(snapshot.val()[i].parentid));
                        dispatch(setChildId(snapshot.val()[i].childid));
                        setPairing(1);
                    }
                    else count++;
                }
                if (count == Object.keys(snapshot.val()).length) setPairing(0);
            })
    }, [])

    useEffect(() => {
        if (isPaired && (childId == userid)) {
            setPairing(1);
        }
        database()
            .ref('pairingTable')
            .once('value')
            .then(snapshot => {
                let count = 0;
                for (let i in snapshot.val()) {
                    if (snapshot.val()[i].childid == userid) {
                        dispatch(setPaired(true));
                        dispatch(setParentId(snapshot.val()[i].parentid));
                        dispatch(setChildId(snapshot.val()[i].childid));
                        setPairing(1);
                    }
                    else count++;
                }
                if (count == Object.keys(snapshot.val()).length) setPairing(0);
            })
    });

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {pairing == 0 ? (
                <Stack.Screen name="Pairing" component={Pairing} />
            ) : (
                pairing == 1 ? (
                    <Stack.Screen name='Child Home' component={ChildTab} />
                ) : (
                    <Stack.Screen name="Loading" component={Loading} />
                )
            )}
        </Stack.Navigator>
    )
}
export default childStack
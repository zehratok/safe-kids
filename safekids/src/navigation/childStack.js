import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChildTab from './childTab';
import LoadingStack from './loadingStack';
import { useEffect } from 'react';
const Stack = createNativeStackNavigator();

const childStack = () => {

    useEffect(() => {
        return () => {
            < LoadingStack />
        }
    }, []);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Child Home' component={ChildTab} />
        </Stack.Navigator>
    )
}
export default childStack
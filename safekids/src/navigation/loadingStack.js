import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Loading} from 'pages/both/app/index.js'

const Stack = createNativeStackNavigator();
const LoadingStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Loading" component={Loading} />
        </Stack.Navigator>
    )
}
export default LoadingStack
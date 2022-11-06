import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ParentHome from 'pages/parent/app/Home/Home'
import ParentProfile from 'pages/parent/app/Profile/Profile'

const Stack = createNativeStackNavigator();

const parentStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Parent Home" component={ParentHome} />
            <Stack.Screen name="Parent Profile" component={ParentProfile} />
        </Stack.Navigator>
    )
}
export default parentStack
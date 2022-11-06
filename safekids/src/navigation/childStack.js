import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChildHome from 'pages/child/app/Home/Home'
import ChildProfile from 'pages/child/app/Profile/Profile'

const Stack = createNativeStackNavigator();

const childStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Child Home" component={ChildHome} />
            <Stack.Screen name="Child Profile" component={ChildProfile} />
        </Stack.Navigator>
    )
}
export default childStack
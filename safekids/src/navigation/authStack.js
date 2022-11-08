import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ResetPassword, Welcome } from 'pages/both/auth/index';
import { ChildLogin, ChildRegister } from 'pages/child/auth/index';
import { ParentLogin, ParentRegister } from 'pages/parent/auth/index';

const Stack = createNativeStackNavigator();

const authStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Forgot Password" component={ResetPassword} />
            <Stack.Screen name="Parent Login" component={ParentLogin} />
            <Stack.Screen name="Parent Register" component={ParentRegister} />
            <Stack.Screen name="Child Login" component={ChildLogin} />
            <Stack.Screen name="Child Register" component={ChildRegister} />
        </Stack.Navigator>
    )
}

export default authStack
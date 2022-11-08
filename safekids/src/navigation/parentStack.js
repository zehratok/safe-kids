import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ParentTab from './parentTab'
const Stack = createNativeStackNavigator();

const parentStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Parent Home" component={ParentTab} />
        </Stack.Navigator>
    )
}
export default parentStack
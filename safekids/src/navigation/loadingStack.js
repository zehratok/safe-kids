import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from 'pages/both/loading/Loading';

const Stack = createNativeStackNavigator();
const loadingStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Loading" component={Loading} />
        </Stack.Navigator>
    )
}
export default loadingStack
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from './pages/both/welcome/Welcome'
import Password from './pages/both/password_reset/Password'
import ParentLogin from './pages/parent/auth/Login/Login'
import ParentRegister from './pages/parent/auth/Register/Register'
import ChildLogin from './pages/child/auth/Login/Login'
import ChildRegister from './pages/child/auth/Register/Register'
import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();

export default () => {
  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Forgot Password" component={Password} />
        <Stack.Screen name="Parent Login" component={ParentLogin} />
        <Stack.Screen name="Parent Register" component={ParentRegister} />
        <Stack.Screen name="Child Login" component={ChildLogin} />
        <Stack.Screen name="Child Register" component={ChildRegister} />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}

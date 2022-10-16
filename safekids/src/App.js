import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from './pages/welcome/Welcome'
import ParentLogin from './pages/parent/auth/Login/Login'
import ParentRegister from './pages/parent/auth/Register/Register'
import ChildLogin from './pages/child/auth/Login/Login'
import ChildRegister from './pages/child/auth/Register/Register'

const Stack = createNativeStackNavigator();

export default () => {
  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Parent Login" component={ParentLogin} />
        <Stack.Screen name="Parent Register" component={ParentRegister} />
        <Stack.Screen name="Child Login" component={ChildLogin} />
        <Stack.Screen name="Child Register" component={ChildRegister} />
      </Stack.Navigator>
    )
  }
 

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

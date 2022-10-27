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
import auth from '@react-native-firebase/auth';
import ParentHome from './pages/parent/app/home/Home'
import ChildHome from './pages/child/app/home/Home'
import ParentProfile from './pages/parent/app/profile/Profile'
import ChildProfile from './pages/child/app/profile/Profile'
const Stack = createNativeStackNavigator();

export default ({ userType }) => {
  const [userSession, setUserSession] = React.useState();
  const [child, setChild] = React.useState(false);

  userType = 'parent'
  if (userType === 'child') {
    setChild(true)
  }

  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setUserSession(!!user);
    });
  }, []);

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
  const ParentStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Parent Home" component={ParentHome} />
        <Stack.Screen name="Parent Profile" component={ParentProfile} />
      </Stack.Navigator>
    )
  }
  const ChildStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Child Home" component={ChildHome} />
        <Stack.Screen name="Child Profile" component={ChildProfile} />
      </Stack.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userSession ? (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        ) : (
          child ? (
            <Stack.Screen name="ChildStack" component={ChildStack} />
          ) : (
            <Stack.Screen name="ParentStack" component={ParentStack} />
          )
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}

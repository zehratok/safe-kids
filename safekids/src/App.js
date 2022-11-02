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
import database from '@react-native-firebase/database';
import ParentHome from './pages/parent/app/home/Home'
import ChildHome from './pages/child/app/home/Home'
import ParentProfile from './pages/parent/app/profile/Profile'
import ChildProfile from './pages/child/app/profile/Profile'
import Loading from './pages/both/loading/Loading'
const Stack = createNativeStackNavigator();

export default () => {
  const [userSession, setUserSession] = React.useState();
  const [child, setChild] = React.useState(false);
  const [parent, setParent] = React.useState(false);
  const [usertype, setUsertype] = React.useState('');

  React.useEffect(() => {
    if (userSession) {
      const userid = auth().currentUser.uid;
      database()
        .ref('userDetails')
        .once('value')
        .then(snapshot => {
          for (let i in snapshot.val()) {
            if (snapshot.val()[i].userid === userid) {
              setUsertype(snapshot.val()[i].usertype);
            }
          }
        });
      if (usertype == 1) {
        setChild(false);
        setParent(true);
      }
      else if (usertype != 2) {
        setParent(false);
        setChild(true)
      }
    }
  });

  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setUserSession(!!user);
      if (user == null) {
        setChild(false);
        setParent(false);
      }

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
          ) : (parent ? (
            <Stack.Screen name="ParentStack" component={ParentStack} />
          )
            :
            (
              <Stack.Screen name="Loading" component={Loading} />
            )
          )
        )
        }
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}

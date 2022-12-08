import React, {useEffect} from 'react'
import { Provider } from 'react-redux';
import {store} from './redux/store';
import { NavigationContainer } from '@react-navigation/native'
import { AuthStack, ChildStack, LoadingStack, ParentStack } from 'navigation';
import FlashMessage from "react-native-flash-message";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Router = () => {
  const [userSession, setUserSession] = React.useState();
  const [child, setChild] = React.useState(false);
  const [parent, setParent] = React.useState(false);
  const [usertype, setUsertype] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [userid, setUserid] = React.useState('');

  useEffect(() => {
    setUserType().then(() => {
      console.log('user type set');
    });
    isLogin().then(r => {
      console.log('isLogin', r);
    });
  }, []);

  useEffect(() => {
    setUserType().then(() => {
      console.log('user type set');
    });
    isLogin().then(r => {
      console.log('isLogin', r);
    });
  });

  async function setUserType() {
    if (userSession) {
      await database().ref('userDetails').once('value').then(snapshot => {
        for (let i in snapshot.val()) {
          if (snapshot.val()[i].userid === userid) {
            setUsertype(snapshot.val()[i].usertype);
            console.log('usertype', usertype);
          }
          if (usertype === 1) {
            setChild(false);
            setParent(true);
            setLoading(false);
          } else if (usertype === 2) {
            setParent(false);
            setChild(true);
            setLoading(false);
          } else {
            setParent(false);
            setChild(false);
            setLoading(false);
          }
        }
      });
    } else if (!userSession){
        setParent(false);
        setChild(false);
        setLoading(false);
    }
  }
 async function isLogin () {
  await auth().onAuthStateChanged((user) => {
     setUserSession(!!user);
     if (user == null) {
       setChild(false);
       setParent(false);
       setLoading(false);
     } else {
       setUserid(user.uid);
     }
   });
 }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {
          loading ? ( <LoadingStack /> ) :
            ( !userSession ? ( <AuthStack /> ) :
              ( child ? (<ChildStack /> ) :
                ( parent ? (<ParentStack /> ) :
                  ( <LoadingStack /> )
                )
              )
           )
        }
        <FlashMessage position="top" />
      </NavigationContainer>
    </Provider>
  )
}
export default Router

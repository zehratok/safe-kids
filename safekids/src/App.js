import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from 'navigation/authStack'
import ParentStack from 'navigation/parentStack'
import ChildStack from 'navigation/childStack'
import LoadingStack from 'navigation/loadingStack'
import FlashMessage from "react-native-flash-message";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const App = () => {
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
      else if (usertype == 2) {
        setParent(false);
        setChild(true)
      }
    }
  });
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

  return (
    <NavigationContainer>
      {!userSession ? (
        <AuthStack />
      ) : (
        child ? (
          <ChildStack />
        ) : (parent ? (
          <ParentStack />
        ) :
          (
            <LoadingStack />
          )
        )
      )}
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}
export default App
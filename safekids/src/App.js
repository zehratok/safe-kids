import React from 'react'
import { Provider } from 'react-redux';
import store from 'config/store';
import { NavigationContainer } from '@react-navigation/native'
import { AuthStack, ChildStack, LoadingStack, ParentStack } from 'navigation/index';
import FlashMessage from "react-native-flash-message";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const App = () => {
  const [userSession, setUserSession] = React.useState();
  const [child, setChild] = React.useState(false);
  const [parent, setParent] = React.useState(false);
  const [usertype, setUsertype] = React.useState('');
  const [loading, setLoading] = React.useState(true);

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
        setLoading(false);
      }
      else if (usertype == 2) {
        setParent(false);
        setChild(true);
        setLoading(false);
      }
      else {
        setParent(false);
        setChild(false);
        setLoading(false);
      }
    }
  });
  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setUserSession(!!user);
      if (user == null) {
        setChild(false);
        setParent(false);
        setLoading(false);
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {loading ? (
          <LoadingStack />
        ) : (
          !userSession ? (
            <AuthStack />
          ) : (
            child ? (
              <ChildStack />
            ) : (
              parent ? (
                <ParentStack />
              ) : (
                <LoadingStack />
              )
            )
          )
        )}
        <FlashMessage position="top" />
      </NavigationContainer>
    </Provider>
  )
}
export default App
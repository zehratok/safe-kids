import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';

const Profile = () => {

  function handleLogOut() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
console.log(makeid(6));

  return (
    <View>
      <Text>Child Profile</Text>
      <TouchableOpacity style={{ borderWidth: 1, borderColor: "blue", margin: 25, width: 100, color: "white", backgroundColor: "pink" }} onPress={handleLogOut}>
        <Text>Çıkış yap</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile
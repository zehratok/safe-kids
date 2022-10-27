import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Profile = () => {

  function handleLogOut() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
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
import { Text, SafeAreaView, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './Welcome.style'
const Welcome = (props) => {

  function parentRouter() {
    props.navigation.navigate('Parent Login');
  }
  function childRouter() {
    props.navigation.navigate('Child Login');
  }

  return (
    <SafeAreaView style={styles.container} >
      <Text style={styles.header_text}>SAFE KIDS </Text>
      <Text style={styles.welcome_text}>Hoş Geldiniz!</Text>
      <View style={styles.button_container}>
        <TouchableOpacity style={styles.button_parents} onPress={parentRouter}>
          <Image style={styles.parents_image} source={require('../../assets/images/parents.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_child} onPress={childRouter}>
          <Image style={styles.boy_image} source={require('../../assets/images/child_boy.png')} />
          <Image style={styles.girl_image} source={require('../../assets/images/child_girl.png')} />
        </TouchableOpacity>
      </View>
      <Text style={styles.choice_text}>
        Uygulamayı kullanmaya başlamak için lütfen profil seçiniz.
      </Text>
    </SafeAreaView>
  )
}

export default Welcome
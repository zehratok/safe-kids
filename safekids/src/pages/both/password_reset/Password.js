import React from 'react'
import { Image, ImageBackground, ScrollView, View } from 'react-native'
import { NativeBaseProvider, StatusBar } from "native-base";
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/TextInput'
import styles from './Password.style';

const Password = () => {

  return (
    <ScrollView style={styles.container}
      showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#B0CFD5" barStyle="light-content" />
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bg_image}>
      </ImageBackground>
      <View style={styles.bottom_view}>
        <View style={styles.password_image_view}>
          <Image style={styles.password_image} source={require('../../../assets/images/password.png')} />
        </View>
        <View style={styles.form_view}>
          <NativeBaseProvider>
            <Input label='E-posta Adresinizi Girin' placeholder="E-posta" leftIcon='email' type='text' />
            <Button text='Parolamı Sıfırla' onPress={() => console.log("deneme")} />
          </NativeBaseProvider>
        </View>
      </View>

    </ScrollView >
  )
}

export default Password

import React from 'react'
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native'
import { NativeBaseProvider, StatusBar } from "native-base";
import { Link } from '@react-navigation/native'
import Button from '../../../../components/Button/Button'
import Input from '../../../../components/Input/TextInput'
import styles from './Login.style';

const Login = () => {

  const [show, setShow] = React.useState(false);


  return (
    <ScrollView style={styles.container}
      showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#B0CFD5" barStyle="light-content" />
      <ImageBackground
        source={require('../../../../assets/images/background.png')}
        style={styles.bg_image}>
      </ImageBackground>
      <View style={styles.bottom_view}>
        <View style={styles.parents_image_view}>
          <Image style={styles.parents_image} source={require('../../../../assets/images/parents.png')} />
        </View>
        <View style={styles.form_view}>
          <NativeBaseProvider>
            <Input label='E-posta Adresinizi Girin' placeholder="E-posta" leftIcon='email' />
            <Input label='Parolanızı Girin' placeholder="Parola" leftIcon='lock'
              type={show ? "text" : "password"}
              onPress={() => setShow(!show)} rightIcon={show ? "eye" : "eye-off"} />
            <Link to={{ screen: 'Forgot Password' }} style={styles.forgot_password_view}>
              <Text style={styles.forgot_password_text}>Parolanızı mı unuttunuz?</Text>
            </Link>
            <Button text='Giriş Yap' onPress={() => console.log("deneme")} />
          </NativeBaseProvider>
          <Text style={styles.question_text}> Hesabınız yok mu? {' '}
            <Link to={{ screen: 'Parent Register' }} >
              <Text style={styles.register_link_text}>Hemen kaydolun.</Text>
            </Link>
          </Text>
        </View>
      </View>

    </ScrollView >
  )
}

export default Login

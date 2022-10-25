import React from 'react'
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native'
import { NativeBaseProvider, StatusBar } from "native-base";
import Button from '../../../../components/Button/Button'
import Input from '../../../../components/Input/TextInput'
import styles from './Register.style';
import { Link } from '@react-navigation/native';

const Register = () => {

  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
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
            <Input label='Kullanıcı Adı Girin' placeholder="Kullanıcı adı" leftIcon='account' />
            <Input label='E-posta Adresi Girin' placeholder="E-posta" leftIcon='email' />
            <Input label='Parola Girin' placeholder="Parola" leftIcon='lock'
              onPress={() => setShow(!show)} rightIcon={show ? "eye" : "eye-off"}
              type={show ? "text" : "password"}
            />
            <Input label='Parolanızı Doğrulayın' placeholder="Parola Tekrar" leftIcon='lock'
              onPress={() => setShow2(!show2)} rightIcon={show2 ? "eye" : "eye-off"}
              type={show2 ? "text" : "password"}
            />
            <Button text='Kaydol' onPress={() => console.log("deneme")} />
          </NativeBaseProvider>
          <Link to={{ screen: 'Parent Login' }} style={styles.login_link_view} >
            <Text style={styles.login_link_text}> Zaten bir hesabınız var mı? Giriş yapın. </Text>
          </Link>
        </View>
      </View>
    </ScrollView >
  )
}

export default Register

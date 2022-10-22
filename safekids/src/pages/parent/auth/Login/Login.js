import { View, Text, ScrollView, ImageBackground, Image } from 'react-native'
import React from 'react'
import styles from './Login.style';
import { Stack, Pressable, Center, NativeBaseProvider, CheckIcon, CheckCircleIcon, Box, FormControl, StatusBar } from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Input from '../../../../components/Input/TextInput'
import Button from '../../../../components/Button/Button'
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
            <Button text='Giriş Yap' />
          </NativeBaseProvider>
          <Text style={styles.question_text}> Hesabınız yok mu?
            <Text style={styles.link_text}> {''} Hemen kaydolun. </Text>
          </Text>
        </View>
      </View>

    </ScrollView >
  )
}

export default Login

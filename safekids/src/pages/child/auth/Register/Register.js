import React from 'react'
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native'
import { NativeBaseProvider, Stack, StatusBar } from "native-base";
import Button from '../../../../components/Button/Button'
import Input from '../../../../components/Input/TextInput'
import styles from './Register.style';
import { Link } from '@react-navigation/native';
import { Formik } from 'formik';
const Register = () => {

  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);

  const initialFormValues = {
    username: '',
    usermail: '',
    password: '',
    passwordCheck: ''

  };
  function handleRegister(formValues) {
    console.log(formValues);
  }

  return (
    <ScrollView style={styles.container}
      showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#B0CFD5" barStyle="light-content" />
      <ImageBackground
        source={require('../../../../assets/images/background.png')}
        style={styles.bg_image}>
      </ImageBackground>
      <View style={styles.bottom_view}>
        <View style={styles.child_image_view}>
          <Image style={styles.boy_image} source={require('../../../../assets/images/child_boy.png')} />
          <Image style={styles.girl_image} source={require('../../../../assets/images/child_girl.png')} />
        </View>
        <View style={styles.form_view}>
          <Formik initialValues={initialFormValues} onSubmit={handleRegister}>
            {({ handleChange, handleSubmit, values }) => (
              <>
                <NativeBaseProvider>
                  <Input
                    placeholder="Kullanıcı adı" leftIcon='account' type='text'
                    label='Kullanıcı Adı Girin' value={values.username}
                    onChangeText={handleChange('username')}
                  />
                  <Input
                    placeholder="E-posta" leftIcon='email' type='text'
                    label='E-posta Adresi Girin' value={values.usermail}
                    onChangeText={handleChange('usermail')}
                  />
                  <Input
                    placeholder="Parola" leftIcon='lock'
                    label='Parola Girin' rightIcon={show ? "eye" : "eye-off"}
                    onPress={() => setShow(!show)} type={show ? "text" : "password"}
                    value={values.password} onChangeText={handleChange('password')}
                  />
                  <Input placeholder="Parola Tekrar" leftIcon='lock'
                    label='Parolanızı Doğrulayın' rightIcon={show2 ? "eye" : "eye-off"}
                    onPress={() => setShow2(!show2)} type={show2 ? "text" : "password"}
                    value={values.passwordCheck} onChangeText={handleChange('passwordCheck')}
                  />
                  <Button text='Kaydol' onPress={handleSubmit} />
                </NativeBaseProvider>
              </>
            )}
          </Formik>
          <Link to={{ screen: 'Child Login' }} style={styles.login_link_view} >
            <Text style={styles.login_link_text}> Zaten bir hesabınız var mı? Giriş yapın. </Text>
          </Link>
        </View>
      </View>
    </ScrollView >
  )
}

export default Register

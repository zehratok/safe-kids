import React from 'react'
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native'
import { NativeBaseProvider, StatusBar } from "native-base";
import { Link } from '@react-navigation/native'
import { Formik } from 'formik';
import Button from '../../../../components/Button/Button'
import Input from '../../../../components/Input/TextInput'
import styles from './Login.style';

const Login = () => {

  const [show, setShow] = React.useState(false);

  const initialFormValues = {
    usermail: '',
    password: ''
  };

  function handleLogin(formValues) {
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
          <Formik initialValues={initialFormValues} onSubmit={handleLogin}>
            {({ handleChange, handleSubmit, values }) => (
              <>
                <NativeBaseProvider>
                  <Input
                    placeholder="E-posta" leftIcon='email'
                    label='E-posta Adresinizi Girin'
                    type='text' value={values.usermail}
                    onChangeText={handleChange('usermail')}
                  />
                  <Input
                    placeholder="Parola" leftIcon='lock'
                    label='Parolanızı Girin' value={values.password}
                    type={show ? "text" : "password"}
                    onPress={() => setShow(!show)}
                    rightIcon={show ? "eye" : "eye-off"}
                    onChangeText={handleChange('password')}
                  />
                  <Button text='Giriş Yap' onPress={handleSubmit} />
                </NativeBaseProvider>
              </>
            )}
          </Formik>
          <Link to={{ screen: 'Child Register' }} style={styles.register_link_view} >
            <Text style={styles.register_link_text}> Hesabınız yok mu? Hemen kaydolun.</Text>
          </Link>
          <Link to={{ screen: 'Forgot Password' }} style={styles.forgot_password_view}>
            <Text style={styles.forgot_password_text}>Parolanızı mı unuttunuz?</Text>
          </Link>
        </View>
      </View>

    </ScrollView >
  )
}

export default Login

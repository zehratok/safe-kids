import React from 'react'
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native'
import { NativeBaseProvider, StatusBar } from "native-base";
import { Link } from '@react-navigation/native';
import { Formik } from 'formik';
import Button from '../../../../components/Button/Button'
import Input from '../../../../components/Input/TextInput'
import styles from './Register.style';

const Register = () => {

  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);

  initialFormValues = {
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
        <View style={styles.parents_image_view}>
          <Image style={styles.parents_image} source={require('../../../../assets/images/parents.png')} />
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
                    label='Parola Girin' value={values.password}
                    onPress={() => setShow(!show)}
                    rightIcon={show ? "eye" : "eye-off"}
                    type={show ? "text" : "password"}
                    onChangeText={handleChange('password')}
                  />
                  <Input
                    placeholder="Parola Tekrar" leftIcon='lock'
                    label='Parolanızı Doğrulayın' value={values.passwordCheck}
                    onPress={() => setShow2(!show2)}
                    rightIcon={show2 ? "eye" : "eye-off"}
                    type={show2 ? "text" : "password"}
                    onChangeText={handleChange('passwordCheck')}
                  />
                  <Button text='Kaydol' onPress={handleSubmit} />
                </NativeBaseProvider>
              </>
            )}
          </Formik>
          <Link to={{ screen: 'Parent Login' }} style={styles.login_link_view} >
            <Text style={styles.login_link_text}> Zaten bir hesabınız var mı? Giriş yapın. </Text>
          </Link>
        </View>
      </View>
    </ScrollView >
  )
}

export default Register

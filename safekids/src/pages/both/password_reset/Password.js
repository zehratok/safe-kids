import React from 'react'
import { Image, ImageBackground, ScrollView, View } from 'react-native'
import { NativeBaseProvider, StatusBar } from "native-base";
import { Formik } from 'formik';
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/TextInput'
import styles from './Password.style';

const Password = () => {

  function handleResetPassword(formValues) {
    console.log(formValues);
  }


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
          <Formik initialValues={{ usermail: '' }} onSubmit={handleResetPassword}>
            {({ handleChange, handleSubmit, values }) => (
              <>
                <NativeBaseProvider>
                  <Input
                    placeholder="E-posta" leftIcon='email' type='text'
                    label='E-posta Adresinizi Girin' value={values.usermail}
                    onChangeText={handleChange('usermail')}
                  />
                  <Button text='Parolamı Sıfırla' onPress={handleSubmit} />
                </NativeBaseProvider>
              </>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView >
  )
}

export default Password

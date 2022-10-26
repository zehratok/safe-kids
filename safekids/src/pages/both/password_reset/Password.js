import React from 'react'
import { Image, ImageBackground, ScrollView, View } from 'react-native'
import { NativeBaseProvider, StatusBar } from "native-base";
import { Formik } from 'formik';
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/TextInput'
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';
import colors from '../../../styles/colors';
import styles from './Password.style';

const Password = () => {

  const [loading, setLoading] = React.useState(false);

  async function handleResetPassword(formValues) {
    if (formValues.usermail === '') {
      showMessage({
        message: 'Lütfen e-posta adresinizi giriniz.',
        backgroundColor: colors.main_pink,
      });
      return;
    }
    if (formValues.usermail.indexOf('@') === -1 || formValues.usermail.indexOf('.') === -1 || formValues.usermail.indexOf(' ') !== -1) {
      showMessage({
        message: 'Lütfen geçerli bir e-posta adresi giriniz.',
        backgroundColor: colors.main_pink,
      });
      return;
    }
    try {
      setLoading(true);
      await auth().sendPasswordResetEmail(formValues.usermail)
      showMessage({
        message: 'Şifre sıfırlama e-postası gönderildi.',
        backgroundColor: colors.main_green,
      });
    } catch (error) {
      showMessage({
        message: authErrorMessageParser(error.code),
        backgroundColor: colors.main_pink,
      });
    } finally {
      setLoading(false);
    }
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
                  <Button text='Parolamı Sıfırla' onPress={handleSubmit} loading={loading} />
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

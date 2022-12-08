import React, { useEffect } from 'react'
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native'
import { NativeBaseProvider, StatusBar } from "native-base";
import { Formik } from 'formik';
import { Link } from '@react-navigation/native'
import { showMessage } from 'react-native-flash-message';
import {Button, Input} from 'components/index'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import authErrorMessageParser from 'utils/authErrorMessageParser';
import colors from 'styles/colors';
import styles from './Login.style';

const Login = () => {

  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const initialFormValues = {
    usermail: '',
    password: ''
  };

  const handleLoginTest = async (formValues) => {
    if (!formValues.usermail) {
      showMessage({
        message: 'Lütfen e-posta adresinizi giriniz.',
        backgroundColor: colors.main_pink,
      });
      return;
    }
    if (formValues.usermail.indexOf(' ') !== -1) {
      showMessage({
        message: 'E-posta adresinizde boşluk olamaz.',
        backgroundColor: colors.main_pink,
      });
      return;
    }
    if (formValues.usermail.indexOf('@') === -1 || formValues.usermail.indexOf('.') === -1) {
      showMessage({
        message: 'Lütfen geçerli bir e-posta adresi giriniz.',
        backgroundColor: colors.main_pink,
      });
      return;
    }
    if (!formValues.password) {
      showMessage({
        message: 'Lütfen parolanızı giriniz.',
        backgroundColor: colors.main_pink,
      });
      return;
    }
    if (formValues.password.length < 6) {
      showMessage({
        message: 'Parolanız en az 6 karakter olmalıdır.',
        backgroundColor: colors.main_pink,
      });
      return;
    }
    try {
      setLoading(true);
      await database()
        .ref('userDetails')
        .once('value')
        .then(snapshot => {
          let count = 0;
          for (let i in snapshot.val()) {
            if (snapshot.val()[i].usermail === formValues.usermail) {
              if (snapshot.val()[i].usertype === 1) {
                handleParentLogin(formValues);
              }
              else if (snapshot.val()[i].usertype === 2) {
                showMessage({
                  message: 'Bu e-posta adresi çocuk hesabına aittir. Çocuk girişi için lütfen çocuk giriş sayfasına gidiniz.',
                  backgroundColor: colors.main_pink,
                });
              }
            }
            else count++;
          }
          if (count === Object.keys(snapshot.val()).length) {
            showMessage({
              message: 'Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.',
              backgroundColor: colors.main_pink,
            });
            count = 0;
          }
        });
    } catch (error) {
      showMessage({
        message: authErrorMessageParser(error.code),
        backgroundColor: colors.main_pink,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleParentLogin = async (formValues) => {
    try {
      await auth().signInWithEmailAndPassword(
        formValues.usermail,
        formValues.password
      );
      showMessage({
        message: 'Giriş Başarılı',
        backgroundColor: colors.main_green,
      });
      // dispatch(setUserId(auth().currentUser.uid));
      database()
        .ref('userDetails/')
        .once('value')
        .then(snapshot => {
          for (let i in snapshot.val()) {
            if (snapshot.val()[i].userid === auth().currentUser.uid) {
             // dispatch(setUserName(snapshot.val()[i].username));
            }
          }
        });
    } catch (error) {
      showMessage({
        message: authErrorMessageParser(error.code),
        backgroundColor: colors.main_pink,
      });
    }
  }

  useEffect(() => {
    return () => {
      console.log('...unmounting');
    };
  }, []);
  return (
    <ScrollView style={styles.container}
      showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={colors.main_blue} barStyle="light-content" />
      <ImageBackground
        source={require('assets/images/background.png')}
        style={styles.bg_image}>
      </ImageBackground>
      <View style={styles.bottom_view}>
        <View style={styles.parents_image_view}>
          <Image style={styles.parents_image} source={require('assets/images/parents.png')} />
        </View>
        <View style={styles.form_view}>
          <Formik initialValues={initialFormValues} onSubmit={handleLoginTest}>
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
                  <Button text='Giriş Yap' onPress={handleSubmit} loading={loading} />
                </NativeBaseProvider>
              </>
            )}
          </Formik>
          <Link to={{ screen: 'Parent Register' }} style={styles.register_link_view} >
            <Text style={styles.register_link_text}> Hesabınız yok mu? Hemen kaydolun. </Text>
          </Link>
          <Link to={{ screen: 'Forgot Password' }} style={styles.forgot_password_view}>
            <Text style={styles.forgot_password_text}>Parolanızı mı unuttunuz?</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  )
}
export default Login

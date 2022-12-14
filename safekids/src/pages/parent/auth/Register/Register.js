import React, { useEffect } from 'react'
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native'
import { NativeBaseProvider, StatusBar } from "native-base";
import { Link } from '@react-navigation/native';
import { Formik } from 'formik';
import { showMessage } from 'react-native-flash-message';
import { Button, Input } from 'components/index'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import authErrorMessageParser from 'utils/authErrorMessageParser';
import colors from 'styles/colors';
import messaging from '@react-native-firebase/messaging';
import styles from './Register.style';

const Register = () => {

  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [token, setToken] = React.useState('');

  const initialFormValues = {
    username: '',
    usermail: '',
    password: '',
    passwordCheck: '',
  };
  useEffect(() => {
    getFCMToken();

  }, []);

  const getFCMToken = () => {
    messaging()
      .getToken()
      .then(token => {
        setToken(token);
      });
  };

  async function handleRegister(formValues) {
    const parentPairingValues = {
      isPaired: false,
      pairingCode: '',
      parenttoken: token,
      parentid: '',
      parentemail: formValues.usermail,
      parentname: formValues.username,
    }
    const userDetailsValues = {
      userid: '',
      username: formValues.username,
      usermail: formValues.usermail,
      usertype: 1,
    };
    if (!formValues.username) {
      showMessage({
        message: 'Lütfen kullanıcı adınızı giriniz.',
        backgroundColor: colors.main_pink,
      });
      return;
    }
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
    if (!formValues.passwordCheck) {
      showMessage({
        message: 'Lütfen parolanızı tekrar giriniz.',
        backgroundColor: colors.main_pink,
      });
      return;
    }
    if (formValues.password !== formValues.passwordCheck) {
      showMessage({
        message: 'Parolalar eşleşmiyor',
        backgroundColor: colors.main_pink,
      });
      return;
    }
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(
        formValues.usermail,
        formValues.password
      );
      userDetailsValues.userid = auth().currentUser.uid;
      parentPairingValues.parentid = auth().currentUser.uid;
      const uid = auth().currentUser.uid;
      await database().ref('userDetails/').push(userDetailsValues);
      await database().ref('pairingCodes/').push(parentPairingValues);
      await database().ref('pairingParent/' +uid).update({isPaired:false});
      showMessage({
        message: 'Kayıt Başarılı',
        backgroundColor: colors.main_green,
      });
    } catch (error) {
      showMessage({
        message: authErrorMessageParser(error.code),
        backgroundColor: colors.main_pink,
      })
    } finally {
      setLoading(false);
    }
  }
  return (
    <ScrollView style={styles.container}
      showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#B0CFD5" barStyle="light-content" />
      <ImageBackground
        source={require('assets/images/background.png')}
        style={styles.bg_image}>
      </ImageBackground>
      <View style={styles.bottom_view}>
        <View style={styles.parents_image_view}>
          <Image style={styles.parents_image} source={require('assets/images/parents.png')} />
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
                  <Button text='Kaydol' onPress={handleSubmit} loading={loading} />
                </NativeBaseProvider>
              </>
            )}
          </Formik>
          <Link to={{ screen: 'Parent Login' }} style={styles.login_link_view} >
            <Text style={styles.login_link_text}> Zaten bir hesabınız var mı? Giriş yapın. </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  )
}
export default Register

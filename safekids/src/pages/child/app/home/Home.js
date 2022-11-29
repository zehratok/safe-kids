import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Greeting, IconButton } from 'components';
import { showMessage } from 'react-native-flash-message';
import NotificationService from 'services/NotificationService';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import styles from './Home.style'
import colors from 'styles/colors';

const Home = () => {

  const greetingMessage = 'Kendini nasıl hissediyorsun? Aşağıdaki butonlarla kendini ifade edebilirsin.';
  const [mood, setMood] = useState(null);
  const [parentToken, setParentToken] = useState('');
  const notification = {
    title: 'Çocuğunuzdan bildirim var!',
    body: 'Çocuğunuzun duygularını değiştirdiğini gördük. Lütfen ona yardımcı olun.',
    token: parentToken
  }

  useEffect(() => {
    database()
      .ref('pairingTable')
      .once('value')
      .then(snapshot => {
        for (let i in snapshot.val()) {
          if (snapshot.val()[i].childid == auth().currentUser.uid) {
            setParentToken(snapshot.val()[i].parenttoken);
          }
        }
      });
  }, [])

  const handleMoodChange = async (mood) => {
    setMood(mood);
    await database()
      .ref('moods/' + auth().currentUser.uid)
      .set({ mood: mood })
      .then(() => showMessage({
        message: 'Durum bildirimi gönderildi.',
        backgroundColor: colors.main_blue,
        color: colors.white,
        duration: 3000,
        icon: 'success',
      }))
      .catch((error) => showMessage({
        message: error,
        backgroundColor: colors.main_pink,
      }));
    NotificationService.sendSingleDeviceNotification({ notification });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greeting_view}>
        <Greeting greetingMessage={greetingMessage} />
      </View>
      <View style={styles.quick_actions_view}>
        <IconButton icon="MaterialCommunityIcons" iconName="emoticon-outline" onPress={() => handleMoodChange('happy')} />
        <IconButton icon="MaterialCommunityIcons" iconName="emoticon-kiss-outline" onPress={() => handleMoodChange('excited')} />
        <IconButton icon="MaterialCommunityIcons" iconName="emoticon-sad-outline" onPress={() => handleMoodChange('sad')} />
        <IconButton icon="MaterialCommunityIcons" iconName="emoticon-sick-outline" onPress={() => handleMoodChange('sick')} />
        <IconButton icon="MaterialCommunityIcons" iconName="emoticon-angry-outline" onPress={() => handleMoodChange('angry')} />
      </View>
    </SafeAreaView>
  )
}

export default Home
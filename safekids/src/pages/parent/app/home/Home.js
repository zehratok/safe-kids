import React, { useEffect, useState } from 'react';
import {  View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Greeting, IconButton } from 'components';
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import styles from './Home.style';

const Home = () => {
  const [childMood, setChildMood] = useState(null);
  const childname = useSelector(state => state.pairing.childname);
  const [greetingMessage, setGreetingMessage] = useState(childname + '\'tan bir durum bildirimi alınmadı. Onu aşağıdaki butonlarla kontrol edebilirsin.');
  const childid = useSelector((state) => state.pairing.childid);
  const mood = { happy: 'happy', excited: 'excited', sad: 'sad', sick: 'sick', angry: 'angry' };
  useEffect(() => {
    database()
      .ref('moods/' + childid)
      .once('value')
      .then(snapshot => {
        setChildMood(snapshot.val().mood);
      })
      .catch((error) => console.log(error));

    database()
      .ref('moods/' + childid)
      .on('child_changed', snapshot => {
        console.log(snapshot.val());
        setChildMood(snapshot.val());
      });
  }, []);

  useEffect(() => {
    if (childMood === mood.happy) {
      setGreetingMessage(childname + ' her şeyin yolunda olduğunu bildirdi. Keyfine bak!');
    } else if (childMood === mood.excited) {
      setGreetingMessage(childname + ' sevgi dolu hissediyor, keyfi yerinde. Sen de keyfine bak!');
    } else if (childMood === mood.sad) {
      setGreetingMessage(childname + '  üzgün olduğunu bildirdi. Onu sevindirmek için bir şeyler yapabilirsin.');
    } else if (childMood === mood.sick) {
      setGreetingMessage(childname + ' hasta olduğunu bildirdi. Onu kontrol etmen gerekebilir.');
    } else if (childMood === mood.angry) {
      setGreetingMessage(childname + ' bir şeylere sinirlenmiş görünüyor. Ters giden bir şey olabilir.');
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greeting_view}>
        <Greeting greetingMessage={greetingMessage} type='parent' />
      </View>
      <View style={styles.quick_actions_view}>
        <IconButton icon="MaterialIcons" iconName="location-pin" />
        <IconButton icon="FontAwesome5" iconName="microphone-alt" />
        <IconButton icon="Ionicons" iconName="battery-charging-outline" />
        <IconButton icon="FontAwesome" iconName="volume-up" />
        <IconButton icon="FontAwesome5" iconName="mobile-alt" />
      </View>
    </SafeAreaView>
  )
}

export default Home

import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Greeting } from 'components';
import styles from './Home.style';

const Home = () => {
  const [greetingMessage, setGreetingMessage] = React.useState('Çocuktan bir durum bildirimi alınmadı. Onu aşağıdaki butonlarla kontrol edebilirsin.');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greeting_view}>
        <Greeting greetingMessage={greetingMessage} />
      </View>
    </SafeAreaView>
  )
}

export default Home
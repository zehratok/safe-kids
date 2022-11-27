import React from 'react'
import { useState } from 'react';
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Greeting, IconButton } from 'components';
import styles from './Home.style'

const Home = () => {

  const [greetingMessage, setGreetingMessage] = useState('Kendini nasıl hissediyorsun? Aşağıdaki butonlarla kendini ifade edebilirsin.')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greeting_view}>
        <Greeting greetingMessage={greetingMessage} />
      </View>
      <View style={styles.quick_actions_view}>
        <IconButton icon="MaterialCommunityIcons" iconName="emoticon-outline" />
        <IconButton icon="MaterialCommunityIcons" iconName="emoticon-kiss-outline" />
        <IconButton icon="MaterialCommunityIcons" iconName="emoticon-sad-outline" />
        <IconButton icon="MaterialCommunityIcons" iconName="emoticon-sick-outline" />
        <IconButton icon="MaterialCommunityIcons" iconName="emoticon-angry-outline" />
      </View>
    </SafeAreaView>
  )
}

export default Home
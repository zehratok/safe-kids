import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Link } from '@react-navigation/native'
import styles from './Home.style'

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 40, textAlign: 'center' }}>CHILD HOME</Text>
    </SafeAreaView>
  )
}

export default Home
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {auth} from '@react-native-firebase/auth'

const App = () => {
  return (
    <SafeAreaView>
      <Text style={styles.deneme}>Alaska</Text>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})
import { View, Text } from 'react-native'
import React from 'react'
import { Link } from '@react-navigation/native'

const Home = () => {
  return (
    <View>
      <Text>Child Home</Text>
      <Link to={{ screen: 'Child Profile' }} style={{ color: 'blue' }}> Profile git</Link>
    </View>
  )
}

export default Home
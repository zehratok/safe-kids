import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import styles from './Button.style'

const Button = ({ text, onPress, loading }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.button_text}>{text}</Text>
        )}
      </TouchableOpacity>
  )
}
export default Button

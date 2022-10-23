import React from 'react'
import { ActivityIndicator, Text } from 'react-native'
import { Box, Button } from 'native-base'
import styles from './Button.style'
 
const Buttons = ({ text, onPress, loading, icon }) => {
  return (
    <Box style={styles.container}>
      <Button onPress={onPress}
        w="85%"
        disabled={loading}
        style={styles.button_container}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.button_text}>{text}</Text>
        )}
      </Button>
    </Box >
  )
}

export default Buttons
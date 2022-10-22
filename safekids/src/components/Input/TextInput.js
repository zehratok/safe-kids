import { View, Text } from 'react-native'
import React from 'react'
import { Box, FormControl, Input, Pressable } from 'native-base'
import styles from './TextInput.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const TextInput = ({ label, placeholder, leftIcon, type, onPress, rightIcon }) => {
  return (
    <View style={styles.container}>
      <Box>
        <FormControl>
          <FormControl.Label
            _text={{ color: '#537F8A', fontSize: 'sm', fontWeight: 'bold' }}
            style={styles.label}>
            {label}
          </FormControl.Label>
          <Input style={styles.input}
            variant="rounded"
            keyboardType="email-address"
            placeholder={placeholder}
            type={type}
            InputLeftElement={
              <MaterialCommunityIcons name={leftIcon} style={styles.left_icon} />
            }
            InputRightElement={
              <Pressable onPress={onPress}>
                <MaterialCommunityIcons name={rightIcon} style={styles.right_icon} />
              </Pressable>
            }
          />
        </FormControl>
      </Box>
    </View>
  )
}

export default TextInput

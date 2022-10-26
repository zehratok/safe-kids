import { View } from 'react-native'
import React from 'react'
import { Box, FormControl, Input, Pressable } from 'native-base'
import styles from './TextInput.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const TextInput = ({ label, leftIcon, onChangeText, onPress, rightIcon, placeholder, type, value, }) => {
  return (
    <View style={styles.container}>
      <Box>
        <FormControl>
          <FormControl.Label
            _text={{ color: '#537F8A', fontSize: 'sm', fontWeight: 'bold' }}
            style={styles.label}>
            {label}
          </FormControl.Label>
          <Input
            value={value}
            onChangeText={onChangeText}
            type={type}
            style={styles.input}
            variant="rounded"
            placeholder={placeholder}
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

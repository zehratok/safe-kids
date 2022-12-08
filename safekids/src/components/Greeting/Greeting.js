import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import styles from './Greeting.style'

const Greeting = ({ greetingMessage, type }) => {

    const childname = useSelector(state => state.pairing.childname)
    const parentname = useSelector(state => state.pairing.parentname)
    return (
        <View style={styles.container}>
            <Text style={styles.greeting_text}>Merhaba <Text style={styles.name_text}> {type === 'parent' ? parentname : childname} </Text>!</Text>
            <Text style={styles.greeting_message}>{greetingMessage}</Text>
        </View>
    )
}

export default Greeting

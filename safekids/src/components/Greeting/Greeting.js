import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import styles from './Greeting.style'


const Greeting = ({ greetingMessage }) => {

    const userName = useSelector((state) => state.userDetails.userName)
    return (
        <View style={styles.container}>
            <Text style={styles.greeting_text}>Merhaba <Text style={styles.name_text}>{userName}</Text>!</Text>
            <Text style={styles.greeting_message}>{greetingMessage}</Text>
        </View>
    )
}

export default Greeting
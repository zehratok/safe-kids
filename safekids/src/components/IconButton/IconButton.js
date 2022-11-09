import { TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './IconButton.style'

const IconButton = ({ icon, iconName, onPress }) => {

    if (icon === "MaterialIcons") {
        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <MaterialIcons name={iconName} style={styles.normal_icon} />
            </TouchableOpacity>
        )
    }
    else if (icon === "MaterialCommunityIcons") {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={onPress}>
                <MaterialCommunityIcons name={iconName} style={styles.small_icon} />
            </TouchableOpacity>
        )
    }
    else if (icon === "FontAwesome") {
        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <FontAwesome name={iconName} style={styles.small_icon} />
            </TouchableOpacity>
        )
    }
    else if (icon === "FontAwesome5") {
        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <FontAwesome5 name={iconName} style={styles.small_icon} />
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Ionicons name={iconName} style={styles.normal_icon} />
        </TouchableOpacity>
    )

}

export default IconButton
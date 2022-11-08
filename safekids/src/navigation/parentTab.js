import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chat, Home, Profile, Settings } from 'pages/parent/app/index';
import Icon from 'react-native-vector-icons/Ionicons'
import colors from 'styles/colors';
import dimensions from 'styles/dimensions';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
const ParentTab = () => {

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarActiveTintColor: colors.main_green,
            tabBarInactiveTintColor: colors.main_yellow,
            tabBarIcon: ({ color, focused, size }) => {
                let iconName;
                if (route.name === 'Ana Sayfa') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Sohbet') {
                    iconName = focused ? 'chatbox' : 'chatbox-outline';
                }
                else if (route.name === "Profilim") {
                    iconName = focused ? 'person' : 'person-outline';
                } else if (route.name === 'Ayarlar') {
                    iconName = focused ? 'settings' : 'settings-outline';
                }
                return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarIconStyle: styles.iconStyle,
            tabBarLabelStyle: {
                fontSize: dimensions.fullWidth * 0.03,
                fontWeight: 'bold',
                bottom: dimensions.fullHeight * 0.005,
            },
        })}>
            <Tab.Screen name="Ana Sayfa" component={Home} />
            <Tab.Screen name="Sohbet" component={Chat} />
            <Tab.Screen name="Profilim" component={Profile} />
            <Tab.Screen name="Ayarlar" component={Settings} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        backgroundColor: colors.transparent_white,
        height: dimensions.fullHeight * 0.08,
        shadowColor: colors.main_green,
        elevation: 0,
        shadowOpacity: 0.05,
        shadowOffset: {
            height: 0,
            width: 0
        },
    },
    iconStyle: {
        alignSelf: 'center',
    }

})

export default ParentTab
import { StyleSheet, Dimensions } from "react-native";
import colors from "styles/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.main_white,
    },
    header_text: {
        fontSize: 50,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: Dimensions.get("window").height * 0.15,
        color: colors.main_green,
        fontFamily: 'sans-serif-medium',
    },
    welcome_text: {
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: 'sans-serif-medium',
        textAlign: "center",
        marginTop: Dimensions.get("window").height * 0.0075,
        color: colors.main_yellow,
    },
    button_container: {
        alignContent: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: Dimensions.get('window').height * 0.15,
    },
    button_parents: {
        borderRadius: 100,
        width: 150,
        height: 150,
        backgroundColor: colors.main_blue,
    },
    button_child: {
        flexDirection: "row",
        borderRadius: 100,
        width: 150,
        height: 150,
        backgroundColor: colors.main_blue,
    },
    parents_image: {
        marginTop: -15,
        width: 130,
        height: 170,
    },
    boy_image: {
        marginLeft: -15,
        width: 110,
        height: 120,
    },
    girl_image: {
        marginLeft: -85,
        marginTop: 30,
        width: 145,
        height: 120,
    },
    choice_text: {
        marginHorizontal: 25,
        marginTop: Dimensions.get('window').height * 0.075,
        fontSize: 22 - (Dimensions.get('window').width / 50),
        fontWeight: "bold",
        fontFamily: 'sans-serif-medium',
        fontStyle: 'italic',
        color: colors.main_blue,
        textAlign: "center",
    },

});
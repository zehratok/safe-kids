import { StyleSheet, Dimensions } from "react-native";
import colors from "styles/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.main_white,
    },
    bg_image: {
        height: Dimensions.get('window').height / 3,
        backgroundColor: colors.main_blue
    },
    bottom_view: {
        backgroundColor: colors.main_white,
        bottom: Dimensions.get('window').height / 5,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
    },
    child_image_view: {
        borderRadius: 100,
        alignSelf: "center",
        backgroundColor: colors.main_blue,
        position: 'absolute',
        marginTop: -75,
        width: 150,
        height: 150,
    },
    boy_image: {
        marginLeft: -15,
        width: 110,
        height: 120,
    },
    girl_image: {
        marginLeft: 5,
        marginTop: -95,
        width: 145,
        height: 120,
    },
    form_view: {
        textAlign: "center",
        padding: '10%',
        marginTop: '20%'
    },
    login_link_view: {
        alignSelf: 'center'
    },
    login_link_text: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: "bold",
        color: colors.main_yellow,
    },


});
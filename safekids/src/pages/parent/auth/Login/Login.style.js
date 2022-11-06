import { StyleSheet, Dimensions } from "react-native";
import colors from "styles/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.main_white,
    },
    bg_image: {
        height: Dimensions.get('window').height / 2.5,
        backgroundColor: colors.main_blue
    },
    bottom_view: {
        backgroundColor: colors.main_white,
        bottom: Dimensions.get('window').height / 15,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
    },
    parents_image_view: {
        borderRadius: 100,
        alignSelf: "center",
        backgroundColor: colors.main_blue,
        position: 'absolute',
        marginTop: -75,
        width: 150,
        height: 150,
    },
    parents_image: {
        width: 120,
        height: 150,
    },
    form_view: {
        textAlign: "center",
        padding: '10%',
        marginTop: '20%'
    },
    register_link_view: {
        alignSelf: "center",
        marginTop: 5,
    },
    register_link_text: {
        textAlign: 'center',
        color: colors.main_yellow,
        fontSize: 12,
        fontWeight: "bold",
        fontStyle: 'italic',
    },
    forgot_password_view: {
        alignSelf: "center",
        marginRight: 5,
        marginTop: 5
    },
    forgot_password_text: {
        color: colors.main_pink,
        fontSize: 12,
        fontWeight: "bold",
        fontStyle: 'italic',
        textDecorationLine: 'underline',
    },


});
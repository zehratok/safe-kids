import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../styles/colors";

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
        bottom: Dimensions.get('window').height / 11,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
    },
    password_image_view: {
        borderRadius: 100,
        alignSelf: "center",
        backgroundColor: colors.main_blue,
        position: 'absolute',
        marginTop: -75,
        width: 200,
        height: 200,
    },
    password_image: {
        width: 190,
        height: 190,
    },
    form_view: {
        textAlign: "center",
        padding: '10%',
        marginTop: '30%'
    },


});
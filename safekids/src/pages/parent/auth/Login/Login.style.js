import { StyleSheet, Dimensions } from "react-native";
import colors from "styles/colors";
import dimensions from "styles/dimensions";

if (dimensions.fullWidth < 375) {
    var containerWidth = 0.8 * dimensions.fullWidth
}
else {
    var containerWidth = 0.7 * dimensions.fullWidth
}
if (dimensions.fullHeight < 700) {
    var containerHeight = 0.7 * dimensions.fullHeight
}
else {
    var containerHeight = 0.8 * dimensions.fullHeight
}
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.main_white,
    },
    bg_image: {
        height: 0.55 * containerHeight,
        backgroundColor: colors.main_blue
    },
    bottom_view: {
        backgroundColor: colors.main_white,
        bottom: 0.15 * containerHeight,
        borderTopStartRadius: 0.15 * containerWidth,
        borderTopEndRadius: 0.15 * containerWidth,
    },
    parents_image_view: {
        borderRadius: containerWidth,
        alignSelf: "center",
        backgroundColor: colors.main_blue,
        position: 'absolute',
        marginTop: - 0.16 * containerHeight,
        width: 0.6 * containerWidth,
        height: 0.6 * containerWidth,
    },
    parents_image: {
        width: 0.57 * containerWidth,
        height: 0.67 * containerWidth,
        marginTop: - 0.08 * containerWidth,
    },
    form_view: {
        textAlign: "center",
        padding: 0.1 * containerWidth,
        marginTop: 0.2 * containerHeight
    },
    register_link_view: {
        alignSelf: "center",
        marginTop: 0.001 * containerHeight,
    },
    register_link_text: {
        textAlign: 'center',
        color: colors.main_yellow,
        fontSize: 0.05 * containerWidth,
        fontWeight: "bold",
        fontStyle: 'italic',
    },
    forgot_password_view: {
        alignSelf: "center",
        marginHorizontal: 0.1 * containerWidth,
        marginTop: 0.01 * containerHeight,
    },
    forgot_password_text: {
        color: colors.main_pink,
        fontSize: 0.05 * containerWidth,
        fontWeight: "bold",
        fontStyle: 'italic',
        textDecorationLine: 'underline',
    },


});
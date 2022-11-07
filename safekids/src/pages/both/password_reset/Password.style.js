import { StyleSheet } from "react-native";
import colors from "styles/colors";
import dimensions from "styles/dimensions";

if (dimensions.fullWidth < 375) {
    var containerWidth = 0.8 * dimensions.fullWidth
} else {
    var containerWidth = 0.7 * dimensions.fullWidth
}
if (dimensions.fullHeight < 700) {
    var containerHeight = 0.7 * dimensions.fullHeight
} else {
    var containerHeight = 0.8 * dimensions.fullHeight
}

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.main_white,
    },
    bg_image: {
        height: 0.65 * containerHeight,
        backgroundColor: colors.main_blue
    },
    bottom_view: {
        backgroundColor: colors.main_white,
        bottom: 0.15 * containerHeight,
        borderTopStartRadius: 0.15 * containerWidth,
        borderTopEndRadius: 0.15 * containerWidth,
    },
    password_image_view: {
        position: 'absolute',
        alignSelf: "center",
        borderRadius: containerWidth,
        backgroundColor: colors.main_blue,
        marginTop: - 0.15 * containerHeight,
        width: 0.65 * containerWidth,
        height: 0.65 * containerWidth,
    },
    password_image: {
        width: 0.65 * containerWidth,
        height: 0.65 * containerWidth,
    },
    form_view: {
        textAlign: "center",
        padding: 0.1 * containerWidth,
        marginTop: 0.3 * containerHeight
    },

});
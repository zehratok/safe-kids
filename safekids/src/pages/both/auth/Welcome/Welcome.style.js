import { StyleSheet, Dimensions } from "react-native";
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
    header_text: {
        fontSize: 0.12 * containerHeight,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 0.2 * containerHeight,
        color: colors.main_green,
        fontFamily: 'sans-serif-medium',
    },
    welcome_text: {
        fontSize: 0.06 * containerHeight,
        fontWeight: "bold",
        fontFamily: 'sans-serif-medium',
        textAlign: "center",
        marginTop: 0.01 * containerHeight,
        color: colors.main_yellow,
    },
    button_container: {
        alignContent: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 0.25 * containerHeight,
    },
    button_parents: {
        borderRadius: 100,
        width: 0.55 * containerWidth,
        height: 0.55 * containerWidth,
        backgroundColor: colors.main_blue,
    },
    button_child: {
        flexDirection: "row",
        borderRadius: containerWidth,
        width: 0.55 * containerWidth,
        height: 0.55 * containerWidth,
        backgroundColor: colors.main_blue,
    },
    parents_image: {
        marginTop: -0.03 * containerHeight,
        width: 0.5 * containerWidth,
        height: 0.6 * containerWidth,
    },
    boy_image: {
        marginLeft: -0.06 * containerWidth,
        width: 0.5 * containerWidth,
        height: 0.45 * containerWidth,
    },
    girl_image: {
        marginLeft: -0.4 * containerWidth,
        marginTop: 0.12 * containerWidth,
        width: 0.53 * containerWidth,
        height: 0.42 * containerWidth,
    },
    choice_text: {
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: 'sans-serif-medium',
        fontStyle: 'italic',
        fontSize: 0.03 * containerHeight,
        color: colors.main_blue,
        marginHorizontal: 0.05 * containerWidth,
        marginTop: 0.08 * containerHeight,
    },

});
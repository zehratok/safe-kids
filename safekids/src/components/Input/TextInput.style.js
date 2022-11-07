import { StyleSheet } from "react-native";
import colors from "styles/colors";
import dimensions from "styles/dimensions";

if (dimensions.fullHeight < 700) {
    var inputHeight = 0.07 * dimensions.fullHeight;
} else {
    var inputHeight = 0.07 * dimensions.fullHeight;
}

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        height: inputHeight,
        fontSize: 0.4 * inputHeight,
        fontWeight: "bold",
        color: colors.main_green,
    },
    label: {
        marginHorizontal: 0.02 * dimensions.fullWidth,
        fontWeight: "bold",
    },
    left_icon: {
        marginLeft: 0.04 * dimensions.fullWidth,
        color: colors.main_green,
        fontSize: 0.5 * inputHeight,
    },
    right_icon: {
        marginRight: 0.04 * dimensions.fullWidth,
        color: colors.main_yellow,
        fontSize: 0.5 * inputHeight,
    }
});
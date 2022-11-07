import { StyleSheet } from "react-native";
import colors from "styles/colors";
import dimensions from "styles/dimensions";

if (dimensions.fullWidth < 375) {
    var buttonWidth = 0.8 * dimensions.fullWidth
} else {
    var buttonWidth = 0.7 * dimensions.fullWidth
}
if (dimensions.fullHeight < 700) {
    var buttonHeight = 0.07 * dimensions.fullHeight
} else {
    var buttonHeight = 0.06 * dimensions.fullHeight
}
export default StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: buttonWidth / 2,
        height: buttonHeight,
        marginHorizontal: 0.05 * dimensions.fullWidth,
        marginVertical: 0.02 * dimensions.fullHeight,
        backgroundColor: colors.sec_green,
        alignItems: "center",
    },
    button_container: {
        backgroundColor: colors.sec_green,
    },
    button_text: {
        fontWeight: "bold",
        fontSize: buttonHeight / 2.5,
        color: colors.main_white,
    }
});
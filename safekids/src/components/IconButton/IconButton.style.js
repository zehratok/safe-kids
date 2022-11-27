import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import dimensions from 'styles/dimensions';

var fullWidth = dimensions.fullWidth;
var fullHeight = dimensions.fullHeight;

var buttonWidth = 0.16 * fullWidth

const styles = StyleSheet.create({
    container: {
        width: buttonWidth,
        height: buttonWidth,
        backgroundColor: colors.main_yellow,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: buttonWidth * 0.1,
    },
    normal_icon: {
        fontSize: 0.8 * buttonWidth,
        color: colors.main_white,
    },
    small_icon: {
        fontSize: 0.7 * buttonWidth,
        color: colors.main_white,
    },
})

export default styles;
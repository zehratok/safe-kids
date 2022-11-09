import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import dimensions from 'styles/dimensions';

var fullWidth = dimensions.fullWidth;
var fullHeight = dimensions.fullHeight;

var buttonWidth = 0.14 * fullWidth



const styles = StyleSheet.create({
    container: {
        width: buttonWidth,
        height: buttonWidth,
        backgroundColor: colors.main_white,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: buttonWidth / 2,
        elevation: 5,
    },
    normal_icon: {
        fontSize: 0.7 * buttonWidth,
        color: colors.main_pink,
    },
    small_icon: {
        fontSize: 0.6 * buttonWidth,
        color: colors.main_pink,
    },

})

export default styles;
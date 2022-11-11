import { StyleSheet } from 'react-native';
import colors from 'styles/colors';
import dimensions from 'styles/dimensions';

var fullWidth = dimensions.fullWidth;
var fullHeight = dimensions.fullHeight;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.transparent_green,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bg_image: {
        width: fullWidth,
        height: fullHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logout_button: {
        position: 'absolute',
        bottom: 0.05 * fullHeight,
        width: 0.28 * fullWidth,
        height: 0.18 * fullWidth,
        borderRadius: 0.035 * fullWidth,
        backgroundColor: colors.main_pink,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logout_button_icon: {
        color: colors.main_white,
        fontSize: 0.15 * fullWidth,
    },
    pairing_view: {
        width: 0.8 * fullWidth,
        height: 0.5 * fullHeight,
        backgroundColor: colors.main_white,
        borderRadius: 0.06 * fullWidth,
    },
    greeting_view: {
        padding: 0.05 * fullWidth,
        width: 0.8 * fullWidth,
        height: 0.275 * fullHeight,
    },
    greeting_text: {
        fontSize: 0.05 * fullWidth,
        fontWeight: 'bold',
        color: colors.main_yellow,
    },
    greeting_text_child: {
        color: colors.main_pink,
    },
    pairing_text: {
        padding: 0.02 * fullHeight,
        fontSize: 0.045 * fullWidth,
        color: colors.main_green,
        textAlign: 'center',
        marginTop: 0.01 * fullHeight,
    },
    formik_view: {
        width: 0.8 * fullWidth,
        height: 0.2 * fullHeight,
        alignContent: 'center',
        alignItems: 'center',
    },
    send_code_button: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0.05 * fullWidth,
        width: 0.5 * fullWidth,
        height: 0.07 * fullHeight,
        borderRadius: 0.04 * fullHeight,
        backgroundColor: colors.main_green,
    },
    send_code_button_text: {
        color: colors.main_white,
        fontSize: 0.03 * fullHeight,
        fontWeight: 'bold',
    },


});

export default styles;
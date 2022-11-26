import { StyleSheet } from "react-native";
import colors from 'styles/colors';
import dimensions from "styles/dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.main_white,
        padding: dimensions.fullWidth * 0.05,
    },
    greeting_text: {
        fontSize: dimensions.fullWidth * 0.05,
        fontWeight: 'bold',
        color: colors.main_pink,
        marginBottom: dimensions.fullHeight * 0.01,
    },
    name_text: {
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    greeting_message: {
        fontSize: dimensions.fullWidth * 0.04,
        color: colors.main_green,
        fontStyle: 'italic',
    },
});

export default styles;
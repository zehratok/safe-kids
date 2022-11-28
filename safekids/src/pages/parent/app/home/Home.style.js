import { StyleSheet } from "react-native";
import colors from 'styles/colors';
import dimensions from "styles/dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.main_white,
    },
    greeting_view: {
        height: dimensions.fullHeight * 0.15,
        width: dimensions.fullWidth,
        justifyContent: 'center',
    },
    quick_actions_view: {
        flexDirection: 'row',
        height: dimensions.fullHeight * 0.1,
        width: dimensions.fullWidth,
        justifyContent: 'center',
        borderRadius: 5,
        position: 'absolute',
        top: dimensions.fullHeight * 0.13,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
  
});
export default styles;
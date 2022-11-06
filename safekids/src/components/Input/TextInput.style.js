import { StyleSheet } from "react-native";
import colors from "styles/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.main_green,
    },
    label: {
        marginHorizontal: 5,
        fontWeight: "bold",
    },
    left_icon: {
        marginLeft: 10,
        color: colors.main_green,
        fontSize: 20,
    },
    right_icon: {
        marginRight: 10,
        color: colors.main_yellow,
        fontSize: 20,
    }


});
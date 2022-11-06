import { StyleSheet} from "react-native";
import colors from "styles/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 50,
        marginHorizontal: 30,
        marginVertical: 10,
        backgroundColor: colors.sec_green,
        alignItems: "center",
    },
    button_container: {
        backgroundColor: colors.sec_green,
    },
    button_text: {
        fontWeight: "bold",
        fontSize: 17,
        color: colors.main_white,
    }
});
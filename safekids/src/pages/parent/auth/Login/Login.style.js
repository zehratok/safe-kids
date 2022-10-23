import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    bg_image: {
        height: Dimensions.get('window').height / 2.5,
        backgroundColor: "#B0CFD5"
    },
    bottom_view: {
        backgroundColor: '#ffffff',
        bottom: Dimensions.get('window').height / 15,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
    },
    parents_image_view: {
        borderRadius: 100,
        alignSelf: "center",
        backgroundColor: '#B0CFD5',
        position: 'absolute',
        marginTop: -75,
        width: 150,
        height: 150,
    },
    parents_image: {
        width: 120,
        height: 150,
    },
    form_view: {
        textAlign: "center",
        padding: '10%',
        marginTop: '20%'
    },
    forgot_password_view: {
        alignSelf: "flex-end",
        marginRight: 5,
        marginVertical: -5
    },
    forgot_password_text: {
        color: '#B88296',
        fontSize: 12,
        fontWeight: "bold",
        fontStyle: 'italic',
    },
    question_text: {
        marginTop: 5,
        textAlign: 'center',
        fontSize: 13,
        fontWeight: "bold",
        color: '#D9AA60',
    },
    register_link_text: {
        color: '#B88296',
        fontSize: 12,
        fontWeight: "bold",
        fontStyle: 'italic',
        textDecorationLine: 'underline',
    },


});
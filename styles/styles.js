import { StyleSheet } from "react-native";

export const colors = {
    primary: '#1779ba',
    secondary :'#767676'
}
export default StyleSheet.create({
    mainContainer:{
        flex: 1, 
        paddingTop:40
    },
    container:{
        flex: 1,
        backgroundColor: '#d4c9b9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerHeader:{
        flex: 0,
        height: 200,
        backgroundColor: '#C1ACA1',
        padding: 15
    },
    containerBody:{
        flex: 0.8,
        backgroundColor: '#9DD5D4',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        padding: 10
    },
    space:{
        flex: 0.2,
        backgroundColor: '#F3F3F3',
        alignSelf: 'stretch',
        height: 20
    },
    textHeader:{
        fontSize: 30,
        fontWeight: 'bold'
    },
    textBody:{
        fontSize: 20,
        margin: 3
    },
    input: {
        fontSize: 20,
        height: 28,
        width: 60,
        margin: 3,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#F3F3F3',
        justifyContent: 'space-evenly',
        borderRadius: 10,
        overflow:'hidden'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        width: 150,
        height: 35,
        padding: 10,
        margin: 5,
        borderRadius: 5
      }
});
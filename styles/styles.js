import { StyleSheet } from "react-native";

// primary = 9dd5d4
// secundary = d5ab9d

export const colors = {
    primary: '#eef6ef',
    secondary :'#8Ac97a',
    neutro: '#BCDDD4',
    accent: '#52b265',
    button: "#79b4c8"
}
export default StyleSheet.create({
    mainContainer:{
        flex: 1, 
        paddingTop:40,
        paddingHorizontal:'5%',
        backgroundColor: colors.primary
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:'5%',
        marginHorizontal:'5%',
        backgroundColor: colors.secondary,
    },
    containerHeader:{
        flex: 1,
        //height: 200,
        //backgroundColor: colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        //borderRadius: 10
    },
    buttonRow:{
        flexDirection: "row",
        alignItems:'center',
        flex:10
    },
    containerBody:{
        flex: 1,
        //backgroundColor: '#9DD5D4',
        alignItems: 'center',
        
        justifyContent: 'center',
        alignSelf: 'stretch',
        //borderRadius: 10
    },
    fourCard:{
        paddingHorizontal: '10%',
        height:100,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flexDirection: 'row',
        elevation:1
        //borderRadius: 10
    },
    space:{
        flex: 0.2,
        backgroundColor: '#F3F3F3',
        alignSelf: 'stretch',
        height: 20
    },
    textHeader:{
        fontFamily:'regular',
        fontSize: 30,
    },
    textBody2:{
        fontSize: 20,
        margin: 3
    },
    textBody:{
        fontSize: 20,
        margin: 3,       
    },
    input: {
        fontSize: 20,
        height: 35,
        width: 60,
        margin: 3,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#F3F3F3',
        justifyContent: 'space-evenly',
        overflow:'hidden',
        borderRadius:10
    },
    autocompletesContainer: {
        paddingTop: 0,
        //elevation:13,
        //width: "100%",
        paddingHorizontal: 8,
        alignSelf: 'stretch'
        //marginRight:30,
      },
    autocompleteView: {
        paddingTop: 0,
        elevation:0,
        alignSelf: 'stretch',
        //width: "200%",
        paddingHorizontal: 8,
        //marginRight:30,
      },
    autoCompInput: {
        fontSize: 16,
        maxHeight: 60,
        maxWidth: 80,
       
    },
    button: {
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        width: 150,
        height: 35,
        padding: 10,
        margin: 5,
        borderRadius: 5
    },
    buttonBody: {
        alignItems: "center",
        backgroundColor: colors.button,
        width: 150,
        height: 35,
        padding: 10,
        margin: 5,
        borderRadius: 5
    },
    ListCard:{
        padding:15, 
        backgroundColor: colors.primary, 
        marginBottom:20, 
        borderRadius:10,
        overflow:'hidden'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 25,
      },
      dropDown:{
          width:180,
        fontSize:15,
        marginBottom:30,
      },
      modalView: {
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      buttonAccept:{
        backgroundColor: '#52b265'
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize:18,
      },
});
import { StyleSheet } from "react-native";

// primary = 9dd5d4
// secundary = d5ab9d

export const colors = {
    primary: '#ebf5ec',
    secondary :'#8Ac97a',
    neutro: '#BCDDD4',
    accent: '#52b265'
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
        height: 28,
        width: 60,
        margin: 3,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#F3F3F3',
        justifyContent: 'space-evenly',
        overflow:'hidden',
        borderRadius:10
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
      ListCard:{
          padding:15, 
          backgroundColor: colors.primary, 
          marginBottom:20, 
          borderRadius:10,
          overflow:'hidden'
    }
});
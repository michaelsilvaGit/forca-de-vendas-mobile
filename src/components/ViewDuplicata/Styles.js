import { StyleSheet } from "react-native"





export default Styles = StyleSheet.create({

    containerDuplicata: {
        elevation: 4, 
        borderRadius: 8, 
        backgroundColor: '#FFF', 
        paddingHorizontal: 18, 
        paddingVertical: 10, 
        marginBottom: 6,
        width: '100%'
    },

    containerStatus: {
        paddingHorizontal: 10,
        paddingVertical: 4, 
        borderRadius: 18
    },

    containerInfo: {
        width: '100%', 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },

    containerStatusIcon: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    containerTotal: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 10
    }

})
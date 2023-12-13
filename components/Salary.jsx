import { StyleSheet, View, Text } from "react-native"

export const Salary = props => {

	return (
		<View style={styles.container}>
			<View style={styles.infoBox}>
				<Text style={styles.name}>{props.fullName}</Text>
				<Text style={styles.position}>{props.amount}</Text>
				<Text style={styles.position}>{props.card}</Text>
				<Text style={styles.date}>{props.dateOfSalary}</Text> 
			</View>
		</View>
	)
}

const styles = StyleSheet.create({

	container:{
		flexDirection:'row',
		height: 150,
		borderBottomWidth: 0,
		shadowColor: '#676464',
    	elevation: 5,
		marginTop:10,
		borderBottomEndRadius:50,
		borderBottomStartRadius: 50,
		borderTopEndRadius:50,
	},

	photo:{
		width:115,
		height:115,
	},

	infoBox:{
		padding:20
	},
	name:{
		fontSize:23,
		fontWeight:'bold',
		color:'#2B6AD7',
	},
	position:{
		flex:1,
		fontSize:15,
	},
	deleteButton:{
		backgroundColor:'red',
		width:100,
		height:50,
		alignSelf:'center',

	},
	deleteText:{
		color:'white',
		fontSize:16,
		fontWeight:'bold',
		textAlign:'center',
	}
})
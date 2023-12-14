import { StyleSheet, View, Text, Image } from "react-native"
const imgUrl = require('../assets/img/trans.png');
export const Salary = props => {

	return (
		<View style={styles.container}>
				<Text style={styles.date}>{props.dateOfSalary}</Text> 
			<View style={styles.infoBox}>
				<Image style={styles.photo} source = {
					imgUrl
				}/>
				<View style={styles.nameCard} >
					<Text style={styles.name}>{props.fullName}</Text>
					<Text style={styles.card}>{props.card}</Text>
				</View>
				<Text style={styles.amount}>{props.amount} UAH</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({

	container:{
		padding:20,
		height: 130,
		borderBottomWidth: 0,
		shadowColor: '#676464',
    	elevation: 5,
		marginTop:10,
		borderBottomEndRadius:20,
		borderBottomStartRadius: 20,
		borderTopEndRadius:20,
		justifyContent:'space-around',
	},

	photo:{
		width:45,
		height:45,
	},

	infoBox:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center'
	},

	name:{
		fontSize:23,
		fontWeight:'bold',
		color:'#5c5e60',
	},
	nameCard:{
		width:200,
	},
	amount:{
		fontSize:15,
		color:'green',
		fontWeight:'bold'
	},
	date:{
		textAlign:'center',
	}
})
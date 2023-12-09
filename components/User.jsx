import { StyleSheet, View, Text, Image } from "react-native"
const imgUrl = '../assets/img/man.png'

export const User = props => {
	return (
		<View style={styles.container}>
			<Image style={styles.photo} source = {
				require(imgUrl)
			}/>
			<View style={styles.infoBox}>
				<Text style={styles.name}>{props.fullName}</Text>
				<Text style={styles.position}>{props.position} / {props.level}</Text>
				<Text style={styles.date}>{props.dateOfEmployment}</Text> 
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
		marginTop:20,
	},

	photo:{
		width:125,
		height:125,
	},

	infoBox:{
		padding:10
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
	date:{
	},
})
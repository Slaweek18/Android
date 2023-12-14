import { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, View, Text, Image, TouchableOpacity } from "react-native"

const imgUrl = 'https://i.pinimg.com/564x/fd/3e/20/fd3e201e732dcdf6cf37f29dd480d580.jpg'

const maleImage = require('../assets/img/man.jpg');
const femaleImage = require('../assets/img/woman2.png');

export const User = props => {

	const [imgUrl, setImgUrl] = useState('');

	useEffect(() => {
		if (props.sex === 'Male') {
			setImgUrl(maleImage);
		  } else {
			setImgUrl(femaleImage);
		  }
	})

	const minName = (str) => {
		if(str.length > 15){
			return str.substring(0,15) +'...'
		}
		return str
	}

	const minPosition = (str) => {
		if(str.length > 20){
			return str.substring(0,20) +'...'
		}
		return str
	}

	return (
		<View style={styles.container}>
			<Image style={styles.photo} source = {
				imgUrl
			}/>
			<View style={styles.infoBox}>
				<Text style={styles.name}>{minName(props.fullName)}</Text>
				<Text style={styles.position}>{minPosition(props.position +'/'+ props.level)}</Text>
				<Text style={styles.date}>{props.dateOfEmployment}</Text> 
			</View>
			<TouchableOpacity style={styles.deleteButton} onPress={()=>{props.onDelete();console.log('id of employee: ', props.id);}}>
				<Text style={styles.deleteText}>Delete</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({

	container:{
		flexDirection:'row',
		height: 150,
		width:415,
		shadowColor: '#676464',
    	elevation: 5,
		marginTop:10,
		borderBottomEndRadius:50,
		borderBottomStartRadius: 50,
		borderTopEndRadius:50,
		justifyContent:'space-between',
		paddingRight:10
	},

	imageUp: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
	},

	photo:{
		alignSelf:'flex-start',
		width:105,
		height:105,
	},

	infoBox:{
		padding:20,
		width:235,
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
		color:'#828487',
	},

	deleteButton:{
		backgroundColor:'#32326a',
		width:70,
		height:42,
		alignSelf:'center',
		justifyContent:'center',
		borderRadius:15,
		
	},

	deleteText:{
		color:'white',
		fontSize:16,
		fontWeight:'bold',
		textAlign:'center'
	}
})
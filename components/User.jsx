import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import { auth } from '../firebaseConfig'
import { db } from '../firebaseConfig';
import { ref, remove} from 'firebase/database';

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

	return (
		<View style={styles.container}>
			<Image style={styles.photo} source = {
				imgUrl
			}/>
			<View style={styles.infoBox}>
				<Text style={styles.name}>{props.fullName}</Text>
				<Text style={styles.position}>{props.position} / {props.level}</Text>
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
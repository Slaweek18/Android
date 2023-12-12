import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native"

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
	date:{
	},
})
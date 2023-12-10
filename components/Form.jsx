import React,{useState} from "react"
import { StyleSheet, TextInput, TouchableOpacity, View, Button, Text } from 'react-native'
import { Formik } from "formik"

export default function Form(){

	return (
		<View style={styles.main}>
			<Formik 
				initialValues={{fullName:'', position:'', level:'', card:'', dateOfEmployment:'', sex:''}}
				onSubmit={(values) => { console.log(values)}}>
				{(props) => (
					<View style={styles.formContainer}>
						<Text style={styles.inputLabel}>Full name:</Text>
						<TextInput 
							style={styles.name}
							value={props.values.fullName}
							placeholder="Employee full name"
							onChangeText={props.handleChange('fullName')}
						/>

						<Text style={styles.inputLabel}>Sex:</Text>
						<TextInput 
							style={styles.sex}
							value={props.values.sex}
							placeholder="man/woman"
							onChangeText={props.handleChange('sex')}
						/>

						<Text style={styles.inputLabel}>Position:</Text>
						<TextInput 
							style={styles.position}
							value={props.values.position}
							placeholder="Employee position"
							onChangeText={props.handleChange('position')}
						/>

						<Text style={styles.inputLabel}>Level:</Text>
						<TextInput 
							style={styles.level}
							value={props.values.level}
							placeholder="Employee level"
							onChangeText={props.handleChange('level')}
						/>

						<Text style={styles.inputLabel}>Bank card:</Text>
						<TextInput 
							style={styles.card}
							value={props.values.card}
							placeholder="Bank card"
							onChangeText={props.handleChange('card')}
						/>
						<View style={styles.addButton}> 
							<Button title="Add employee" onPress={props.handleSubmit}></Button>
						</View>
					</View>
				)}
			</Formik>
		</View>
	)
}

const styles = StyleSheet.create({

	main:{
		alignItems:'center'
	},

	formContainer:{
		marginTop:20,
		width:'90%'

	},

	inputLabel:{
		fontSize: 20,
		marginTop:20,
		
	},
	
	addButton:{
		width:200,
		alignItems:'center'
	}



})
import React,{useState} from "react"
import { StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, View, Button, Text } from 'react-native'
import { Formik } from "formik"
import * as Yup from 'yup'
import { auth } from '../firebaseConfig'
import { db } from '../firebaseConfig';
import { ref, set, push } from 'firebase/database';


const SignupSchema = Yup.object().shape({
	fullName: Yup.string()
		.min(3, 'Too Short!')
		.max(25, 'Too Long!')
		.required('Full name is required!'),
	sex: Yup.string()
		.oneOf(['Male', 'Female'], 'Invalid sex value')
		.required('Sex is required!'),
	position: Yup.string()
		.required('Position is required!'),
	level: Yup.string()
		.required('Level is required!'),
	card: Yup.string()
		.matches(/^[1-9]\d{15}$/, 'Invalid card number')
		.required('Bank card is required!'),
});

export default function Form( {setIsVisible}){

	const addData =(values)=> {
		const employeesRef = ref(db, 'users/' + auth.currentUser.uid + '/employees/');
		const newEmployeeRef = push(employeesRef); 
	
		set(newEmployeeRef, {
		  fullName: values.fullName,
		  position: values.position,
		  level: values.level,
		  card: values.card,
		  sex: values.sex,
		  balance:0,
		  dateOfEmployment:new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
		});
	}

	return (
		<ScrollView 
		contentContainerStyle={{ flexGrow: 1 }} 
		keyboardShouldPersistTaps="handled" 
		>
			<KeyboardAvoidingView 
				style={styles.main}
			>
				<Formik 
					initialValues={{
						fullName:'', 
						position:'', 
						level:'', 
						card:'', 
						sex:''
					}}
					validationSchema={SignupSchema}
					onSubmit={(values) => { 
						addData(values);
						console.log(values);
						setIsVisible(false);
					}}
						
					>
					{(props) => (
						<View style={styles.formContainer}>
							<View style={styles.inputConrainer}>
								<Text style={styles.inputLabel}>Full name:</Text>
								<TextInput 
									style={[styles.name, styles.input]}
									value={props.values.fullName}
									placeholder="Employee full name"
									onChangeText={props.handleChange('fullName')}
									onBlur={()=> props.setFieldTouched('fullName')}
									/>
									{props.touched.fullName && props.errors.fullName &&  (
										<Text style={styles.errorTxt}>{props.errors.fullName}</Text>
									)}
							</View>

							<View style={styles.inputConrainer}>
								<Text style={styles.inputLabel}>Sex:</Text>
								<TextInput 
									style={[styles.sex, styles.input]}
									value={props.values.sex}
									placeholder="Male/Female"
									onChangeText={props.handleChange('sex')}
									onBlur={()=> props.setFieldTouched('sex')}

								/>
									{props.touched.sex && props.errors.sex &&  (
										<Text style={styles.errorTxt}>{props.errors.sex}</Text>
									)}				
							</View>

							<View style={styles.inputConrainer}>
								<Text style={styles.inputLabel}>Position:</Text>
								<TextInput 
									style={[styles.position, styles.input]}
									value={props.values.position}
									placeholder="Employee position"
									onChangeText={props.handleChange('position')}
									onBlur={()=> props.setFieldTouched('position')}

								/>
									{props.touched.position && props.errors.position &&  (
										<Text style={styles.errorTxt}>{props.errors.position}</Text>
									)}								
							</View>

							<View style={styles.inputConrainer}>
								<Text style={styles.inputLabel}>Level:</Text>
								<TextInput 
									style={[styles.level, styles.input]}
									value={props.values.level}
									placeholder="Employee level"
									onChangeText={props.handleChange('level')}
									onBlur={()=> props.setFieldTouched('level')}

								/>
									{props.touched.level && props.errors.level &&  (
										<Text style={styles.errorTxt}>{props.errors.level}</Text>
									)}								
							</View>

							<View style={styles.inputConrainer}>
								<Text style={styles.inputLabel}>Bank card:</Text>
								<TextInput 
									style={[styles.card, styles.input]}
									value={props.values.card}
									placeholder="Bank card"
									onChangeText={props.handleChange('card')}
									onBlur={()=> props.setFieldTouched('card')}

									keyboardType="numeric"

								/>
									{props.touched.card && props.errors.card &&  (
										<Text style={styles.errorTxt}>{props.errors.card}</Text>
									)}
							</View>

							<TouchableOpacity 
								style={[styles.button, {backgroundColor: props.isValid ? '#2B6AD7' : '#A5C9CA'}]} 
								onPress={props.handleSubmit}
								disabled={!props.isValid}> 
								<Text style={styles.buttonText}>Add employee</Text>
							</TouchableOpacity>
						</View>
					)}
				</Formik>
			</KeyboardAvoidingView>
    </ScrollView>
	)
}

const styles = StyleSheet.create({

	main:{
		alignItems:'center',
	},

	formContainer:{
		marginTop:20,
		width:'90%',
		alignItems:'center',
	},

	inputConrainer:{
		width:'100%',
		flex:1,
	},

	inputLabel:{
		fontSize: 20,
		marginTop:20,

	},

	input:{
		borderWidth:1,
		borderColor:'#11222263',
		paddingHorizontal:10,
		paddingVertical:8,
		borderRadius:8,
	},

	button: {
		// backgroundColor: '#2B6AD7',
		marginTop:30,
		width: '60%',
		padding: 15,
		borderRadius: 15,
		alignItems: 'center',
	},

	buttonText:{
		color:'white',
		textTransform:'uppercase',
		fontWeight:'bold',
	},
	errorTxt:{
		color:'red',
	}

})
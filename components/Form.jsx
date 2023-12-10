import React,{useState} from "react"
import { StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, View, Button, Text } from 'react-native'
import { Formik } from "formik"

export default function Form(){

	return (
		<ScrollView 
		contentContainerStyle={{ flexGrow: 1 }} 
		keyboardShouldPersistTaps="handled" 
		>
			<KeyboardAvoidingView 
				style={styles.main}
			>
				<Formik 
					initialValues={{fullName:'', position:'', level:'', card:'', dateOfEmployment:'', sex:''}}
					onSubmit={(values) => { console.log(values)}}
					validate={(values) => {
						// Функція для валідації
						const errors = {};
						if (!values.fullName) {
							errors.fullName = 'Full name is required';
						}
						// Додайте інші правила валідації для інших полів, наприклад:
						// if (!values.position) {
						//   errors.position = 'Position is required';
						// }
						// І т.д.
						return errors;
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
								/>
							</View>

							<View style={styles.inputConrainer}>
								<Text style={styles.inputLabel}>Sex:</Text>
								<TextInput 
									style={[styles.sex, styles.input]}
									value={props.values.sex}
									placeholder="male/female"
									onChangeText={props.handleChange('sex')}
								/>
							</View>

							<View style={styles.inputConrainer}>
								<Text style={styles.inputLabel}>Position:</Text>
								<TextInput 
									style={[styles.position, styles.input]}
									value={props.values.position}
									placeholder="Employee position"
									onChangeText={props.handleChange('position')}
								/>
							</View>

							<View style={styles.inputConrainer}>
								<Text style={styles.inputLabel}>Level:</Text>
								<TextInput 
									style={[styles.level, styles.input]}
									value={props.values.level}
									placeholder="Employee level"
									onChangeText={props.handleChange('level')}
								/>
							</View>

							<View style={styles.inputConrainer}>
								<Text style={styles.inputLabel}>Bank card:</Text>
								<TextInput 
									style={[styles.card, styles.input]}
									value={props.values.card}
									placeholder="Bank card"
									onChangeText={props.handleChange('card')}
								/>
							</View>
							<View style={styles.addButton}> 
								<Button title="Add employee" onPress={props.handleSubmit} ></Button>
							</View>
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

	addButton:{
		width:'40%',
		marginTop:30,
	}

})
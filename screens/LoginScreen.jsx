import { StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

const LoginScreen = () => {

	const navigation = useNavigation()

  return (
		<KeyboardAvoidingView
			style={styles.container}
			>
			<View style={styles.logoBlock}>
				<View style={styles.imgWrapp}><Image source={require('../assets/img/Logo1.png')} style={styles.logo} /></View>
				<Text style={styles.logoText}>MoneyDay</Text>
			</View>
			
			<View style={styles.formContainer}>
				<Text style={styles.loginText}>Log In</Text>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder="Email"
						// value={}
						// onChangeText={text => }
						style={styles.input}
						placeholderTextColor='white'
						
					/>
					<TextInput
						placeholder="Password"
						// value={}
						// onChangeText={text => }
						style={styles.input}
						placeholderTextColor='white'
						secureTextEntry
					/> 
				</View>
					<TouchableOpacity
						onPress={() => {}}
						style={styles.button}
					>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
			</View>

			<View style={styles.footerBlock}>
				<Text style={styles.buttonText}>Don't have an account yet?</Text>
					<TouchableOpacity
						onPress={() => {navigation.navigate('SignUp')}}
					>
						<Text style={styles.buttonTextBlue}>Sign up</Text>
					</TouchableOpacity>	
      </View>
			{/* <StatusBar></StatusBar> */}
	</KeyboardAvoidingView> 
	
  )
}

export default LoginScreen

const styles = StyleSheet.create({

		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		logoBlock:{
			flex:1,
			justifyContent: 'center',
		},
		formContainer: {
			width: '85%',
			backgroundColor: '#2B6AD7',
			height: '45%',
			borderBottomEndRadius:100,
			borderBottomStartRadius: 20,
			borderTopEndRadius:100,
			borderTopStartRadius:100,
			justifyContent: 'space-evenly',
			alignItems: 'center',
			marginBottom:10,
		},
		inputContainer: {
			width: '100%',
			height: '44%',
			justifyContent: 'space-evenly',
			alignItems: 'center'

		},
		input: {
			width:'80%',
			paddingHorizontal: 15,
			paddingVertical: 10,
			borderColor:'white',
			borderWidth: 1,
			color:'white'
		},
		button: {
			backgroundColor: 'white',
			width: '70%',
			padding: 15,
			borderRadius: 100,
			alignItems: 'center',
		},
    logo: {
      width: 100,
      height: 125,
    },
		logoText:{
			fontSize:22,
			fontWeight:'bold',
			textAlign:'center',
		},
		imgWrapp:{
			width:150,
			height:150,
			backgroundColor: '#71a2f8',
			borderRadius:200,
			justifyContent: 'center',
			alignItems: 'center'
		},
		loginText:{
			fontSize: 30,
			width:'80%',
			color:'white'
		},
		buttonText: {
			fontWeight: '700',
			fontSize: 16,
		},
		buttonTextBlue:{
			color:'#2B6AD7',
			fontWeight: '900',
			fontSize: 16,
			textAlign:'center'
		},
		footerBlock:{
			marginTop:5,
      marginBottom:25,
		}
})
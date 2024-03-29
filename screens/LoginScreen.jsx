import { StyleSheet, 	ImageBackground, Text, View, StatusBar, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
const imgUrl2 = 'https://i.pinimg.com/564x/fd/3e/20/fd3e201e732dcdf6cf37f29dd480d580.jpg'


const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

	useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("HomeHistory")
      }
    })
    
    return unsubscribe
  }, [])

	const handleLogin = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then(userCredentials => {
				user = userCredentials.user;
				console.log("Logged in with: ", user.email);
			})
			.catch(
				error => alert(error.message)
			)			
	}

  return (
		<KeyboardAvoidingView
			style={styles.container}
			>
			<ImageBackground style={styles.imageUp} source={{uri:imgUrl2}} resizeMode="cover">
			<View style={styles.logoBlock}>
				<View style={styles.imgWrapp}><Image source={require('../assets/img/logo2.png')} style={styles.logo} /></View>
				<Text style={styles.logoText}>MoneyDay</Text>
			</View>
			
			<View style={styles.formContainer}>
				<Text style={styles.loginText}>Log In</Text>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder="Email"
						value={email}
						onChangeText={text => setEmail(text)}
						style={styles.input}
						placeholderTextColor='white'
						
					/>
					<TextInput
						placeholder="Password"
						value={password}
						onChangeText={text => setPassword(text)}
						style={styles.input}
						placeholderTextColor='white'
						secureTextEntry
					/> 
				</View>
					<TouchableOpacity
						onPress={handleLogin}
						style={styles.button}
					>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
			</View>

			<View style={styles.footerBlock}>
				<Text style={styles.buttonText}>Don't have an account yet?</Text>
					<TouchableOpacity
						onPress={() => {navigation.replace('SignUp')}}
					>
					<Text style={styles.buttonTextBlue}>Sign up</Text>
			</TouchableOpacity>	
      </View>
</ImageBackground>
</KeyboardAvoidingView> 
	
  )
}

export default LoginScreen

const styles = StyleSheet.create({

		container: {
			flex: 1,
		},
		logoBlock:{
			flex:1,
			justifyContent: 'center',
		},
		imageUp: {
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
			height: '100%',
		},
		formContainer: {
			width: '85%',
			backgroundColor: '#2B6AD7',
			height: '46%',
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
			color:'white',
      fontSize:16,

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
			color:'white',
			fontSize:25,
			fontWeight:'bold',
			textAlign:'center',
		},
		imgWrapp:{
			width:150,
			height:150,
			backgroundColor: '#2B6AD7',
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
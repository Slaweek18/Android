import { StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

const SignUpScreen = () => {

	const navigation = useNavigation()

  return (
		<KeyboardAvoidingView
			style={styles.container}
			>
      <View style={styles.container2}>

        <View style={styles.welcomeBlock}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.welcomeSubText}>Signup into your account</Text>
        </View>

        
        <View style={styles.formContainer}>
          <Text style={styles.signUpText}>Sign Up</Text>
          <View style={styles.inputContainer}>

            <TextInput
              placeholder="UserName"
              // value={userName}
              // onChangeText={text => setName(text)}
              style={styles.input}
              placeholderTextColor='white'
              
            />
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
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.footerBlock}>
          <Text style={styles.buttonText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => { navigation.navigate('Login') }}
            >
              <Text style={styles.buttonTextBlue}>Log In</Text>
            </TouchableOpacity>	
        </View>
      </View>
			{/* <StatusBar></StatusBar> */}
	</KeyboardAvoidingView> 
	
  )
}

export default SignUpScreen

const styles = StyleSheet.create({

		container: {
      flex:1,
			alignItems: 'center',
		},

    container2: {
      flex:1,
      width:'85%',
    },
		formContainer: {
			width: '100%',
      flex: 2,
			backgroundColor: '#2B6AD7',
			borderBottomEndRadius:100,
			borderBottomStartRadius: 20,
			borderTopEndRadius:100,
			borderTopStartRadius:100,
			justifyContent: 'space-evenly',
			alignItems: 'center',

		},
		inputContainer: {
			width: '100%',
      height:'55%',
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
    welcomeBlock:{
			flex: 1,
      justifyContent:'center',
      alignSelf: 'flex-start',
    },
    welcomeText:{
      fontSize:25,
      fontWeight:'900',
    },
    welcomeSubText:{
      fontSize:16,
      fontWeight:'900',
      color:'gray',
    },
		signUpText:{
			fontSize: 30,
			width:'80%',
			color:'white'
		},
		buttonText: {
			fontWeight: '700',
			fontSize: 16,
			textAlign:'center'

		},
		buttonTextBlue:{
			color:'#2B6AD7',
			fontWeight: '900',
			fontSize: 16,
			textAlign:'center'
		},
    footerBlock:{
      marginTop:10,
      marginBottom:40,
    }
})
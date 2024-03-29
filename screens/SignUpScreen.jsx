import { ImageBackground, StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { ref, set } from 'firebase/database';
const imgUrl2 = 'https://i.pinimg.com/564x/fd/3e/20/fd3e201e732dcdf6cf37f29dd480d580.jpg'

const SignUpScreen = ({navigation}) => {

  const [userName, setName] = useState('')
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

  const addEmployer = (node) => {
    updateProfile(auth.currentUser, {
      displayName: userName,
    })
    .then(() => {
      console.log("Profile updated with: ", auth.currentUser.displayName);
      set(ref(db, 'users/' + node.uid), {
          name: auth.currentUser.displayName,
      });
    })
    .catch((error) => {
      console.error("Error updating profile: ", error);
    });
  }

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
        const user = userCredentials.user;
        addEmployer(user);
        console.log("Registered with: ", user.email);
                
    })
    .catch(error => alert(error.message));
  }        

  return (
		<KeyboardAvoidingView
			style={styles.container}
			>
			<ImageBackground style={styles.imageUp} source={{uri:imgUrl2}} resizeMode="cover">

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
              value={userName}
              onChangeText={text => setName(text)}
              style={styles.input}
              placeholderTextColor='white'
              
            />
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
              onPress={handleSignUp}
              style={styles.button}
            >
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.footerBlock}>
          <Text style={styles.buttonText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => { navigation.replace('Login') }}
            >
              <Text style={styles.buttonTextBlue}>Log In</Text>
            </TouchableOpacity>	
        </View>
      </View>
      </ImageBackground>
	</KeyboardAvoidingView> 
	
  )
}

export default SignUpScreen

const styles = StyleSheet.create({

		container: {
      flex:1,
		},

		imageUp: {
			alignItems: 'center',
			width: '100%',
			height: '100%',
		},

    container2: {
      flex:1,
      width:'85%',
    },
		formContainer: {
			width: '100%',
      flex: 3,
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
    welcomeBlock:{
			flex: 1,
      justifyContent:'center',
      alignSelf: 'flex-start',
    },
    welcomeText:{
      fontSize:25,
      fontWeight:'900',
      color:'#2B6AD7',
    },
    welcomeSubText:{
      fontSize:16,
      fontWeight:'900',
      color:'white',
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
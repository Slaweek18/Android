import { View, Text, Image } from "react-native"
const imgUrl = '../assets/img/man.png'

export const User = props => {
	return (
		<View>
			<Image source = {
				require(imgUrl)
			}/>
			<View>
				<Text> {props.fullName}</Text>
				<Text> {props.position}</Text>
				<Text> {props.level}</Text>
				<Text> {props.dateOfEmployment}</Text> 
			</View>
		</View>
	)
}
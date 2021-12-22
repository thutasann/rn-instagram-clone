import React from 'react'
import { KeyboardAvoidingView, StyleSheet, View, Image } from 'react-native';
import SignupForm from '../components/SignupScreen/SignupForm';

const INSTAGRAM_LOGO = "https://o.remove.bg/downloads/e7467120-8426-48db-ab7b-979c00760c8e/image-removebg-preview.png";


const SignupScreen = ({ navigation }) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={{ uri: INSTAGRAM_LOGO }} style={styles.logo}/>  
            </View>
            <SignupForm navigation={navigation} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "black",
        paddingTop: 50,
        paddingHorizontal: 12
    },
    logoContainer:{
        alignItems: 'center',
        marginTop: 20,
    },
    logo:{
        width: 100,
        height: 100
    }
});


export default SignupScreen


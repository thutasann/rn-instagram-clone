import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View, TextInput, Button, Pressable, TouchableOpacity } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator  from 'email-validator';
import { auth  } from '../../firebase';


const loginFormSchema = Yup.object().shape({
    email: Yup.string()
                .email()
                .required("Email is required!"),
    password: Yup.string()
                    .required("Password is required!")
                    .min(8, 'Your password must be at least 8 characters')
});


const LoginForm = ({ navigation }) => {

    const onLogin = async (email, password) => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            console.log("Firebase login successful", email, password);    
        } 
        catch (error) {
            Alert.alert(
                'Dear user...',
                error.message + '\n\n... What would you like to do next ?',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK'),
                        style: 'cancel',
                    },
                    {
                        text: 'Sign Up',
                        onPress: () => navigation.navigate("Signup"),
                    }
                ] 
            );
        }
    }

    return (
        <View style={styles.loginContainer}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                    onLogin(values.email, values.password);
                }}
                validationSchema={loginFormSchema}
                validateOnMount={true}
            >

                {
                    ({ handleBlur, handleChange, handleSubmit, touched, values, errors, isValid }) => (
                        
                        <>
                            <View style={[styles.inputField,
                                { 
                                    borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#3D3D3D' : 'red'
                                }
                            ]}> 
                                <TextInput
                                    placeholder='Phone number, username or email'
                                    autoCapitalize='none'
                                    placeholderTextColor="grey"
                                    keyboardType='email-address'
                                    textContextType='emailAddress'
                                    autoFocus={true}
                                    style={styles.input}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                            </View>

                            <View style={[styles.inputField, 
                                {
                                    borderColor: 1 > values.password.length || values.password.length > 6 ? '#3D3D3D' : 'red'
                                }
                            ]}>
                                <TextInput
                                    placeholder='Pasword'
                                    autoCapitalize='none'
                                    placeholderTextColor="grey"
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    textContentType='password'
                                    style={styles.input}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                            </View>
                    
                            <View style={{ alignItems: 'flex-end', marginBottom: 20, marginTop: 10 }}>
                                <Text style={styles.forgot}>
                                    Forgot Password ?
                                </Text>
                            </View>

                            <Pressable 
                                style={styles.button(isValid)}
                                onPress={handleSubmit}
                                titleSize={20} 
                                disabled={!isValid}
                            >
                                <Text style={styles.buttonText}>Log In</Text>
                            </Pressable>

                            <View style={styles.signUpContainer}>
                                <Text style={{ color: '#ECECEC' }}>
                                    Don't have an account?
                                </Text>
                                <TouchableOpacity onPress={() => navigation.push("Signup")}>
                                    <Text style={styles.signupText}>
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>

                    )
                }

            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer:{
        marginTop: 80,
    },
    inputField:{
        borderRadius: 4,
        padding: 12,
        backgroundColor: "#181818",
        borderWidth: 1,
        borderColor: '#3D3D3D',
        marginBottom: 10,
        marginHorizontal: 0
    },
    input:{
        color: "#ECECEC",
        fontSize: 15
    },
    forgot:{
        color: "#6BB0F5",
    },  
    button: (isvalid) => ({
        backgroundColor: isvalid ? '#0096F6' : '#9ACAF7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4
    }),
    buttonText:{
        fontWeight: "bold",
        color: '#ECECEC',
        fontSize: 15,
    },
    signUpContainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50
    },
    signupText:{
        color: '#6BB0F5'
    }
});


export default LoginForm


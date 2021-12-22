import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View, TextInput, Button, Pressable, TouchableOpacity } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator  from 'email-validator';
import { auth, db } from '../../firebase';



const signupFormSchema = Yup.object().shape({
    email: Yup.string()
                .email()
                .required("Email is required!"),
    username: Yup.string()
                .required("Username is required!")
                .min(2, 'Meaningful username is reqiured!'),
    password: Yup.string()
                    .required("Password is required!")
                    .min(8, 'Your password must be at least 8 characters')
});

const getRandomProfilePicture = async () => {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    return data.results[0].picture.large;
};

const SignupForm = ({ navigation }) => {

    const onSignup =  async (email, password, username) =>{
        try {
            const authUser = await auth.createUserWithEmailAndPassword(email, password);
            console.log("Created user successfully", email, password);
            
            db.collection('users').doc(authUser.user.email).set({
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePicture(), 
            });

            console.log("Stored in firestore successfully");
        } 
        catch (error) {
            Alert.alert("Dear user...", error.message);
        }
    }


    return (
        <View style={styles.signupContainer}>
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={(values) => {
                    onSignup(values.email, values.password, values.username);
                }}
                validationSchema={signupFormSchema}
                validateOnMount={true}
            >

                {
                    ({ handleBlur, handleChange, handleSubmit, touched, values, errors, isValid }) => (
                        
                        <>

                            <View style={[styles.inputField,
                                { 
                                    borderColor: 1 > values.username.length || values.username.length > 2 ? '#3D3D3D' : 'red'
                                }
                            ]}>
                                <TextInput
                                    placeholder='username'
                                    autoCapitalize='none'
                                    placeholderTextColor="grey"
                                    autoFocus={true}
                                    style={styles.input}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                />
                            </View>

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
                    
                            <Pressable 
                                style={styles.button(isValid)}
                                onPress={handleSubmit}
                                titleSize={20} 
                                disabled={!isValid}
                            >
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </Pressable>

                            <View style={styles.signInContainer}>
                                <Text style={{ color: '#ECECEC' }}>
                                    Already have an account?
                                </Text>
                                <TouchableOpacity onPress={() => navigation.goBack("Login")}>
                                    <Text style={styles.signupText}>
                                        Sign In
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
    signupContainer:{
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
    signInContainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50
    },
    signupText:{
        color: '#6BB0F5'
    }
});


export default SignupForm


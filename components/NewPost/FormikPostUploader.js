import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput } from 'react-native';
import * as Yup from 'yup';
import { Formik, formik } from 'formik';
import { Divider } from 'react-native-elements';
import validUrl from 'valid-url';
import { db, auth } from '../../firebase';
import { serverTimestamp } from "firebase/firestore";



const PLACEHOLDER_IMG = "https://gadget-24.com/public/assets/img/placeholder.jpg"

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string()
                .url()
                .required('Valid Image URL is required'),

    caption: Yup.string()
                .required("Caption is required")
                .max(2200, 'Caption has reached the limited character')
})

const FormikPostUploader = ({ navigation }) =>{

    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
    const [currentloggedInUser, setCurrentloggedInUser] = useState(null);

    const getUsername =() => {
        const user = auth.currentUser;
        
        const unsubscribe = db.collection('users')
                                .where('owner_uid', '==', user.uid)
                                .limit(1)
                                .onSnapshot(
                                    (snapshot) => snapshot.docs.map(doc => {
                                        setCurrentloggedInUser({
                                            username: doc.data().username,
                                            profilePicture: doc.data().profile_picture
                                        })
                                    })
                                );

        return unsubscribe;
    };

    useEffect(() => {
        getUsername()
    }, []);


    const uplaodPost = ( imageUrl, caption ) => {
        const unsubscribe = db.collection('users')
                                .doc(auth.currentUser.email)
                                .collection('posts')
                                .add({
                                    imageUrl: imageUrl,
                                    user: currentloggedInUser.username,
                                    profile_picture: currentloggedInUser.profilePicture,
                                    owner_uid: auth.currentUser.uid,
                                    owner_email: auth.currentUser.email,
                                    caption: caption,
                                    createdAt: serverTimestamp(),
                                    likes_by_users: [],
                                    comments: [],
                                })
                                .then(() => navigation.goBack());
        return unsubscribe;
    };

    return(
        <Formik
            initialValues={{ caption: '', imageUrl: '' }}
            onSubmit={(values) => {
                uplaodPost(values.imageUrl, values.caption)
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {
                ({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                    <>
                        <View style={styles.formContainer}>
                            <Image 
                                source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG }}
                                style={styles.imgPlaceholder}
                            />
                            <View style={{ flex:1, marginLeft: 12, flexDirection: 'column' }}>
                                <TextInput 
                                    placeholder='Insert caption here'
                                    placeholderTextColor='grey'
                                    style={styles.input}
                                    multiline={true}
                                    onChangeText={handleChange('caption')}
                                    onBlur={handleBlur('caption')}
                                    value={values.caption}
                                />
                                {
                                    errors.caption && (
                                        <Text style={styles.error}>
                                            {errors.caption}
                                        </Text>
                                    )
                                }
                            </View>
                        </View>

                        <Divider width={0.2} orientation='vertical' />
                        
                        <TextInput 
                            onChange={e => setThumbnailUrl(e.nativeEvent.text)}
                            placeholder='Enter imageUrl'
                            placeholderTextColor='grey'
                            style={[styles.input, {marginTop: 10}]}
                            onChangeText={handleChange('imageUrl')}
                            onBlur={handleBlur('imageUrl')}
                            value={values.imageUrl}
                        />
                        {
                            errors.imageUrl && (
                                <Text style={styles.error}>
                                    {errors.imageUrl}
                                </Text>
                            )
                        }

                        <View style={{ marginTop: 20 }}>
                            <Button 
                                onPress={handleSubmit}
                                title='Share'
                                disabled={!isValid}
                            />
                        </View>
                    
                    </>
                )
            }

        </Formik>
    );
};

const styles = StyleSheet.create({
    formContainer:{
        margin: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 30
    },  
    imgPlaceholder:{
        width: 100,
        height: 100
    },  
    input:{
        color: 'white',
        fontSize: 15
    },
    error:{
        fontSize: 10,
        color: 'red'
    }
});

export default FormikPostUploader;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddNewPost from '../components/NewPost/AddNewPost';

const NewPostScreen = ({ navigation }) =>{
    return(
        <SafeAreaView style={styles.container}>
            <AddNewPost navigation={navigation}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'black',
        flex: 1
    }
});

export default NewPostScreen;
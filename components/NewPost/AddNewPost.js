import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign, Entypo } from '@expo/vector-icons';
import FormikPostUploader from './FormikPostUploader';

const AddNewPost = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <FormikPostUploader navigation={navigation}/>
        </View>
    )
};

const Header = ({navigation}) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack("Home")}>
            <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>NEW POST</Text>
        <TouchableOpacity>
            <Entypo name="info-with-circle" size={24} color="white" />
        </TouchableOpacity>
    </View>
)


const styles = StyleSheet.create({
    container:{
        marginHorizontal: 10
    },
    headerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default AddNewPost


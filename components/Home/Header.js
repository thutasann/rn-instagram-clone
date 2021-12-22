import React from 'react'
import { View, Text,  Image, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign, Entypo } from 'react-native-vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../../firebase';

const handleSignout = async () => {
    try {
        await auth.signOut();
        console.log("Signed out successfully");
    } catch (error) {
        console.log(error);
    }
};

const Header = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image
                    style={styles.logo}
                    source={require('../../assets/insta-logo.png')}
                />
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => navigation.push('NewPost')}>
                    <AntDesign name="plussquareo" size={24} style={styles.icons} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <AntDesign name="hearto" size={24} style={styles.icons} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>11</Text>
                    </View>
                    <Entypo name="direction" size={24} style={styles.icons} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSignout}>
                    <MaterialIcons name="logout" size={24} style={styles.icons} />
                </TouchableOpacity>

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20
    },
    logo:{
        width: 100,
        height: 50,
        resizeMode: 'contain'
    },
    iconsContainer:{
        flexDirection: 'row'
    },
    icons:{
        marginLeft: 20,
        color: "white"
    },
    unreadBadge:{
        backgroundColor: '#FF3250',
        position: 'absolute',
        width: 23,
        height: 19,
        left: 20,
        bottom: 18,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    
    },
    unreadBadgeText:{
        color: "white",
        fontWeight: '600'
    }
    
})

export default Header

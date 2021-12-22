import React, {useState} from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Divider } from 'react-native-elements';

export const bottomTabIcons = [
    {
        icon_name: 'Home_Icon',
        name: 'home',
        size: 24,
        activecolor: 'white',
        inactivecolor: 'grey'
    },
    {
        icon_name: 'Search_Icon',
        name: 'search',
        size: 24,
        activecolor: 'white',
        inactivecolor: 'grey'
    },
    {
        icon_name: 'Reels_Icon',
        name: 'apps-sharp',
        size: 24,
        activecolor: 'white',
        inactivecolor: 'grey'
    },
    {
        icon_name: 'Shop_Icon',
        name: 'cart',
        size: 24,
        activecolor: 'white',
        inactivecolor: 'grey'
    },
    {
        icon_name: 'Profile_Icon',
        imageUrl: "https://static.dw.com/image/59697915_303.jpg"
    }
];

const BottomTabs = ({icons}) =>{

    const [activeTab, setActiveTab] = useState("Home_Icon");

    const Icon = ({ icon }) =>(
        <TouchableOpacity onPress={() => setActiveTab(icon.icon_name)}>
            {
                icon.icon_name === 'Profile_Icon' ?
                <Image
                    source={{ uri: icon.imageUrl }}
                    style={[
                        styles.profilePic(),

                        activeTab === 'Profile_Icon' && icon.icon_name === activeTab 
                        ? styles.profilePic(activeTab) 
                        : null
                    ]}
                    
                /> 
                : 
                <Ionicons 
                    name={icon.name} 
                    size={icon.size}
                    color={ activeTab === icon.icon_name ? icon.activecolor : icon.inactivecolor}
                    style={styles.icon}
                />
            }
        </TouchableOpacity>
    );

    return(
        <View style={styles.wrapper}>
            <Divider width={1} orientation='vertical' />
            <View style={styles.container}>
                {
                    icons.map((icon, index) => (
                        <Icon key={index} icon={icon}  />
                    ))
                }
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    wrapper:{
        // position: 'absolute',
        // width: '100%',
        // bottom: '0%',
        // zIndex: 999,
        // backgroundColor: '#000',
    },
    container:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        paddingTop: 10,
    },
    icon:{

    },
    profilePic: (activeTab = '') => ({
        borderRadius: 50,
        backgroundColor: '#fff',
        borderWidth: activeTab === 'Profile_Icon' ? 2 : 0,
        width: 24,
        height: 24,
    }),
});


export default BottomTabs;
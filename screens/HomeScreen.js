import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Home/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stories from '../components/Home/Stories';
import Post from '../components/Home/Post';
import { POSTS } from '../data/posts';
import BottomTabs, { bottomTabIcons } from '../components/Home/BottomTabs';
import { db } from '../firebase';

const HomeScreen = ({ navigation }) => {

    const [ posts, setPosts ] = useState([]);

    // collectinGroup -> bcoz posts will be sub-collection of users
    useEffect(() =>{
        db.collectionGroup('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(post => ({
                    id: post.id,
                    ...post.data()
                }
            )));
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <Stories/>

            <ScrollView>
                {
                    posts.map((post, index) =>(
                        <Post post={post} key={index} />
                    ))
                }
            </ScrollView>

            <BottomTabs icons={bottomTabIcons} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'black',
        flex:1,
    }
})

export default HomeScreen

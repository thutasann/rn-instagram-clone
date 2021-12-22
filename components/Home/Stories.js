import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { USERS } from '../../data/users';

const Stories = () => {
    return (
        <View style={styles.storiesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    USERS.map((story, index) =>(
                        <View key={index} style={{ alignItems: 'center' }}>
                            <Image source={{ uri: story.image }} style={styles.story} />
                            <Text style={styles.storyname}>
                                {
                                    story.user.length > 11 ? story.user.slice(0, 6).toLowerCase() + '...' : 
                                    story.user.toLowerCase()
                                }
                            </Text>
                        </View>
                    ))
                }
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    storiesContainer:{
        marginBottom: 13
    },
    story:{
        width: 70,
        height: 70,
        borderRadius: 50,
        marginLeft: 18,
        borderWidth: 2,
        borderColor: '#ff8501'
    },
    storyname:{
        color: 'white',
    }
})

export default Stories

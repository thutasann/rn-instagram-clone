import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import { auth, db, firebase } from '../../firebase';
import { serverTimestamp } from "firebase/firestore";


const postFooterIcons = [
    {
        name: 'Like',
        imageUrl: 'https://o.remove.bg/downloads/5f9768f2-1453-479e-a58a-8d6095703c16/image-removebg-preview.png',
        likedImageUrl: 'https://o.remove.bg/downloads/52337da6-b879-4120-aa59-8b0e42292855/image-removebg-preview.png',
    },
    {
        name: 'Comment',
        imageUrl: 'https://o.remove.bg/downloads/9d732a6c-40d2-42b8-9d20-418111cba17c/image-removebg-preview.png',
    },
    {
        name: 'Share',
        imageUrl: 'https://o.remove.bg/downloads/55073728-afeb-47a7-8fc0-149c73ac4040/image-removebg-preview.png',
    },
    {
        name: 'Save',
        imageUrl: 'https://o.remove.bg/downloads/3f148e6c-8dcf-4f0d-a07b-421a6abc0852/image-removebg-preview.png',
    }
]

const Post = ({ post }) => {

    const handleLike = post => {
        const currentLikeStatus = !post.likes_by_users.includes( // to update like status blah
            auth.currentUser.email
        )

        db.collection('users')
        .doc(post.owner_email)
        .collection('posts')
        .doc(post.id)
        .update({
            likes_by_users: currentLikeStatus ? 
                            firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
                            : firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        }).then(() =>{
            console.log("Like document successfully updated")
        })
        .catch(error =>{
            console.error("Error updating like document ==>", error)
        })
    }

    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={1} orientation='vertical' style={{ marginBottom: 3 }} />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                <PostFooter post={post} handleLike={handleLike} />
                <Likes post={post} />
                <Caption post={post} />
                <CommentSection post={post} />
                <Comments post={post} />
            </View>
        </View>
    )
};


const PostHeader = ({post}) =>(
    <View style={styles.postHeader}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
                source={{ 
                    uri: post.profile_picture
                }}
                style={styles.story}
            />
            <Text style={styles.postHeaderText}>
                {post.user}
            </Text>
        </View>
        
        <Text style={{  color: 'white', fontWeight: '900' }}>
            ...
        </Text>
        
    </View>
);

const PostImage = ({ post }) => (
    <View style={styles.postImageContainer}>
        <Image
            source={{ 
                uri: post.imageUrl
            }}
            style={styles.postImage}
        />
    </View>
);

const PostFooter = ({ handleLike, post }) =>(
    <View style={styles.postFooterContainer}>
        <View style={styles.postFooterLeft}>
            <TouchableOpacity onPress={() => handleLike(post)}>
                <Image 
                    style={styles.footerIcon} 
                    source={{ uri: post.likes_by_users.includes(auth.currentUser.email) ? postFooterIcons[0].likedImageUrl : postFooterIcons[0].imageUrl }}
                />
            </TouchableOpacity>

            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl} />
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
        </View>
    </View>
);

const Icon = ({ imgStyle, imgUrl }) =>(
    <TouchableOpacity>
        <Image 
            style={imgStyle}
            source={{ uri: imgUrl }}
        />
    </TouchableOpacity>
);

const Likes = ({ post }) => (
    <View style={{ flexDirection: 'row', marginTop: 4 }}>
        <Text style={styles.likes}>
            {post.likes_by_users.length.toLocaleString('en')} likes
        </Text>
    </View>
);

const Caption = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        <Text style={{ color: 'white' }}>
            <Text style={{ fontWeight: 'bold' }}>{post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)

// post.comments.length -> 0 or 1 or 2 or 3
// 0 -> false
// 1 -> true
// !! -> turn whatever you have true or false

const CommentSection = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        {
            !!post.comments.length && (
                <Text style={{ color: "grey" }}>
                    View {post.comments.length > 1 ? 'all' : ''} {post.comments.length}{' '}
                    {post.comments.length > 1 ? 'comments' : 'comment'}
                </Text>
            )
        }
        
    </View>
);

const Comments = ({ post }) =>(
    <>
        {
            post.comments.map((comment, index) => (
                <View key={index} style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white' }}>
                        <Text style={{ fontWeight: 'bold' }}>{comment.user}</Text>{' '}
                        <Text>{comment.comment}</Text>
                    </Text>
                </View>
            ))
        }
    </>
)

// O comment -> dont render componet
// 1 comment -> render component without 'all' and singular comment
// 2 comments -> render component with 'all' and plural comment


const styles = StyleSheet.create({
    postHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center',
    },
    story:{
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 11,
        borderWidth: 1.6,
        borderColor: '#ff8501'
    },
    postHeaderText:{
        color: 'white',
        marginLeft: 5,
        fontWeight: '700'
    },
    postImageContainer:{
        width: '100%',
        height: 450,
    },  
    postImage:{
        height: '100%',
        resizeMode: 'cover'
    },
    postFooterContainer:{
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    postFooterLeft:{
        flexDirection:'row',
        width: '32%',
        justifyContent: 'space-between'
    },  
    footerIcon:{
        width: 27,
        height: 27,
        marginLeft: 1,
    },
    likeIcon:{
        width: 25,
        height: 25,
        marginTop: 2,
    },
    likedIcon:{
        marginTop:0,
        width: 26,
        height: 26
    },
    likes:{
        color: 'white',
        fontWeight: '600'
    }
})

export default Post

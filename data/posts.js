import { USERS } from './users';

export const  POSTS = [
    {
        imageUrl: 'https://i.ibb.co/182bP1y/4k.png',
        user: USERS[0].user,
        likes: 7870,
        caption: "Train RIde to Hogwarts. 👦✌🏻",
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'theqazman',
                comment: 'Wow! This build is pretty cool, Super exicted about that. Wating for this to drop.'
            },
        ],
    },

    {
        imageUrl: 'https://miro.medium.com/max/1400/1*JpmEinPoAm4snR5fFa_dkQ.jpeg',
        user: USERS[1].user,
        likes: 7870,
        caption: "Thinking about Bullshits. 👦✌🏻",
        profile_picture: USERS[1].image,
        comments: [
            {
                user: 'lilpeep',
                comment: 'Super exicted about that. Wating for this to drop.'
            },
            {
                user: 'xxxtentacion',
                comment: 'FUck offff Blah blah Blah blah Blah blah Blah blah Blah blah '
            },
        ],
    },

    {
        imageUrl: 'https://pyxis.nymag.com/v1/imgs/657/bbb/259a4839d3edc6291346cf561762f9f1da-lil-uzi-vert.rsquare.w1200.jpg',
        user: USERS[2].user,
        likes: 7870,
        caption: "This is lil uzi vert who singed Xo Tour Life 3 that was a hit song in USA Billboard No (1) and in Youtube",
        profile_picture: USERS[2].image,
        comments: [
            
        ],
    }
]
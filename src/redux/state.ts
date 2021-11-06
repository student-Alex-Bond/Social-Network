let rerenderEntireTree = () => {
    console.log('Changed')
}


let state = {
    profilePage :{
        posts: [
            {id: 1, message: 'Hi, how are you', likesCount: 15},
            {id: 2, message: 'I\'m fine', likesCount: 5}],
        newPostText: 'YOyo',
    },
    dialogsPage : {
       dialogs: [
           {id: 1, name: 'Dimych'},
           {id: 2, name: 'Tolubaev'},
           {id: 3, name: 'Susin'},
           {id: 4, name: 'Ruletkin'},
           {id: 5, name: 'Ment'},
       ],
       messages: [
           {id: 1, message: 'Hi, how are you'},
           {id: 2, message: 'i am a tolubaev'},
           {id: 3, message: 'did you'},
           {id: 4, message: 'i am not understand'},
           {id: 5, message: 'yes of cos'},
       ],
   },
}

export const addPost = (postMessage: string) => {
    let newPost = {
        id: 3,
        message: postMessage,
        likesCount: 0,
    }
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = ''
    rerenderEntireTree();
};

export const updatePostChange = (newText: string) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree();

};

export const subscribe = (observer: any) => {
    rerenderEntireTree = observer
}

export default state;
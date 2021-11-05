let state = {
    profilePage :{
        posts: [
            {id: 1, message: 'Hi, how are you', likesCount: 15},
            {id: 2, message: 'I\'m fine', likesCount: 5}],
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

export default state;
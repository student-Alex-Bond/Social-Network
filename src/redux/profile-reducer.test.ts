import profileReducer, {addPostActionCreator, deletePostAC, postType, profileType} from "./profile-reducer";

let state = { // обьект для инициализации чтобы в функции combineReducer не было undefined
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 15},
        {id: 2, message: 'Hi, fuck you', likesCount: 0},
        {id: 3, message: 'Hi, how are you', likesCount: 0},
        {id: 4, message: 'I\'m fine', likesCount: 0}] as Array<postType>,
    newPostText: '',
    profile: null as profileType | null,
    status: ''
}

it('new post should be added',()=>{
    let action = addPostActionCreator('it-test')
 let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(5)
})

it('message of new post should be \'it-test\'',()=>{
    let action = addPostActionCreator('it-test')
    let newState = profileReducer(state,action)

    expect(newState.posts[4].message).toBe('it-test')
})

it('length after decrement should be correct',()=>{
    let action = deletePostAC(1)
    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(3)
})
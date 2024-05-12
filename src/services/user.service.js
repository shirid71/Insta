import axios from 'axios';
import { storageService } from './async-storage.service'
import { showErrorMsg, showSuccessMsg, showUserMsg } from '../services/event-bus.service'
import { utilService } from './util.service.js'


export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    getUserBy,
    updateLocalUserFields,
    getEmptyUser,
    filterUsers,
    addFollowTo
}

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'users'
const STORAGE_KEY_SUGGESTED = 'suggestedUsers'
const UNSPLASH_API_KEY = 'MhFtxVxMTMi51hf2I1FvdKiFfKBujngxYGvbNqwOqQo'

window.userService = userService

async function getUsers(key) {
    return storageService.query(key).then(curUsers => {
        curUsers.length > 0 ? curUsers: _createUsers()
        return curUsers
    })
    .catch(err => {
        console.log('Cannot load users ', err)
        throw err
    })
}

async function getById(userId) {
    const user = await storageService.get(STORAGE_KEY, userId)
    return user
}

function remove(entity, userId) {
    return storageService.remove(entity, userId)
}

async function update({ _id, score }) {
    const user = await storageService.get(STORAGE_KEY, _id)
    user.score = score
    await storageService.put(STORAGE_KEY, user)

    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query(STORAGE_KEY)
    const user = users.find(user => user.username === userCred.username)
    if (user) {
        return saveLocalUser(user)
    }
    else{
        showErrorMsg('Cannot find user')
    }
}
async function signup(userCred) {
    const randImg = await fetchRandomImage()
    if (!userCred.imgUrl) userCred.imgUrl = await fetchRandomImage()
    // if (!userCred.imgUrl) userCred.imgUrl = 'https://i.pinimg.com/564x/31/44/48/31444808f81fcacc1fb91bf32d3f77ec.jpg'
    const user = await storageService.post(STORAGE_KEY, userCred)
    return saveLocalUser(user)
}

const fetchRandomImage = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: UNSPLASH_API_KEY,
          query: 'people'
        },
      });

      return response.data.urls.regular;
    } catch (error) {
      console.error('Error fetching random image:', error);
    }
  };
  

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function updateLocalUserFields(user) {
    const currUser = getLoggedinUser()
    const userToSave = { ...currUser, ...user }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return user
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function filterUsers(filterBy, users) {
    if (!users.length) return
    const regex = new RegExp(filterBy.txt, 'i')
    users = users.filter(user => {
        return regex.test(user.username)
    })
    return users
}

function getUserBy(users, userName) {
    if (!userName) return
    const user = users.filter(curUser => curUser.username == userName);
    return user
}

async function addFollowTo(users, user, followUser) {
    if (!followUser) return
    let fetchedUser = getUserBy(users, followUser)[0]
    if(user.following.indexOf(fetchedUser._id) > -1) //user already exist
        return user
    user.following = [...user.following, fetchedUser._id]
    // we want to remove the new following from the suggested
    remove('suggestedUsers', fetchedUser._id)
    await update(user)
    return user
}

function getEmptyUser() {
    return {
        username: "",
        password: "",
        fullname: "",
        imgUrl: '',
        bio: '',
        following: [],
        followers: [],
        savedStoryIds: []
    }
}

function _createUsers() {
    const users = [{
        "_id": "3110",
        "username": "shirid",
        "fullname": "Shiri Hameiri",
        "imgUrl": "https://i.pinimg.com/564x/31/44/48/31444808f81fcacc1fb91bf32d3f77ec.jpg",
        "bio": "Just a girl in the world about to burn",
        "following": ["a102","a103"],
        "followers": ["a104"],
        "savedStoryIds": ["s104"]
      },
      {
        "_id": utilService.makeId(),
        "username": "aric",
        "fullname": "Ariel Cohen",
        "imgUrl": "https://static.wikia.nocookie.net/disneyprincess/images/c/cd/4up_upc-ariel_20210427.webp",
        "bio": "Just a girl in the world about to die",
        "following": ["a102","a103"],
        "followers": ["a104"],
        "savedStoryIds": ["s104"]
      },
      {
        "_id": utilService.makeId(),
        "username": "bellel",
        "fullname": "Belle Levi",
        "imgUrl": "https://static.wikia.nocookie.net/disneyprincess/images/9/97/4up_upc-belle_20210427.webp",
        "bio": "Just a girl in the world about to run",
        "following": ["a102","a103"],
        "followers": ["a104"],
        "savedStoryIds": ["s104"]
      },
      {
        "_id": utilService.makeId(),
        "username": "jasm",
        "fullname": "Jasmine Mizrachi",
        "imgUrl": "https://static.wikia.nocookie.net/disneyprincess/images/f/f6/4up_upc-jasmine_20210427.webp",
        "bio": "Just a girl in the world about to rub",
        "following": ["a102","a103"],
        "followers": ["a104"],
        "savedStoryIds": ["s104"]
      }]

      const suggestedUsers = [
      {
        "_id": utilService.makeId(),
        "username": "vivham",
        "fullname": "vivi Hameiri",
        "imgUrl": "https://as2.ftcdn.net/v2/jpg/02/24/86/95/1000_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
        "bio": "Just a girl in the world about to cook",
        "following": ["a102","a103"],
        "followers": ["a104"],
        "savedStoryIds": ["s104"]
      },
      {
        "_id": utilService.makeId(),
        "username": "kobham",
        "fullname": "Kobi Hameiri",
        "imgUrl": "https://st3.depositphotos.com/1743476/16188/i/1600/depositphotos_161885408-stock-photo-latin-man-standing.jpg",
        "bio": "Just a boy in the world about to rub",
        "following": ["a102","a103"],
        "followers": ["a104"],
        "savedStoryIds": ["s104"]
      },
      {
        "_id": utilService.makeId(),
        "username": "danil",
        "fullname": "Daniela Lahav",
        "imgUrl": "https://st4.depositphotos.com/12985790/20643/i/600/depositphotos_206433500-stock-photo-attractive-elegant-woman-posing-autumn.jpg",
        "bio": "Just a girl in the world about to kiss",
        "following": ["a102","a103"],
        "followers": ["a104"],
        "savedStoryIds": ["s104"]
      }
    ]
    utilService.saveToStorage(STORAGE_KEY, users)
    utilService.saveToStorage(STORAGE_KEY_SUGGESTED, suggestedUsers)
    return users
}





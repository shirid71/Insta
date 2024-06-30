import { userService } from "../services/user.service.js";
import { store } from './store.js'

import { showErrorMsg } from '../services/event-bus.service.js'
import { LOADING_DONE,LOADING_START_SUGGESTED, LOADING_DONE_SUGGESTED, LOADING_START } from "./system.reducer.js";
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER, SET_SUGGESTED  } from "./user.reducer.js";

export async function loadUsers() {
    console.log('loadUsers')
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers('users')
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function loadSuggested() {
    console.log('loadSuggested')
    try {
        store.dispatch({ type: LOADING_START_SUGGESTED })
        const suggestedUsers = await userService.getUsers('suggestedUsers') 
        console.log('suggestedUsers', suggestedUsers)
        store.dispatch({ type: SET_SUGGESTED, suggestedUsers })
    } catch (err) {
        console.log('UserActions: err in loadsuggestedUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE_SUGGESTED })
    }
}

export async function removeUser(entity, xuserId) {
    try {
        await userService.remove(entity, userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId);
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}
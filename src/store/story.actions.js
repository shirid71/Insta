
import { store } from './store.js'
import { ADD_STORY, REMOVE_STORY, SET_STORIES, UPDATE_STORY, SET_IS_LOADING } from "./story.reducer.js";
import { storyService } from "../services/story.service.js";

export function getActionRemoveStory(storyId) {
    return {
        type: REMOVE_STORY,
        storyId
    }
}

export function getActionAddStory(story) {
    store.dispatch({ type: ADD_STORY, story })

}

export function getActionUpdateStory(story) {
    return {
        type: UPDATE_STORY,
        story
    }
}

export async function loadStories() {
    console.log('loadStories')
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    try {
        const stories = await storyService.query()
        store.dispatch({
            type: SET_STORIES,
            stories
        })

    } catch (err) {
        console.log('Cannot load stories', err)
        throw err
    }
    finally {
		store.dispatch({ type: SET_IS_LOADING, isLoading: false })
	}

}

export async function removeStory(storyId) {
    try {
        await storyService.remove(storyId)
        store.dispatch(getActionRemoveStory(storyId))
    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function addStory(story) {
    try {
        const savedStory = await storyService.save(story)
        console.log('Added Story', savedStory)
        store.dispatch(getActionAddStory(savedStory))
        return savedStory
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export function updateStory(story) {
    return storyService.save(story)
        .then(savedStory => {
            console.log('Updated Story:', savedStory)
            store.dispatch(getActionUpdateStory(savedStory))
            return savedStory
        })
        .catch(err => {
            console.log('Cannot save story', err)
            throw err
        })
}


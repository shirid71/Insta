import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from "react-router-dom";
import { loadStories } from '../store/story.actions.js'
import { StoriesList } from '../cmps/StoriesList.jsx'
import { LikesModal } from '../cmps/LikesModal.jsx';
import { LoginSwitch } from '../cmps/LoginSwitch.jsx';
import { loadUsers, loadSuggested } from '../store/user.actions.js';
import { LoginSignup } from '../cmps/LoginSignup.jsx';
import { userService } from '../services/user.service'
import { Suggestions } from '../cmps/Sugesstion.jsx';

export function StoryIndex() {
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const user = useSelector(storeState => storeState.userModule.user)
    const users = useSelector(storeState => storeState.userModule.users)
    const suggestedUsers = useSelector(storeState => storeState.userModule.suggestedUsers)
    const [likes, likesIsOpen] = useState([])
    const [userSwitch, switchIsOpen] = useState(false)
    const navigate = useNavigate()

    const fetchData = async () => {
        await loadStories()
        await loadUsers()
        await loadSuggested()
    }
    
    useEffect(() => {
        if (stories.length && user) return
        fetchData()
    }, [])

    function goToProfile(username) {
        navigate(`/${username}`)
    }

    async function addFollow(suggestedUser) {
        userService.addFollowTo(suggestedUsers, user, suggestedUser)
         fetchData()
    }

    if (stories.length && !user) return <LoginSignup />

    if (!stories.length) return <div className="loading-page"><span className="loading"></span></div>
    return (
        <Fragment>
            <div className="nested-route">
                <Outlet />
            </div>
            {likes.length ? <LikesModal likesIsOpen={likesIsOpen} likes={likes} /> : null}
            {userSwitch ? <LoginSwitch switchIsOpen={switchIsOpen} /> : null}

            <div className='contant'>
                <StoriesList stories={stories} likesIsOpen={likesIsOpen} />
                <Suggestions user={user} suggestedUsers={suggestedUsers} goToProfile={goToProfile} switchIsOpen={switchIsOpen} addFollow={addFollow}/>
            </div>
        </Fragment>
    )
}

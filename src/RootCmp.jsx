import React from 'react'
import { Routes, Route } from 'react-router'

// const Router = ReactRouterDOM.HashRouter
// import routes from './routes'

import { SideBar } from './cmps/SideBar'
import { StoryDetails } from './cmps/StoryDetails'
import { StoryIndex } from './pages/StoryIndex'
import CreateStoryModal from './cmps/CreateModal'
import { LoginSignup } from './cmps/LoginSignup'
import { useSelector } from 'react-redux'
import { UserDetails } from './pages/UserDetails'
import { Messanger } from './pages/Messanger'


export function RootCmp() {
    const isModalOpen = useSelector(storeState => storeState.systemModule.isModalOpen)

    return (
        <div className='app-container'>
            {isModalOpen && <CreateStoryModal />}
            <SideBar />
            <main className='contant-container'>
                <Routes>
                    <Route path="/post" element={<StoryIndex />} >
                        <Route path="/post/:id" element={<StoryDetails />} />
                    </Route>
                    <Route path="/" element={<StoryIndex />} />
                    <Route path="/:username" element={<UserDetails />} />
                    {/* <Route path="inbox" element={<Messanger />} > */}
                        {/* <Route path=":id" element={<Messanger />} /> */}
                    {/* </Route> */}
                    {/* <Route path="login" element={<LoginSignup />} /> */}
                    {/* <Route path="chat" element={<ChatApp />} /> */}
                    {/* <Route path="review" element={<ReviewIndex />} /> */}
                </Routes>
            </main>
        </div>
    )
}



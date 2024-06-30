import React from 'react'
import { Routes, Route } from 'react-router'

import { SideBar } from './cmps/SideBar'
import { StoryDetails } from './cmps/StoryDetails'
import { StoryIndex } from './pages/StoryIndex'
import CreateStoryModal from './cmps/CreateModal'
import { useSelector } from 'react-redux'
import { UserDetails } from './pages/UserDetails'

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
                </Routes>
            </main>
        </div>
    )
}



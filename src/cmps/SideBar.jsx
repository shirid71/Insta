import { useMediaQuery } from '@mui/material';
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment, useState } from 'react'
import { toggleModal } from '../store/system.action'
import { SearchModal } from './SearchModal.jsx'
import { logout } from '../store/user.actions.js'
import logo from '../assets/img/logo.png'
import Instagram_logo from '../assets/img/Instagram_logo.png'

export function SideBar() {
    const user = useSelector(storeState => storeState.userModule.user)

    const [isExpanded, setIsExpanded] = useState(false)
    const [searchModal, setSearchModal] = useState(false)
    const [full, setFull] = useState(true)
    let isSmallScreen = false;

    function onSearch() {
        setSearchModal(!searchModal)
        setFull(!full)
    }


    async function onLogout() {
        try {
             await logout()

        } catch (err) {
            console.log(err)
        }
    }
    
    isSmallScreen = useMediaQuery('(max-width: 1040px)');
      
    if (!user) return <div className="loading-page"></div>
    return (
        <Fragment>
            <SearchModal setSearchModal={setSearchModal} searchModal={searchModal} full={full} setFull={setFull} />
            <section className={full ? "side-bar" : "side-bar mini"}>
                <a className="icon" href='/'>
                    <img src={isSmallScreen? logo : Instagram_logo}/>
                </a>
                <nav>
                    <NavLink className='nav-btn' to='/'><span className='nav-icon'><i className="fa-solid fa-house"></i></span><span className='nav-name'>Home</span></NavLink>
                    <a onClick={onSearch} className='nav-btn'><span className='nav-icon'><i className="fa-solid fa-magnifying-glass"></i></span><span className='nav-name' >Search</span></a>
                    <a onClick={toggleModal} className='nav-btn mobile'><span className='nav-icon'><i className="fa-regular fa-square-plus"></i></span><span className='nav-name' >Create</span></a>
                    <NavLink className='nav-btn' to={user.username}><span className='nav-icon'><img src={user.imgUrl} /></span><span className='nav-name' >Profile</span></NavLink>
                </nav>
                <div>
                    <div className={isExpanded ? 'nav-more open' : 'nav-more'}>
                        <Link className='nav-more-btn' to='switch'>Switch accounts</Link>
                        <a className='nav-more-btn' onClick={onLogout}>Logout</a>
                    </div>
                </div>
                <a className="side-bar-more" onClick={() => setIsExpanded(!isExpanded)}><i className="fa-solid fa-bars"></i><span>More</span></a>
            </section>
        </Fragment>
    )
}






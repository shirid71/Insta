

export function Suggestions({ user, goToProfile, switchIsOpen }) {
    console.log('%c user ', 'font-size: 1rem; color: red;', user);


    return <div className='suggestions'>
        <div className='suggestion-header'>
            <div className='suggestion-user-info'>
                <img className='suggestion-photo' src={user.imgUrl} onClick={() => goToProfile(user.username)} />
                <div className='suggestion-user-name'>
                    <a onClick={() => goToProfile(user.username)}>{user.username}</a>
                    <span>{user.fullname}</span>
                </div>
            </div>
            <a className='suggestion-switch' onClick={() => switchIsOpen(true)}>Switch</a>
        </div>


        <div className='suggestion-options'>
            <span>Suggestions For You</span>
            <a>See All</a>
        </div>

        <ul>
            <li>
                <div className='suggestion-profile'>
                    <img src="https://as2.ftcdn.net/v2/jpg/02/24/86/95/1000_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg" />
                    <div className='suggestion-profile-info'>
                        <a className='suggestion-profile-name'>vivi Hameiri</a>
                        <a className='suggestion-profile-followers'>Followed by ofirid</a>
                    </div>
                </div>
                <span className='suggestion-profile-folow'>Follow</span>
            </li>
            <li>
                <div className='suggestion-profile'>
                    <img src="https://st3.depositphotos.com/1743476/16188/i/1600/depositphotos_161885408-stock-photo-latin-man-standing.jpg" />
                    <div className='suggestion-profile-info'>
                        <a className='suggestion-profile-name'>Kobi Hameiri</a>
                        <a className='suggestion-profile-followers'>Followed by alexandrad</a>
                    </div>
                </div>
                <span className='suggestion-profile-folow'>Follow</span>
            </li>
            <li>
                <div className='suggestion-profile'>
                    <img src="https://st4.depositphotos.com/12985790/20643/i/600/depositphotos_206433500-stock-photo-attractive-elegant-woman-posing-autumn.jpg" />
                    <div className='suggestion-profile-info'>
                        <a className='suggestion-profile-name'>DanielaLahav</a>
                        <a className='suggestion-profile-followers'>Follows you</a>
                    </div>
                </div>
                <span className='suggestion-profile-folow'>Follow</span>
            </li>

        </ul>
        <div className='suggestion-more'>
            <span className="more">About • Help • PressAPI • Jobs • Privacy • Terms • Locations • Language</span>
            <span>© 2024 Instagram</span>

        </div>
    </div>
}
export function Suggestions({ user, suggestedUsers, goToProfile, switchIsOpen, addFollow }) {

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
        {suggestedUsers.map(suggestedUser => 
                 <li key={suggestedUser._id}>
                <div className="suggestion-profile">
                    <img src={suggestedUser.imgUrl} />
                    <div className='suggestion-profile-info'>
                        <a className='suggestion-profile-name' onClick={() => goToProfile(`${suggestedUser.username}`)}>{suggestedUser.fullname}</a>
                        <div className='suggestion-profile-followers'>Suggested for you</div>
                    </div>
                </div>
                <span className='suggestion-profile-folow' onClick={() => addFollow(`${suggestedUser.username}`)}>Follow</span>
            </li>)}
        </ul>
        <div className='suggestion-more'>
            <span className="more">About • Help • PressAPI • Jobs • Privacy • Terms • Locations • Language</span>
            <span>© 2024 Instagram</span>
        </div>
    </div>
}
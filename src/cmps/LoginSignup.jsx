import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { login, signup } from '../store/user.actions.js'
import { useNavigate } from "react-router-dom";

export function LoginSignup() {
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const [isSignup, setIsSignup] = useState(false)
    const [users, setUsers] = useState([])
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        loadUsers('users')
        loadSuggested()
    }, [])


    async function Login(credentials) {
        try {
            const user = await login(credentials)
            console.log('USER FROM LOGIN', user)

        } catch (err) {
            console.log(err)
            setMessage("Wrong username/password")
        }
    }

    async function Signup(credentials) {
        try {
            const user = await signup(credentials)
            navigate('/')
            console.log('USER FROM SIGN UP', user)
        } catch (err) {
            console.log(err)
        }
    }

    async function loadUsers(type) {
        const users = await userService.getUsers(type)
        setUsers(users)
    }

    function clearState() {
        setCredentials(userService.getEmptyUser())
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        Login(credentials)
        clearState()
    }

    function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        Signup(credentials)
        clearState()
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }


    return (
        <div className="login-page">
            <div className='login-container'>
                <div className='logo'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" />
                </div>

                {!isSignup && <form className="login-form" onSubmit={onLogin}>


                            <input type="text" name="username" placeholder='Username' onChange={handleChange}/>
                            <input type="password" name="password" placeholder='Password' onChange={handleChange}/>
                            <span>{message}</span>

                    <button>Login</button>
                </form>}
                <div className="signup-section">
                    {isSignup && <form className="signup-form" onSubmit={onSignup}>
                        <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            placeholder="Fullname"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <button >Signup!</button>
                    </form>}

                </div>

                <span className='or'><span>OR</span></span>
                <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>


            </div>
        </div>
    )
}

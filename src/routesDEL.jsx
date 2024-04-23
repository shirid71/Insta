import { HomePage } from './pages/HomePage.jsx'
import { Explore } from './pages/Explore.jsx'
import { Search } from './pages/Search.jsx'
import { Messages } from './pages/Messages.jsx'
import { Create } from './pages/Create.jsx'
import { Profile } from './pages/Profile.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: 'explore',
        component: <Explore />,
        label: 'Explore '
    },
    {
        path: 'search',
        component: <Search />,
        label: 'Search '
    },
    {
        path: 'messages',
        component: <Messages />,
        label: 'Messages '
    },
    {
        path: 'create',
        component: <Create />,
        label: 'Create '
    },
    {
        path: 'profile',
        component: <Profile />,
        label: 'Profile '
    }
]

export default routes
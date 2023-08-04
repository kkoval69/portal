import { Routes, Route } from 'react-router-dom'
import NPortal from '../pages/NPortal.js'
import Login from '../pages/Login.js'
import Signup from '../pages/Signup.js'
import Favorite from '../pages/Favorite.js'
import Article from '../pages/Article.js'
import SearchPage from '../pages/SearchPage.js'
import NotFound from '../pages/NotFound.js'
import User from '../pages/User.js'
import Admin from '../pages/Admin.js'
import AdminCategories from '../pages/AdminCategories.js'
import AdminTags from '../pages/AdminTags.js'
import AdminArticles from '../pages/AdminArticles.js'
import { AppContext } from './AppContext.js'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import UserCommentarys from '../pages/UserCommentarys.js'
import UserCommentary from '../pages/UserCommentary.js'
import AdminCommentarys from '../pages/AdminCommentarys.js'
import AdminCommentary from '../pages/AdminCommentary.js'
const publicRoutes = [
    { path: '/', Component: NPortal },
    { path: '/login', Component: Login },
    { path: '/signup', Component: Signup },
    { path: '/article/:id', Component: Article },
    { path: '/favorite', Component: Favorite },
    { path: '/searchpage', Component: SearchPage },
    { path: '*', Component: NotFound },
]

const authRoutes = [
    { path: '/user', Component: User },
    { path: '/user/commentarys', Component: UserCommentarys },
    { path: '/user/commentary/:id', Component: UserCommentary },
]

const adminRoutes = [
    { path: '/admin', Component: Admin },
    { path: '/admin/categories', Component: AdminCategories },
    { path: '/admin/tags', Component: AdminTags },
    { path: '/admin/commentarys', Component: AdminCommentarys },
    { path: '/admin/commentary/:id', Component: AdminCommentary },
    { path: '/admin/articles', Component: AdminArticles },
]

const AppRouter = observer(() => {
    const { user } = useContext(AppContext)
    return (
        <Routes>
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {user.isAdmin && adminRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
        </Routes>
    )
})

export default AppRouter
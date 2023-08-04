import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter.js'
import NavBar from './components/NavBar.js'
import 'bootstrap/dist/css/bootstrap.min.css'

import { AppContext } from './components/AppContext.js'
import { check as checkAuth } from './http/userAPI.js'
import { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Loader from './components/Loader.js'

import { fetchFavorite } from './http/favoriteAPI.js'

import axios from 'axios'
import Footer from './components/Footer.js'

const App = observer(() => {
    const { user, favorite } = useContext(AppContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([checkAuth(), fetchFavorite()])
            .then(
                axios.spread((userData, favoriteData) => {
                    if (userData) {
                        user.login(userData)
                    }
                    favorite.articles = favoriteData.articles
                })
            )
            .finally(
                () => setLoading(false)
            )
    }, [])

    // показываем loader, пока получаем пользователя и избр
    if (loading) {
        return <Loader />
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
            <Footer />

        </BrowserRouter>
    )
})

export default App

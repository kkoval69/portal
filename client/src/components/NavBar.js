import { NavLink } from 'react-router-dom'
import { AppContext } from './AppContext.js'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'
import "../css/js/main.js"
const NavBar = observer(() => {
    const { user, favorite } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/login', { replace: true })
    }
    function openNav() {
        document.getElementById("mySidenav").style.left = "280px";
        document.getElementById("mySidenav").style.opacity = "100";
        document.getElementById("mySidenav").style.visibility = "inherit";
        document.getElementById("mySidenav").style.overflow = "hidden";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.left = "0";
        document.getElementById("mySidenav").style.opacity = "0";
        document.getElementById("mySidenav").style.visibility = "hidden";
    }

    return (
        <header class="site-header sticky-header" name="top">
            <div class="header-topbar d-none d-sm-block">
                <div class="container">
                    <div class="row justify-content-between align-items-center">
                        <div class="col-auto">
                            <ul class="contact-info">
                                <li><a href="#"><i class="far fa-envelope"></i> kovaal@gmail.com</a></li>
                                <li><a href="#"><i class="far fa-map-marker-alt"></i> ул.Гагарина 41А, Витебск, Беларусь</a></li>
                            </ul>
                        </div>
                        <div class="col-auto d-none d-md-block">
                            <ul class="social-icons">

                                <li><a href="#"><i class="fab fa-youtube"></i></a></li>

                                <li><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="navbar-wrapper">
                <div class="container">
                    <div class="navbar-inner">
                        <div class="site-logo">
                            <h4>
                                <a href="/">

                                    Новостной портал
                                </a></h4>
                        </div>
                        <div class="nav-menu">
                            <ul>
                                <li>
                                    <a href="/">Главная</a>
                                </li>

                                <li>
                                    {user.isAuth ? (
                                        <>
                                            <a href="#">{user.email}</a>
                                            <ul class="submenu">
                                                {user.isAdmin && (
                                                    <li><NavLink to="/admin" className="nav-link">Панель управления</NavLink></li>
                                                )}
                                                <li><NavLink onClick={handleLogout} to="/login">Выйти</NavLink></li>
                                            </ul></>
                                    ) : (
                                        <>
                                            <a href="#">Аккаунт</a>
                                            <ul class="submenu">
                                                <li><NavLink to="/login" className="nav-link">Войти</NavLink></li>
                                                <li><NavLink to="/signup" className="nav-link">Регистрация</NavLink></li>
                                            </ul>

                                        </>
                                    )}</li>
                            </ul>
                        </div>
                        <div class="navbar-extra d-flex align-items-center">
                            {user.isAuth ? (
                                <a href="/favorite" class="main-btn nav-btn d-none d-sm-inline-block">
                                    Избранное<i class="far fa-arrow-right"></i>
                                </a>
                            ) : (
                                <a href="#" class="main-btn nav-btn d-none1 d-sm-inline-block btn_disabled">
                                    Избранное<i class="far fa-arrow-right"></i>
                                </a>
                            )}
                            <a href="#" class="nav-toggler" onClick={openNav} >
                                <span></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="mySidenav" class="mobile-menu-panel">
                <div class="panel-logo">
                    <h4 >
                    </h4>
                </div>
                <ul class="panel-menu">
                    <li>
                        <a href="/">Главная</a>
                    </li>
                    <li>
                        {user.isAuth ? (
                            <>
                                <ul >
                                    {user.isAdmin && (
                                        <li><NavLink to="/admin" className="nav-link">Панель управления</NavLink></li>
                                    )}
                                    <li><NavLink onClick={handleLogout} to="/login">Выйти</NavLink></li>
                                </ul></>
                        ) : (
                            <>
                                <ul >
                                    <li><NavLink to="/login" className="nav-link">Войти</NavLink></li>
                                    <li><NavLink to="/signup" className="nav-link">Регистрация</NavLink></li>
                                </ul>

                            </>
                        )}</li>
                </ul>
                <div class="panel-extra">
                    {user.isAuth ? (
                        <a href="/favorite" class="main-btn nav-btn d-none1 d-sm-inline-block">
                            Избранное<i class="far fa-arrow-right"></i>
                        </a>
                    ) : (
                        <a href="#" class="main-btn nav-btn d-none1 d-sm-inline-block btn_disabled">
                            Избранное<i class="far fa-arrow-right"></i>
                        </a>
                    )}
                </div>
                <a href="#" class="panel-close" onClick={closeNav}>
                    <i class="fal fa-times"></i>
                </a>
            </div>
        </header >


    )
})

export default NavBar

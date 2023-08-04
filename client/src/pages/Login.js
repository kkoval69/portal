import { AppContext } from '../components/AppContext.js'
import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Card, Form, Button } from 'react-bootstrap'
import { login } from '../http/userAPI.js'
import { observer } from 'mobx-react-lite'
import p1 from "../css/img/avtoriz.jpg"
const Login = observer(() => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user.isAdmin) navigate('/admin', { replace: true })
        if (user.isAuth) navigate('/', { replace: true })
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const email = event.target.email.value.trim()
        const password = event.target.password.value.trim()
        const data = await login(email, password)
        if (data) {
            user.login(data)
            if (user.isAdmin) navigate('/admin')
            if (user.isAuth) navigate('/')
            window.scrollTo(0, 0)
        }
    }

    return (
        <>
            <section class="page-title-area">
                <div class="container">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-lg-8">
                            <h1 class="page-title">Авторизация</h1>
                        </div>
                        <div class="col-auto">
                            <ul class="page-breadcrumb">
                                <li><a href="/">Главная</a></li>
                                <li><a href="#">Авторизация</a></li>

                            </ul>
                        </div>
                    </div>
                </div>

            </section>


            <Container className='d-flex justify-content-center avtoriz_block'>
                <div class="contact-from-area">
                    <div class="row no-gutters">
                        <div class="col-lg-5">
                            <div class="contact-maps">
                                <img src={p1} style={{ height: "100%" }}></img>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <div class="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <h3 class="form-title">Авторизация</h3>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-field mb-25">
                                                <label htmlFor="phone-number">Email</label>
                                                <input
                                                    name="email"
                                                    className="mt-3"
                                                    placeholder="Введите email..."
                                                />
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-field mb-25">
                                                <label htmlFor="email">Пароль</label>
                                                <input
                                                    name="password"
                                                    className="mt-3"
                                                    type="password"
                                                    placeholder="Введите пароль..."
                                                />
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-field">
                                                <button class="main-btn" type="submit">Войти <i class="far fa-arrow-right"></i></button>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">

                                            <Link to="/signup" className='mt-3'>Зарегистрироваться</Link>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div></Container>
        </>

    )
})

export default Login

import { Container, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from '../components/AppContext.js'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'

const User = () => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/login', { replace: true })
    }

    return (
        <>
            <section class="page-title-area">
                <div class="container">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-lg-8">
                            <h1 class="page-title">Личнный кабинет</h1>
                        </div>
                        <div class="col-auto">
                            <ul class="page-breadcrumb">
                                <li><a href="/">Главная</a></li>
                                <li><a href="">Личнный кабинет</a></li>

                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <Container className='cab_block'>
                <h3>
                    Добро пожаловать {user.email}
                </h3>
                <Button onClick={handleLogout} className='mt-4'>Выйти</Button>
            </Container>
        </>

    )
}

export default User
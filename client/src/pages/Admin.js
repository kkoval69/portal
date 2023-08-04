import { Container } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from '../components/AppContext.js'
import { useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'

const Admin = () => {
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
                            <h1 class="page-title">Панель управления</h1>
                        </div>
                        <div class="col-auto">
                            <ul class="page-breadcrumb">
                                <li><a href="/">Главная</a></li>
                                <li><a href="">Панель управления</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Container className='admin_block'>
                <h3>
                    Добро пожаловать {user.email}
                </h3>
                <div class="widget nav-widget">
                    <ul>
                        <li><a href="/admin/categories">Категории</a></li>
                        <li><a href="/admin/tags">Теги</a></li>
                        <li><a href="/admin/articles">Новости</a></li>

                    </ul>
                </div>
            </Container>
        </>

    )
}

export default Admin
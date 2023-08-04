import FavoriteList from '../components/FavoriteList.js'
import { Container } from 'react-bootstrap'

const Favorite = () => {
    return (
        <>
            <section class="page-title-area">
                <div class="container">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-lg-8">
                            <h1 class="page-title">Избранное</h1>
                        </div>
                        <div class="col-auto">
                            <ul class="page-breadcrumb">
                                <li><a href="/">Главная</a></li>
                                <li>Избранное</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </section>
            <Container className='favorite_block'>
                <FavoriteList />
            </Container></>

    )
}

export default Favorite
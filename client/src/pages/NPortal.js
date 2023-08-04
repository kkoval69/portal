import { Container, Row, Col, Spinner } from 'react-bootstrap'
import CategoryBar from '../components/CategoryBar.js'
import TagBar from '../components/TagBar.js'
import ArticleList from '../components/ArticleList.js'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../components/AppContext.js'
import { fetchCategories, fetchTags, fetchAllArticles } from '../http/newsAPI.js'
import { observer } from 'mobx-react-lite'
import { useLocation, useSearchParams } from 'react-router-dom'

const getSearchParams = (searchParams) => {
    let category = searchParams.get('category')
    if (category && /[1-9][0-9]*/.test(category)) {
        category = parseInt(category)
    }
    let tag = searchParams.get('tag')
    if (tag && /[1-9][0-9]*/.test(tag)) {
        tag = parseInt(tag)
    }
    let page = searchParams.get('page')
    if (page && /[1-9][0-9]*/.test(page)) {
        page = parseInt(page)
    }
    return { category, tag, page }
}

const NPortal = observer(() => {
    const { news } = useContext(AppContext)

    const [categoriesFetching, setCategoriesFetching] = useState(true)
    const [tagsFetching, setTagsFetching] = useState(true)
    const [articlesFetching, setArticlesFetching] = useState(true)
    const location = useLocation()
    const [searchParams] = useSearchParams()

    useEffect(() => {

        fetchCategories()
            .then(data => news.categories = data)
            .finally(() => setCategoriesFetching(false))

        fetchTags()
            .then(data => news.tags = data)
            .finally(() => setTagsFetching(false))

        const { category, tag, page } = getSearchParams(searchParams)
        news.category = category
        news.tag = tag
        news.page = page ?? 1

        fetchAllArticles(news.category, news.tag, news.page, news.limit)
            .then(data => {

                news.articles = data.rows
                news.count = data.count
            })
            .finally(() => setArticlesFetching(false))
    }, [])


    // При каждом клике на категорию, тег или номер страницы — мы добавляем элемент в историю
    // браузера, ссылки в истории имеют вид /?page=1, /?page=2, /?page=3. При нажатии кнопки 
    // «Назад» браузера — мы отслеживаем изменение GET-параметров и изменяем состояние хранилища.
    useEffect(() => {

        const { category, tag, page } = getSearchParams(searchParams)

        if (category || tag || page) {
            if (category !== news.category) {
                news.category = category
            }
            if (tag !== news.tag) {
                news.tag = tag
            }
            if (page !== news.page) {
                news.page = page ?? 1
            }
        } else {
            news.category = null
            news.tag = null
            news.page = 1
        }
    }, [location.search])

    // при клике на категорию, тег, номер страницы и т.д. получам с сервера список новостей, потому что это уже другой список
    useEffect(() => {
        setArticlesFetching(true)
        fetchAllArticles(news.category, news.tag, news.page, news.limit)
            .then(data => {
                news.articles = data.rows
                news.count = data.count
            })
            .finally(() => setArticlesFetching(false))
    }, [news.category, news.tag, news.page])

    return (
        <>
            <section class="page-title-area">
                <div class="container">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-lg-8">
                            <h1 class="page-title">События, новости, комментарии</h1>
                        </div>
                        <div class="col-auto">
                            <ul class="page-breadcrumb">
                                <li><a href="/">Главная</a></li>

                            </ul>
                        </div>
                    </div>
                </div>

            </section>
            <>


                <section class="blog-area section-gap-extra-bottom primary-soft-bg">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="blog-post-loop">
                                    <div>
                                        {articlesFetching ? (
                                            <Spinner animation="border" />
                                        ) : (
                                            <ArticleList />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="blog-sidebar">
                                    <div class="widget search-widget">
                                        <h4 class="widget-title">Поиск</h4>
                                        <div class="navbar-extra d-flex align-items-center">

                                            <a href="/searchpage" class="main-btn nav-btn d-none1 d-sm-inline-block sa">
                                                <i class="fas fa-search"></i>
                                            </a>
                                            <a href="#" class="nav-toggler">
                                                <span></span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="widget category-widget">
                                        <h4 class="widget-title">Категория</h4>
                                        <ul>
                                            {categoriesFetching ? (
                                                <Spinner animation="border" />
                                            ) : (
                                                <CategoryBar />
                                            )}
                                        </ul>
                                    </div>
                                    <div class="widget tags-widget">
                                        <h4 class="widget-title">Теги</h4>
                                        {tagsFetching ? (
                                            <Spinner animation="border" />
                                        ) : (
                                            <TagBar />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>


            </>
        </>
    )
})

export default NPortal

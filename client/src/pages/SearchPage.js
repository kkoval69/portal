import ArticleItem from '../components/ArticleItem.js'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../components/AppContext.js'
import { observer } from 'mobx-react-lite'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { fetchCategories, fetchTags, fetchAllArticles } from '../http/newsAPI.js'
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


const SearchPage = observer((dataS) => {
    const { news } = useContext(AppContext)
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState("")
    const [articles, setArticles] = useState([])
    const [fetching, setFetching] = useState(true)
    const [articlesFetching, setArticlesFetching] = useState(true)
    const [searchParams] = useSearchParams()
    const [categoriesFetching, setCategoriesFetching] = useState(true)
    const [tagsFetching, setTagsFetching] = useState(true)
    const handleClick = (page) => {
        news.page = page
        // при каждом клике добавляем в историю браузера новый элемент
        const params = {}
        if (news.category) params.category = news.category
        if (news.tag) params.tag = news.tag
        if (news.page > 1) params.page = news.page
        navigate({
            pathname: '/',
            search: '?' + createSearchParams(params),
        })
    }


    useEffect(() => {
        fetchAllArticles(null, null, 1, 100)
            .then(
                data => {
                    news.articles = data.rows
                    setArticles(data.rows)
                }
            )
            .finally(
                () => setFetching(false)
            )
    }, [1, 1])
    // articles.map(item => console.log(item.name))




    let items = []

    articles.map(item => items.push(item.createdAt))

    function timestampToDate(ts) {
        var d = new Date();
        d.setTime(ts);
        return ("" + (new Date(ts)).toISOString())
            .replace(/^([^T]+)T(.+)$/, '$1')
            .replace(/^(\d+)-(\d+)-(\d+)$/, '$3.$2.$1')
    }

    // console.log(items)
    let filteredItems1 = articles.filter(item => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase())
    })


    let filteredItems2 = articles.filter(item => {
        return item.description.toLowerCase().includes(searchValue.toLowerCase())
    })

    let filteredItems3 = articles.filter(item => {
        return timestampToDate(item.createdAt).includes(searchValue)
    })
    let filteredItemsR = [...filteredItems1, ...filteredItems2]
    let filteredItems = [...new Set(filteredItemsR)]


    // console.log(filteredItems)
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

        // eslint-disable-next-line
    }, [news.category, news.tag, news.page])


    return (
        <>            <section class="page-title-area">
            <div class="container">
                <div class="row align-items-center justify-content-between">
                    <div class="col-lg-8">
                        <h1 class="page-title">События, Новости, Комментарии</h1>
                    </div>
                    <div class="col-auto">
                        <ul class="page-breadcrumb">
                            <li><a href="/">Главная</a></li>
                            <li><a href="/searchpage">Поиск</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </section>
            <section class="blog-area section-gap-extra-bottom primary-soft-bg">
                <div class="container">
                    <div class="row">
                        <div className="blog-sidebar search">
                            <div class="widget search-widget">
                                <h4 class="widget-title">Поиск</h4>
                                <form action="#">
                                    <input
                                        type="text"
                                        placeholder="Введите слово"
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </form>

                            </div>
                        </div>
                        <div class="blog-post-loop">
                            <div>
                                {
                                    filteredItems.length ? (
                                        filteredItems.map(item =>
                                            <ArticleItem key={item.id} data={item} />
                                        )
                                    ) : (
                                        <p className="m-3">Ничего не найдено</p>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                    </div></div></section>

        </>
    )
})

export default SearchPage


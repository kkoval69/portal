import { Row, Pagination, Button } from 'react-bootstrap'
import ArticleItem from './ArticleItem.js'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from './AppContext.js'
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


const ArticleList = observer(() => {
    const { news } = useContext(AppContext)
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState("")
    const [articles, setArticles] = useState([]) // список загруженных новостей
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

    // articles.map(item => console.log(item.name))


    const pages = []
    for (let page = 1; page <= news.pages; page++) {
        pages.push(
            <Pagination.Item
                key={page}
                active={page === news.page}
                activeLabel=""
                onClick={() => handleClick(page)}
            >
                {page}
            </Pagination.Item>
        )
    }

    // console.log(items)




    return (
        <>
            {
                news.articles.length ? (
                    news.articles.map(item =>
                        <ArticleItem key={item.id} data={item} />
                    )
                ) : (
                    <p className="m-3">По вашему запросу ничего не найдено</p>
                )
            }

            {news.pages > 1 && <Pagination>{pages}</Pagination>}


        </>
    )
})

export default ArticleList


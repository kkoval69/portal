import { ListGroup } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from './AppContext.js'
import { observer } from 'mobx-react-lite'
import { useNavigate, createSearchParams } from 'react-router-dom'

const CategoryBar = observer(() => {
    const { news } = useContext(AppContext)
    const navigate = useNavigate()

    const handleClick = (id) => {
        if (id === news.category) {
            news.category = null
        } else {
            news.category = id
        }
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

    return (
        <ListGroup className='category_bar'>
            {news.categories.map(item =>
                <ListGroup.Item
                    className='category_bar_item'
                    key={item.id}
                    active={item.id === news.category}
                    onClick={() => handleClick(item.id)}
                    style={{ cursor: 'pointer' }}
                >
                    {item.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default CategoryBar
import { ListGroup } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from './AppContext.js'
import { observer } from 'mobx-react-lite'
import { useNavigate, createSearchParams } from 'react-router-dom'

const TagBar = observer(() => {
    const { news } = useContext(AppContext)
    const navigate = useNavigate()

    const handleClick = (id) => {
        if (id === news.tag) {
            news.tag = null
        } else {
            news.tag = id
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
        <ListGroup className='tag_bar' >
            {news.tags.map(item =>
                <ListGroup.Item className='tag_bar_item'
                    key={item.id}
                    active={item.id === news.tag}
                    onClick={() => handleClick(item.id)}
                    style={{ cursor: 'pointer' }}
                >
                    {item.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default TagBar
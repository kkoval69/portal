import { useContext, useState } from 'react'
import { AppContext } from './AppContext.js'
import { increment, decrement, remove } from '../http/favoriteAPI.js'
import { Table, Spinner, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import FavoriteItem from './FavoriteItem.js'
import { observer } from 'mobx-react-lite'

const FavoriteList = observer(() => {
    const { favorite } = useContext(AppContext)
    const [fetching, setFetching] = useState(false)

    const navigate = useNavigate()

    const handleIncrement = (id) => {
        setFetching(true)
        increment(id)
            .then(
                data => favorite.articles = data.articles
            )
            .finally(
                () => setFetching(false)
            )
    }

    const handleDecrement = (id) => {
        setFetching(true)
        decrement(id)
            .then(
                data => favorite.articles = data.articles
            )
            .finally(
                () => setFetching(false)
            )
    }

    const handleRemove = (id) => {
        setFetching(true)
        remove(id)
            .then(
                data => favorite.articles = data.articles
            )
            .finally(
                () => setFetching(false)
            )
    }

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <>
            {favorite.count ? (
                <>
                    <Table bordered hover size="sm" className="mt-3">
                        <thead class="thead-dark">
                            <tr>
                                <th>Наименование</th>
                                <th>Описание</th>
                                <th>Удалить</th>
                            </tr>
                        </thead>
                        <tbody>
                            {favorite.articles.map(item =>
                                <FavoriteItem
                                    key={item.id}
                                    increment={handleIncrement}
                                    decrement={handleDecrement}
                                    remove={handleRemove}
                                    {...item}
                                />
                            )}
                        </tbody>
                    </Table>
                </>
            ) : (
                <h3>Ничего нет(</h3>
            )}
        </>
    )
})

export default FavoriteList
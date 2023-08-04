import { useState, useEffect } from 'react'
import { userGetOne as getOneCommentary } from '../http/commentaryAPI.js'
import { Container, Spinner } from 'react-bootstrap'
import Commentary from '../components/Commentary.js'
import { useParams } from 'react-router-dom'

const UserCommentary = () => {
    const { id } = useParams()
    const [commentary, setCommentary] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getOneCommentary(id)
            .then(
                data => setCommentary(data)
            )
            .catch(
                error => setError(error.response.data.message)
            )
            .finally(
                () => setFetching(false)
            )
    }, [id])

    if (fetching) {
        return <Spinner animation="border" />
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <Container>
            <h1>комментарий № {commentary.id}</h1>
            <Commentary data={commentary} admin={false} />
        </Container>
    )
}

export default UserCommentary
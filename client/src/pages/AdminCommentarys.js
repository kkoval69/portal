import { useState, useEffect } from 'react'
import { adminGetAll as getAllCommentarys } from '../http/commentaryAPI.js'
import { Button, Container, Spinner } from 'react-bootstrap'
import Commentarys from '../components/Commentarys.js'
import CreateCommentary from '../components/CreateCommentary.js'

const AdminCommentarys = () => {
    const [commentarys, setCommentarys] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [show, setShow] = useState(false)

    useEffect(() => {
        getAllCommentarys()
            .then(
                data => setCommentarys(data)
            )
            .finally(
                () => setFetching(false)
            )
    }, [])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <h1>Все комментарийы</h1>
            <Button onClick={() => setShow(true)}>Создать комментарий</Button>
            <CreateCommentary show={show} setShow={setShow} />
            <Commentarys items={commentarys} admin={true} />
        </Container>
    )
}

export default AdminCommentarys
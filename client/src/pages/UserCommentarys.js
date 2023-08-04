import { useState, useEffect } from 'react'
import { userGetAll as getAllCommentarys } from '../http/commentaryAPI.js'
import { Container, Spinner } from 'react-bootstrap'
import Commentarys from '../components/Commentarys.js'

const UserCommentarys = (arId) => {
    const [commentarys, setCommentarys] = useState(null)
    const [fetching, setFetching] = useState(true)

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
        <>
            <Commentarys items={commentarys} admin={false} arId={arId.arId} />
        </>
    )
}

export default UserCommentarys
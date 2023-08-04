import { useState, useEffect } from 'react'
import { fetchTags, deleteTag } from '../http/newsAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import EditTag from '../components/EditTag.js'

const AdminTags = () => {
    const [tags, setTags] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [show, setShow] = useState(false)
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id тега, который будем редактировать — для передачи в <EditTag id={…} />
    const [tagId, setTagId] = useState(0)

    const handleCreateClick = () => {
        setTagId(0)
        setShow(true)
    }

    const handleUpdateClick = (id) => {
        setTagId(id)
        setShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteTag(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Тег «${data.name}» удален`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchTags()
            .then(
                data => setTags(data)
            )
            .finally(
                () => setFetching(false)
            )
    }, [change])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <>
            <section class="page-title-area">
                <div class="container">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-lg-8">
                            <h1 class="page-title">Теги</h1>
                        </div>
                        <div class="col-auto">
                            <ul class="page-breadcrumb">
                                <li><a href="/">Главная</a></li>
                                <li><a href="/admin">Панель управления</a></li>
                                <li><a href="">Теги</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <Container className='categories_block'>
                <Button onClick={() => handleCreateClick()}>Создать тег</Button>
                <EditTag id={tagId} show={show} setShow={setShow} setChange={setChange} />
                {tags.length > 0 ? (
                    <Table borderless hover size="sm" className="mt-3">
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tags.map(item =>
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>
                                        <Button variant="success" size="sm" onClick={() => handleUpdateClick(item.id)}>
                                            Редактировать
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
                                            Удалить
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                ) : (
                    <p>Список тегов пустой</p>
                )}
            </Container>
        </>

    )
}

export default AdminTags
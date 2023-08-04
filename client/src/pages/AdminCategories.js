import { useState, useEffect } from 'react'
import { fetchCategories, deleteCategory } from '../http/newsAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import EditCategory from '../components/EditCategory.js'

const AdminCategories = () => {
    const [categories, setCategories] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [show, setShow] = useState(false)
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id категории, которую будем редактировать — для передачи в <EditCategory id={…} />
    const [categoryId, setCategoryId] = useState(null)

    const handleCreateClick = () => {
        setCategoryId(0)
        setShow(true)
    }

    const handleUpdateClick = (id) => {
        setCategoryId(id)
        setShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteCategory(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Категория «${data.name}» удалена`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchCategories()
            .then(
                data => setCategories(data)
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
                            <h1 class="page-title">Категории</h1>
                        </div>
                        <div class="col-auto">
                            <ul class="page-breadcrumb">
                                <li><a href="/">Главная</a></li>
                                <li><a href="/admin">Панель управления</a></li>
                                <li><a href="">Категории</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <Container className='categories_block'>
                <Button onClick={() => handleCreateClick()}>Создать категорию</Button>
                <EditCategory id={categoryId} show={show} setShow={setShow} setChange={setChange} />
                {categories.length > 0 ? (
                    <Table borderless hover size="sm" className="mt-3">
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(item =>
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
                    <p>Список категорий пустой</p>
                )}
            </Container>
        </>

    )
}

export default AdminCategories
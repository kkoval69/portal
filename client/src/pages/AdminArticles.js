import { useState, useEffect } from 'react'
import { fetchAllArticles, deleteArticle } from '../http/newsAPI.js'
import { Button, Container, Spinner, Table, Pagination } from 'react-bootstrap'
import CreateArticle from '../components/CreateArticle.js'
import UpdateArticle from '../components/UpdateArticle.js'

// количество новостей на страницу
const ADMIN_PER_PAGE = 6

const AdminArticles = () => {
    const [articles, setArticles] = useState([])
    const [fetching, setFetching] = useState(true)
    const [createShow, setCreateShow] = useState(false)
    const [updateShow, setUpdateShow] = useState(false)
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id новости, который будем редактировать — для передачи в <UpdateArticle id={…} />
    const [article, setArticle] = useState(null)

    // текущая страница списка новостей
    const [currentPage, setCurrentPage] = useState(1)
    // сколько всего страниц списка новостей
    const [totalPages, setTotalPages] = useState(1)

    // обработчик клика по номеру страницы
    const handlePageClick = (page) => {
        setCurrentPage(page)
        setFetching(true)
    }

    // содержимое компонента <Pagination>
    const pages = []
    for (let page = 1; page <= totalPages; page++) {
        pages.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                activeLabel=""
                onClick={() => handlePageClick(page)}
            >
                {page}
            </Pagination.Item>
        )
    }

    const handleUpdateClick = (id) => {
        setArticle(id)
        setUpdateShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteArticle(id)
            .then(
                data => {
                    // если это последняя страница и мы удаляем на ней единственная
                    // оставшееся новость  — то надо перейти к предыдущей странице
                    if (totalPages > 1 && articles.length === 1 && currentPage === totalPages) {
                        setCurrentPage(currentPage - 1)
                    } else {
                        setChange(!change)
                    }
                    alert(`Новость «${data.name}» удалена`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchAllArticles(null, null, currentPage, ADMIN_PER_PAGE)
            .then(
                data => {
                    setArticles(data.rows)
                    setTotalPages(Math.ceil(data.count / ADMIN_PER_PAGE))
                }
            )
            .finally(
                () => setFetching(false)
            )
    }, [change, currentPage])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <>
            <section class="page-title-area">
                <div class="container">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-lg-8">
                            <h1 class="page-title">Новости</h1>
                        </div>
                        <div class="col-auto">
                            <ul class="page-breadcrumb">
                                <li><a href="/">Главная</a></li>
                                <li><a href="/admin">Панель управления</a></li>
                                <li><a href="">Новости</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <Container className='categories_block admin_news_block' >
                <Button onClick={() => setCreateShow(true)}>Создать новость</Button>
                <CreateArticle show={createShow} setShow={setCreateShow} setChange={setChange} />
                <UpdateArticle id={article} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
                {articles.length > 0 ? (
                    <>
                        <Table borderless hover size="sm" className="mt-3">
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Фото</th>
                                    <th>Категория</th>
                                    <th>Тег</th>
                                    <th>Описание</th>
                                    <th>Ссылка</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map(item =>
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>
                                            {item.image &&
                                                <a href={process.env.REACT_APP_IMG_URL + item.image} target="_blank">фото</a>}
                                        </td>
                                        <td>{item.category?.name || 'NULL'}</td>
                                        <td>{item.tag?.name || 'NULL'}</td>
                                        <td>{item.description}</td>
                                        <td>{item.link}</td>
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
                        {totalPages > 1 && <Pagination>{pages}</Pagination>}
                    </>
                ) : (
                    <p>Список новостей пустой</p>
                )}
            </Container>
        </>

    )
}

export default AdminArticles
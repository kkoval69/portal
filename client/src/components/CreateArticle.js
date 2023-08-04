import { Modal, Button, Form, Row, Col, Fade } from 'react-bootstrap'
import { createArticle, fetchCategories, fetchTags } from '../http/newsAPI.js'
import { useState, useEffect } from 'react'

const defaultValue = { name: '', description: '', category: '', tag: '', link: '' }
const defaultValid = { name: null, description: null, category: null, tag: null, link: null }
const isValid = (value) => {
    const result = {}
    const pattern = /^[1-9][0-9]*$/
    for (let key in value) {
        if (key === 'name') result.name = value.name.trim() !== ''
        if (key === 'description') result.description = value.description.trim()
        if (key === 'category') result.category = pattern.test(value.category)
        if (key === 'tag') result.tag = pattern.test(value.tag)
    }
    return result
}

const CreateArticle = (props) => {
    const { show, setShow, setChange } = props

    const [value, setValue] = useState(defaultValue)
    const [valid, setValid] = useState(defaultValid)

    // выбранное для загрузки изображение новости
    const [image, setImage] = useState(null)
    // список категорий и список тегов для возможности выбора
    const [categories, setCategories] = useState(null)
    const [tags, setTags] = useState(null)

    // нужно получить с сервера список категорий и список тегов
    useEffect(() => {
        fetchCategories()
            .then(
                data => setCategories(data)
            )
        fetchTags()
            .then(
                data => setTags(data)
            )
    }, [])

    const handleInputChange = (event) => {
        const data = { ...value, [event.target.name]: event.target.value }
        setValue(data)
        setValid(isValid(data))
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const correct = isValid(value)
        setValid(correct)

        // все поля формы прошли проверку, можно отправлять данные на сервер
        if (correct.name && correct.description && correct.category && correct.tag) {

            const data = new FormData()
            data.append('name', value.name.trim())
            data.append('description', value.description.trim())
            data.append('categoryId', value.category)
            data.append('tagId', value.tag)
            data.append('link', value.link)
            if (image) data.append('image', image, image.name)

            createArticle(data)
                .then(
                    data => {
                        // приводим форму в изначальное состояние
                        event.target.image.value = ''
                        setValue(defaultValue)
                        setValid(defaultValid)
                        setShow(false)
                        // изменяем состояние, чтобы обновить список новостей
                        setChange(state => !state)
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Новая новость</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        name="name"
                        value={value.name}
                        onChange={e => handleInputChange(e)}
                        isValid={valid.name === true}
                        isInvalid={valid.name === false}
                        placeholder="Название новости..."
                        className="mb-3"
                    />
                    <Row className="mb-3">
                        <Col>
                            <Form.Select
                                name="category"
                                value={value.category}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.category === true}
                                isInvalid={valid.category === false}
                            >
                                <option value="">Категория</option>
                                {categories && categories.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select
                                name="tag"
                                value={value.tag}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.tag === true}
                                isInvalid={valid.tag === false}
                            >
                                <option value="">Тег</option>
                                {tags && tags.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Control
                                name="image"
                                type="file"
                                onChange={e => handleImageChange(e)}
                                placeholder="Фото новости..."
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                name="link"
                                value={value.link}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.link === true}
                                isInvalid={valid.link === false}
                                placeholder="Ссылка на сайт..."
                                className="mb-3"
                            />
                        </Col>
                    </Row>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={value.description}
                        onChange={e => handleInputChange(e)}
                        rows={5}
                        placeholder="Описание новости..."
                    />
                    <Row className="mt-3">
                        <Col>
                            <Button type="submit">Сохранить</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal >
    )
}

export default CreateArticle
import { Container, Row, Col, Button, Image, Spinner, Table, Form } from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react'
import { fetchOneArticle, fetchProdComment } from '../http/newsAPI.js'
import { useParams } from 'react-router-dom'
import { append } from '../http/favoriteAPI.js'
import { AppContext } from '../components/AppContext.js'
import { fetchFavorite } from '../http/favoriteAPI.js'
import { check as checkAuth } from '../http/userAPI.js'
import { Navigate } from 'react-router-dom'
import { userCreate } from '../http/commentaryAPI.js'
import { userGetAll as getAllCommentarys } from '../http/commentaryAPI.js'
import Commentarys from '../components/Commentarys.js'
import UserCommentarys from './UserCommentarys.js'
const isValid = (input) => {
    let pattern
    switch (input.name) {
        case 'name':
            pattern = /^[-а-я]{2,}( [-а-я]{2,}){1,2}$/i
            return pattern.test(input.value.trim())
    }
}
const Article = () => {
    const { id } = useParams()

    const [article, setArticle] = useState(null)
    const { user, favorite } = useContext(AppContext)
    const [fetching, setFetching] = useState(true)
    const [commentary, setCommentary] = useState(null)
    const [value, setValue] = useState({ name: '' })
    const [valid, setValid] = useState({ name: null })

    useEffect(() => {
        fetchOneArticle(id).then(data => setArticle(data))
        // fetchProdComment(id).then(data => setComment(data))
    }, [id])
    useEffect(() => {
        setFetching(false)
        checkAuth()
            .then(data => {
                if (data) {
                    user.login(data)
                }
            })
            .catch(
                error => user.logout()
            )
    }, [])


    if (fetching) {
        return <Spinner animation="border" />
    }
    const handleChange1 = (event) => {
        setValue({ ...value, [event.target.name]: event.target.value })

        setValid({ ...valid, [event.target.name]: isValid(event.target) })
    }

    const handleSubmit1 = (event, articleId) => {
        event.preventDefault()

        setValue({
            name: event.target.name.value.trim(),
        })

        setValid({
            name: isValid(event.target.name),
        })
        // форма заполнена правильно, можно отправлять данные


        const body = { ...value }
        const create = userCreate
        create(body)
            .then(
                data => {
                    // console.log(data)
                    //data.id_ar = article.id

                    console.log(data)
                    setCommentary(data)
                    favorite.articles = []
                }
            )
        window.location.reload()
    }

    const handleClick = (articleId) => {
        alert("Добавлено")
        append(articleId).then(data => {
            favorite.articles = data.articles
        })
    }

    if (!article) {
        return <Spinner animation="border" />
    }
    function timestampToDate(ts) {
        var d = new Date();
        d.setTime(ts);
        return ("" + (new Date(ts)).toISOString())
            .replace(/^([^T]+)T(.+)$/, '$1')
            .replace(/^(\d+)-(\d+)-(\d+)$/, '$3.$2.$1')
    }
    const date = timestampToDate(article.createdAt)
    return (
        <>
            <section class="page-title-area">
                <div class="container">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-lg-8">
                            <h1 class="page-title">{article.name}</h1>
                        </div>
                        <div class="col-auto">
                            <ul class="page-breadcrumb">
                                <li><a href="/">Главная</a></li>
                                <li>{article.name}</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </section>
            <section class="blog-area section-gap-extra-bottom primary-soft-bg">
                <div class="container">
                    <div class="row">

                        <div class="blog-post-details">
                            <div class="post-thumbnail">
                                {article.image ? (
                                    <img src={process.env.REACT_APP_IMG_URL + article.image} alt="Картинка" style={{ width: "100%" }} />
                                ) : (
                                    <></>
                                )}

                            </div>
                            <div class="post-content">
                                <ul class="post-meta">
                                    <li>
                                        <a href="#"><i class="far fa-user-circle"></i>{article.category.name}</a>
                                    </li>
                                    <li>
                                        <a href="#"><i class="far fa-calendar-alt"></i>{date}</a>
                                    </li>
                                </ul>
                                <h3 class="title">
                                    {article.name}
                                </h3>
                                <p>
                                    {article.description}
                                </p>

                                <div class="post-footer mt-40">

                                    <div class="row justify-content-between">
                                        {user.isAuth ? (
                                            <button class="main-btn" onClick={() => handleClick(article.id)}>Добавить в избранное</button>
                                        ) : (<button class="main-btn btn_disabled" >Добавить в избранное</button>)}
                                        <div class="col-auto">


                                            <div className="mt-4 related-tags">
                                                <span>Тег</span>
                                                <a href="#">{article.tag.name}</a>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="comments-template">
                                        {user.isAuth ? (
                                            <>
                                                <h4 class="template-title">Коментарии</h4>

                                                <UserCommentarys key={article.id} arId={article.id} />
                                                <div class="comment-form">
                                                    <h4 class="template-title">Отправить комментарий</h4>
                                                    <form noValidate onSubmit={handleSubmit1}>
                                                        <div class="row">
                                                            <div class="col-12">
                                                                <div class="input-field mb-30">
                                                                    <textarea
                                                                        placeholder="Напишите сообщение"
                                                                        name="name"
                                                                        value={value.name}
                                                                        onChange={e => handleChange1(e)}
                                                                    ></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="col-12">
                                                                <div class="input-field">
                                                                    <button class="main-btn" type="submit">Отправить комментарий <i class="far fa-arrow-right"></i></button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </form>

                                                </div></>
                                        ) : (
                                            <h4 class="template-title"><a href="/login">Просмотр комментариев, добавление в избранное доступны после авторизации</a></h4>

                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>

        </>

    )
}

export default Article
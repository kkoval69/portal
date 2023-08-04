import { makeAutoObservable } from 'mobx'

class NewsPortal {
    _categories = []
    _tags = []
    _articles = []
    _category = null // выбранная категория
    _tag = null // выбранный тег
    _page = 1 // текущая страница
    _count = 0 // сколько всего новостей
    _limit = 5 // новостей на страницу

    constructor() {
        makeAutoObservable(this)
    }

    get categories() {
        return this._categories
    }

    get tags() {
        return this._tags
    }

    get articles() {
        return this._articles
    }

    get category() {
        return this._category
    }

    get tag() {
        return this._tag
    }

    get page() {
        return this._page
    }

    get count() {
        return this._count
    }

    get limit() {
        return this._limit
    }

    get pages() { // всего страниц
        return Math.ceil(this.count / this.limit)
    }

    set categories(categories) {
        this._categories = categories
    }

    set tags(tags) {
        this._tags = tags
    }

    set articles(articles) {
        this._articles = articles
    }

    set category(id) {
        this.page = 1
        this._category = id
    }

    set tag(id) {
        this.page = 1
        this._tag = id
    }

    set page(page) {
        this._page = page
    }

    set count(count) {
        this._count = count
    }

    set limit(limit) {
        this._limit = limit
    }
}

export default NewsPortal
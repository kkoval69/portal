import { makeAutoObservable } from 'mobx'

class FavoritePortal {
    _articles = []

    constructor() {
        makeAutoObservable(this)
    }

    get articles() {
        return this._articles
    }

    get count() { // всего позиций в избр
        return this._articles.length
    }


    set articles(articles) {
        this._articles = articles
    }
}

export default FavoritePortal
import { guestInstance, authInstance } from './index.js'

export const createCategory = async (category) => {
    const { data } = await authInstance.post('category/create', category)
    return data
}

export const updateCategory = async (id, category) => {
    const { data } = await authInstance.put(`category/update/${id}`, category)
    return data
}

export const deleteCategory = async (id) => {
    const { data } = await authInstance.delete(`category/delete/${id}`)
    return data
}

export const fetchCategories = async () => {
    const { data } = await guestInstance.get('category/getall')
    return data
}

export const fetchCategory = async (id) => {
    const { data } = await guestInstance.get(`category/getone/${id}`)
    return data
}

export const createTag = async (tag) => {
    const { data } = await authInstance.post('tag/create', tag)
    return data
}

export const updateTag = async (id, tag) => {
    const { data } = await authInstance.put(`tag/update/${id}`, tag)
    return data
}

export const deleteTag = async (id) => {
    const { data } = await authInstance.delete(`tag/delete/${id}`)
    return data
}

export const fetchTags = async () => {
    const { data } = await guestInstance.get('tag/getall')
    return data
}

export const fetchTag = async (id) => {
    const { data } = await guestInstance.get(`tag/getone/${id}`)
    return data
}

/*
 * Создание, обновление и удаление новости, получение списка всех новостей
 */
export const createArticle = async (article) => {
    const { data } = await authInstance.post('article/create', article)
    return data
}

export const updateArticle = async (id, article) => {
    const { data } = await authInstance.put(`article/update/${id}`, article)
    return data
}

export const deleteArticle = async (id) => {
    const { data } = await authInstance.delete(`article/delete/${id}`)
    return data
}

export const fetchAllArticles = async (categoryId = null, tagId = null, page = 1, limit = 3) => {
    let url = 'article/getall'
    // фильтрация новостей по категории и/или тегу
    if (categoryId) url = url + '/categoryId/' + categoryId
    if (tagId) url = url + '/tagId/' + tagId
    const { data } = await guestInstance.get(
        url,
        {
            params: { // GET-параметры для постраничной навигации
                page, limit
            }
        })
    return data
}

export const fetchOneArticle = async (id) => {
    const { data } = await guestInstance.get(`article/getone/${id}`)
    return data
}

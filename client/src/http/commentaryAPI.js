import { guestInstance, authInstance } from './index.js'



// создать новый комментарий
export const adminCreate = async (body) => {
    const { data } = await authInstance.post('commentary/admin/create', body)
    return data
}
// получить список всех комментариев 
export const adminGetAll = async () => {
    const { data } = await authInstance.get('commentary/admin/getall')
    return data
}
// получить список комментариев пользователя
export const adminGet = async (id) => {
    const { data } = await authInstance.get(`commentary/admin/getall/user/${id}`)
    return data
}
// получить комментарий по id
export const adminGetOne = async (id) => {
    const { data } = await authInstance.get(`commentary/admin/getone/${id}`)
    return data
}
// удалить комментарий по id
export const adminDelete = async (id) => {
    const { data } = await authInstance.delete(`commentary/admin/delete/${id}`)
    return data
}

/*
 * для авторизованного пользователя
 */

// создать новый комментарий
export const userCreate = async (body) => {
    const { data } = await authInstance.post('commentary/user/create', body)
    return data
}
// получить список всех комментариев пользователя
export const userGetAll = async () => {
    const { data } = await authInstance.get('commentary/user/getall')
    return data
}
// получить один комментарий пользователя
export const userGetOne = async (id) => {
    const { data } = await authInstance.get(`commentary/user/getone/${id}`)
    return data
}

/*
 * для неавторизованного пользователя
 */

// создать новый комментарий
export const guestCreate = async (body) => {
    const { data } = await guestInstance.post('commentary/guest/create', body)
    return data
}

import { guestInstance } from './index.js'

export const fetchFavorite = async () => {
    const { data } = await guestInstance.get('favorite/getone')
    return data
}

export const append = async (id) => {
    const { data } = await guestInstance.put(`favorite/article/${id}/append/1`)
    return data
}

export const increment = async (id) => {
    const { data } = await guestInstance.put(`favorite/article/${id}/increment/1`)
    return data
}

export const decrement = async (id) => {
    const { data } = await guestInstance.put(`favorite/article/${id}/decrement/1`)
    return data
}

export const remove = async (id) => {
    const { data } = await guestInstance.put(`favorite/article/${id}/remove`)
    return data
}

export const clear = async () => {
    const { data } = await guestInstance.put(`favorite/clear`)
    return data
}
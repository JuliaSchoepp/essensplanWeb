import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertGericht = payload => api.post(`/gericht`, payload)
export const getAllGerichte = () => api.get(`/gerichte`)
export const updateGerichtById = (id, payload) => api.put(`/gericht/${id}`, payload)
export const deleteGerichtById = id => api.delete(`/gericht/${id}`)
export const getGerichtById = id => api.get(`/gericht/${id}`)

const apis = {
    insertGericht,
    getAllGerichte,
    updateGerichtById,
    deleteGerichtById,
    getGerichtById,
}

export default apis
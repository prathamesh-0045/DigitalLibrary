import api from '../api/axios'
export const sendMessage = (contact) => api.post('/contact', contact)

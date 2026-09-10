import api from '../api/axios'
export const getLoans = () => api.get('/loans/all')
export const issueBook = (userId, bookId) => api.post('/loans/issue', null, { params: { userId, bookId } })
export const returnBook = (id) => api.put(`/loans/${id}/return`)

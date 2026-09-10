import api from '../api/axios'
export const getBookings = () => api.get('/bookings')
export const reserveBook = (userId, bookId) => api.post('/bookings/reserve', null, { params: { userId, bookId } })

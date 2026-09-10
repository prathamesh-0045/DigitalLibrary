import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import api from './api/axios'
import { NavButton } from './components/common'
import Discover from './pages/Discover'
import Shelf from './pages/Shelf'
import Admin from './pages/Admin'
import Contact from './pages/Contact'
import AuthModal from './pages/AuthModal'
import BookModal from './pages/BookModal'
import './styles.css'

const EMPTY_BOOK = { title: '', author: '', isbn: '', category: 'Technology', quantity: 1 }
const DEMO_ADMIN = { email: 'admin@libris.com', password: 'Admin@123' }

function App() {
  const [books, setBooks] = useState([])
  const [loans, setLoans] = useState([])
  const [bookings, setBookings] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('librisUser') || 'null') } catch { return null }
  })
  const [page, setPage] = useState('discover')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' })
  const [bookModal, setBookModal] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [bookForm, setBookForm] = useState(EMPTY_BOOK)
  const [contact, setContact] = useState({ name: '', email: '', message: '' })
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const notify = (message, type = 'success') => {
    setToast({ message, type })
    window.clearTimeout(window.__librisToast)
    window.__librisToast = window.setTimeout(() => setToast(null), 3200)
  }

  const loadBooks = async () => {
    try { setBooks((await api.get('/books')).data) }
    catch { notify('Start the Spring Boot backend on port 8080.', 'error') }
  }
  const loadData = async () => {
    if (!currentUser) { setLoans([]); setBookings([]); return }
    try {
      const [l, b] = await Promise.all([api.get('/loans/all'), api.get('/bookings')])
      setLoans(l.data); setBookings(b.data)
    } catch { /* backend may be starting */ }
  }
  const loadAdmin = async () => {
    if (currentUser?.role !== 'ADMIN') return
    try { setUsers((await api.get('/users')).data) } catch { notify('Could not load members.', 'error') }
  }

  useEffect(() => { loadBooks() }, [])
  useEffect(() => { loadData(); loadAdmin() }, [currentUser])

  const categories = useMemo(() => [...new Set(books.map(b => b.category).filter(Boolean))].sort(), [books])
  const filteredBooks = useMemo(() => books.filter(b => {
    const text = `${b.title} ${b.author} ${b.isbn}`.toLowerCase()
    return (!query || text.includes(query.toLowerCase())) && (!category || b.category === category)
  }), [books, query, category])

  const activeLoans = loans.filter(l => !l.returnDate)
  const myLoans = currentUser ? activeLoans.filter(l => l.user?.id === currentUser.id) : []
  const myBookings = currentUser ? bookings.filter(b => b.user?.id === currentUser.id) : []
  const availableCopies = books.reduce((n, b) => n + (b.availableQuantity || 0), 0)
  const overdue = activeLoans.filter(l => l.dueDate && new Date(`${l.dueDate}T23:59:59`) < new Date()).length

  const openAuth = mode => { setAuthMode(mode); setAuthOpen(true); setMobileOpen(false) }
  const logout = () => {
    localStorage.removeItem('librisUser'); setCurrentUser(null); setPage('discover'); notify('You have been signed out.');
  }
  const loginAsDemoAdmin = () => { setAuthForm({ name: '', ...DEMO_ADMIN }); setAuthMode('login'); setAuthOpen(true) }

  const submitAuth = async e => {
    e.preventDefault(); setLoading(true)
    try {
      const endpoint = authMode === 'login' ? '/auth/login' : '/auth/register'
      const payload = authMode === 'login' ? { email: authForm.email, password: authForm.password } : authForm
      const { data } = await api.post(endpoint, payload)
      localStorage.setItem('librisUser', JSON.stringify(data)); setCurrentUser(data); setAuthOpen(false)
      setAuthForm({ name: '', email: '', password: '' }); notify(`Welcome, ${data.name.split(' ')[0]}!`)
    } catch (err) { notify(err.response?.data?.message || 'Authentication failed. Check your details.', 'error') }
    finally { setLoading(false) }
  }

  const refresh = async () => { await loadBooks(); await loadData(); await loadAdmin() }
  const requireLogin = action => { if (!currentUser) { openAuth('login'); notify(`Sign in to ${action}.`, 'error'); return false } return true }

  const issueBook = async book => {
    if (!requireLogin('borrow a book')) return
    try { await api.post('/loans/issue', null, { params: { userId: currentUser.id, bookId: book.id } }); notify(`“${book.title}” is now on your shelf.`); await refresh() }
    catch (err) { notify(err.response?.data?.message || err.response?.data || 'This book cannot be borrowed.', 'error') }
  }
  const reserveBook = async book => {
    if (!requireLogin('reserve a book')) return
    try { await api.post('/bookings/reserve', null, { params: { userId: currentUser.id, bookId: book.id } }); notify(`Reservation placed for “${book.title}”.`); await refresh() }
    catch (err) { notify(err.response?.data?.message || err.response?.data || 'This book cannot be reserved.', 'error') }
  }
  const returnBook = async id => {
    try { await api.put(`/loans/${id}/return`); notify('Book returned. Any overdue fine was calculated automatically.'); await refresh() }
    catch (err) { notify(err.response?.data?.message || 'Could not return the book.', 'error') }
  }

  const openAddBook = () => { setEditingBook(null); setBookForm(EMPTY_BOOK); setBookModal(true) }
  const openEditBook = book => { setEditingBook(book); setBookForm({ title: book.title, author: book.author, isbn: book.isbn, category: book.category || 'Other', quantity: book.quantity }); setBookModal(true) }
  const saveBook = async e => {
    e.preventDefault(); setLoading(true)
    try {
      const payload = { ...bookForm, quantity: Number(bookForm.quantity) }
      if (editingBook) await api.put(`/books/${editingBook.id}`, payload)
      else await api.post('/books', payload)
      setBookModal(false); notify(editingBook ? 'Book updated successfully.' : 'Book added to the collection.'); await refresh()
    } catch (err) { notify(err.response?.data?.message || 'Could not save the book.', 'error') }
    finally { setLoading(false) }
  }
  const deleteBook = async id => {
    if (!window.confirm('Remove this book from the catalogue?')) return
    try { await api.delete(`/books/${id}`); notify('Book removed from the catalogue.'); await refresh() }
    catch (err) { notify(err.response?.data?.message || 'Could not delete the book.', 'error') }
  }
  const sendContact = async e => {
    e.preventDefault(); setLoading(true)
    try { await api.post('/contact', contact); setContact({ name: '', email: '', message: '' }); notify('Message sent. Our library team will reply soon.') }
    catch { notify('Could not send your message.', 'error') }
    finally { setLoading(false) }
  }

  return <div className="app">
    <header className="navbar">
      <button className="brand" onClick={() => { setPage('discover'); setMobileOpen(false) }}><span className="brand-mark">L</span><span>Libris</span></button>
      <button className="mobile-toggle" onClick={() => setMobileOpen(v => !v)} aria-label="Open navigation">☰</button>
      <nav className={mobileOpen ? 'nav open' : 'nav'}>
        <NavButton active={page === 'discover'} onClick={() => { setPage('discover'); setMobileOpen(false) }}>Discover</NavButton>
        {currentUser && <NavButton active={page === 'shelf'} onClick={() => { setPage('shelf'); setMobileOpen(false) }}>My Shelf</NavButton>}
        {currentUser?.role === 'ADMIN' && <NavButton active={page === 'admin'} onClick={() => { setPage('admin'); setMobileOpen(false) }}>Admin</NavButton>}
        <NavButton active={page === 'contact'} onClick={() => { setPage('contact'); setMobileOpen(false) }}>Contact</NavButton>
      </nav>
      <div className="nav-account">
        {currentUser ? <><div className="user-chip"><span>{currentUser.name?.charAt(0).toUpperCase()}</span><div><b>{currentUser.name}</b><small>{currentUser.role}</small></div></div><button className="text-btn" onClick={logout}>Log out</button></> : <button className="primary small" onClick={() => openAuth('login')}>Sign in</button>}
      </div>
    </header>

    {page === 'discover' && <Discover books={filteredBooks} categories={categories} query={query} setQuery={setQuery} category={category} setCategory={setCategory} availableCopies={availableCopies} booksCount={books.length} categoryCount={categories.length} borrowedCount={activeLoans.length} issueBook={issueBook} reserveBook={reserveBook} openAuth={openAuth} />}
    {page === 'shelf' && currentUser && <Shelf user={currentUser} loans={myLoans} bookings={myBookings} returnBook={returnBook} goDiscover={() => setPage('discover')} />}
    {page === 'admin' && currentUser?.role === 'ADMIN' && <Admin books={books} users={users} loans={loans} bookings={bookings} openAddBook={openAddBook} openEditBook={openEditBook} deleteBook={deleteBook} />}
    {page === 'contact' && <Contact contact={contact} setContact={setContact} sendContact={sendContact} loading={loading} />}

    <footer className="footer"><div className="footer-brand"><span className="brand-mark">L</span><b>Libris</b><span>Modern library management for curious minds.</span></div><span>© 2026 Libris</span></footer>

    {authOpen && <AuthModal mode={authMode} setMode={setAuthMode} form={authForm} setForm={setAuthForm} onClose={() => setAuthOpen(false)} onSubmit={submitAuth} loading={loading} demoAdmin={loginAsDemoAdmin} />}
    {bookModal && <BookModal form={bookForm} setForm={setBookForm} editing={editingBook} onClose={() => setBookModal(false)} onSubmit={saveBook} loading={loading} />}
    {toast && <div className={`toast ${toast.type}`}><span>{toast.type === 'error' ? '!' : '✓'}</span>{toast.message}</div>}
  </div>
}

createRoot(document.getElementById('root')).render(<App />)

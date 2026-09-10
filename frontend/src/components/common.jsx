import React from 'react'

const Icon = ({ children }) => <span className="icon" aria-hidden="true">{children}</span>

function NavButton({ active, children, onClick }) { return <button className={active ? 'nav-link active' : 'nav-link'} onClick={onClick}>{children}</button> }

function Stat({ number, label }) { return <div className="stat"><strong>{number}</strong><span>{label}</span></div> }

function BookCard({ book, onIssue, onReserve }) {
  const available = (book.availableQuantity || 0) > 0
  const coverClass = `cover c${(book.id || 1) % 6}`
  return <article className="book-card"><div className={coverClass}><span>Libris</span><b>{book.title}</b><small>{book.author}</small></div><div className="book-info"><div><span className="tag">{book.category || 'General'}</span><span className={available ? 'stock' : 'stock out'}>{available ? `${book.availableQuantity} available` : 'Currently unavailable'}</span></div><h3>{book.title}</h3><p>{book.author}</p><small className="isbn">ISBN {book.isbn}</small><button className={available ? 'primary full' : 'secondary full'} onClick={() => available ? onIssue(book) : onReserve(book)}>{available ? 'Borrow book' : 'Reserve title'} <span>→</span></button></div></article>
}

function LoanRow({ loan, onReturn }) { const overdue = loan.dueDate && new Date(`${loan.dueDate}T23:59:59`) < new Date(); return <div className="loan-row"><div className="mini-cover">{loan.book?.title?.charAt(0)}</div><div className="loan-main"><b>{loan.book?.title}</b><span>{loan.book?.author}</span><small className={overdue ? 'danger' : ''}>Due {loan.dueDate}{overdue ? ' · overdue' : ''}</small></div><button className="secondary" onClick={() => onReturn(loan.id)}>Return</button></div> }

function PanelHead({ title, meta }) { return <div className="panel-head"><h2>{title}</h2><span>{meta}</span></div> }

function EmptyPanel({ icon, title, text }) { return <div className="empty-panel"><span>{icon}</span><b>{title}</b><p>{text}</p></div> }

function Metric({ label, value }) { return <div className="metric"><span>{label}</span><strong>{value}</strong></div> }

export { Icon, NavButton, Stat, BookCard, LoanRow, PanelHead, EmptyPanel, Metric }

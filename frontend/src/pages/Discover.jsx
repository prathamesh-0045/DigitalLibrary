import React from 'react'
import { Icon, Stat, BookCard, LoanRow, PanelHead, EmptyPanel, Metric } from '../components/common'

function Discover({ books, categories, query, setQuery, category, setCategory, availableCopies, booksCount, categoryCount, borrowedCount, issueBook, reserveBook }) {
  return <main>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow">A BETTER WAY TO BORROW</span><h1>Stories worth<br /><i>making time for.</i></h1><p>Discover a beautifully organised collection, borrow in seconds, reserve unavailable titles, and keep every due date in view.</p><div className="hero-actions"><button className="primary" onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}>Explore collection <span>↗</span></button><span className="live"><b></b>{availableCopies} copies available</span></div></div>
      <div className="hero-visual"><div className="orb"></div><div className="shelf-art"><div className="art-book one"><small>01</small><b>ATOMIC<br />HABITS</b></div><div className="art-book two"><small>02</small><b>CLEAN<br />CODE</b></div><div className="art-book three"><small>03</small><b>THE<br />ALCHEMIST</b></div></div><div className="quote-card">“There is no friend as loyal as a book.”<small>— Ernest Hemingway</small></div></div>
    </section>
    <section className="stats"><Stat number={booksCount} label="Titles"/><Stat number={categoryCount} label="Genres"/><Stat number={availableCopies} label="Copies ready"/><Stat number={borrowedCount} label="On loan"/></section>
    <section className="collection" id="collection"><div className="section-title"><div><span className="eyebrow">LIBRARY COLLECTION</span><h2>Browse the shelves</h2></div><span className="muted">{books.length} results</span></div><div className="filters"><label className="search"><Icon>⌕</Icon><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by title, author or ISBN" /></label><select value={category} onChange={e => setCategory(e.target.value)}><option value="">All genres</option>{categories.map(c => <option key={c}>{c}</option>)}</select></div><div className="book-grid">{books.map(book => <BookCard key={book.id} book={book} onIssue={issueBook} onReserve={reserveBook} />)}</div>{books.length === 0 && <div className="empty"><span>⌕</span><h3>No books found</h3><p>Try another title, author, ISBN or genre.</p></div>}</section>
    <section className="feature"><div><span className="eyebrow light">READING, WITHOUT THE FRICTION</span><h2>Your shelf follows you.</h2><p>Borrow books in seconds, see due dates at a glance, reserve unavailable titles, and let Libris calculate overdue fines automatically.</p></div><div className="feature-number">14<small>days standard loan</small></div></section>
  </main>
}

export default Discover

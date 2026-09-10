import React from 'react'
import { Icon, Stat, BookCard, LoanRow, PanelHead, EmptyPanel, Metric } from '../components/common'

function Shelf({ user, loans, bookings, returnBook, goDiscover }) {
  const totalFine = loans.reduce((n, l) => n + (l.fine || 0), 0)
  return <main className="page"><div className="page-head"><div><span className="eyebrow">PERSONAL DASHBOARD</span><h1>Welcome back, {user.name.split(' ')[0]}.</h1><p>Keep your current reading, reservations and due dates in one place.</p></div><button className="primary" onClick={goDiscover}>Find a book ↗</button></div><div className="dashboard-grid"><section className="panel large"><PanelHead title="Currently reading" meta={`${loans.length} active`} />{loans.length ? <div className="loan-list">{loans.map(l => <LoanRow key={l.id} loan={l} onReturn={returnBook} />)}</div> : <EmptyPanel icon="◫" title="Your shelf is empty" text="Find a book in Discover and start reading." />}</section><section className="panel"><PanelHead title="Reservations" meta={bookings.length} />{bookings.length ? bookings.map(b => <div className="reservation" key={b.id}><span className="mini-cover">L</span><div><b>{b.book?.title}</b><small>{b.book?.author}</small></div></div>) : <EmptyPanel icon="○" title="No reservations" text="Unavailable titles you reserve will appear here." />}</section></div><div className="metric-grid"><Metric label="Active loans" value={loans.length}/><Metric label="Outstanding fine" value={`₹${totalFine.toFixed(2)}`}/><Metric label="Reservations" value={bookings.length}/></div></main>
}

export default Shelf

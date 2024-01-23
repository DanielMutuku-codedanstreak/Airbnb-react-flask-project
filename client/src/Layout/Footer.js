import React from 'react'

export default function Footer() {
  return (
    <footer className="py-3 my-4 bg-light">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted text-white">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted text-white">Features</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted text-white">Pricing</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted text-white">FAQs</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted text-white">About</a></li>
        </ul>
        <p className="text-center text-muted text-white">© 2022 Company, Inc</p>
    </footer>
  )
}

import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {

    const history = useHistory()

    const auth = useContext(AuthContext)

    const handlerLogout = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper cyan darken-3">
                <div className="container">
                    <span className="brand-logo">Авторизация</span>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/first">1 Page</NavLink></li>
                        <li><NavLink to="/second">2 Page</NavLink></li>
                        <li><a href="/" onClick={handlerLogout}>Выйти</a></li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}
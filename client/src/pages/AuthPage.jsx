import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useMessage } from '../hooks/message.hook'
import './style.scss'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const handlerChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    const handlerRegister = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const handlerLogin = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="holder-auth">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input 
                                    placeholder="Enter your email"
                                    type="text" 
                                    id="email" 
                                    className="autocomplete"
                                    name="email"
                                    onChange={handlerChange}
                                    />
                                <label htmlFor="email">Email: </label>
                            </div>

                            <div className="input-field">
                                <input 
                                    placeholder="Enter your password"
                                    type="password" 
                                    id="password" 
                                    className="autocomplete"
                                    name="password"
                                    onChange={handlerChange}
                                    />
                                <label htmlFor="password">Password: </label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4"
                            disabled={loading}
                            onClick={handlerLogin}
                            >
                                Войти
                        </button>

                        <button 
                            className="btn"
                            onClick={handlerRegister}
                            disabled={loading}
                            >
                                Регистрация
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
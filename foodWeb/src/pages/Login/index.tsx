import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'

const Login = () => {
    
    const history = useHistory()

    const [erro, setErro] = useState<String>('')

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    function handleError(value: String){
        setErro(value)
        setTimeout(() => {
            setErro('')
        }, 4000)
    }

async function logar(){

    if (formData.email && formData.password) {
        const response = await api.post('user/login', {
          email: formData.email,
          password: formData.password,
        })
        const { user, error } = response.data
  
        if (user) {
            await localStorage.setItem('idUser@food', user._id);
            await localStorage.setItem('nameUser@food', user.name);
            await localStorage.setItem('emailUser@food', user.email);
            await localStorage.setItem('foneUser@food', user.fone);

            history.push('/')

        } else if (error) {
          handleError(error)
        }
      } else {
        handleError('Preencha todos os campos!')
      }
}

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        logar()
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} >
                <h1>Bem vido ao Posse Eats</h1>


            <div className="login-label">
                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        onChange={handleInputChange}
                    />
                </div>

            </div>

                <button type="submit">
                    Entrar
                </button>
            </form>

            {erro ? <p id="error">{erro}</p> : null}

        </div>
    )
}

export default Login
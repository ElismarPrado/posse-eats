import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import { MdPowerSettingsNew } from 'react-icons/md'

import './styles.css'

interface Params {
    name?: string
}

const Menu: React.FC<Params> = (props) => {
    const history = useHistory()

      async function getOut(){
        if (window.confirm("Você realmente quer sair?")) { 
            await localStorage.removeItem('idUser@food');
            await localStorage.removeItem('nameUser@food');
            await localStorage.removeItem('emailUser@food');
            await localStorage.removeItem('foneUser@food');
            history.push('/login')
        }
      }

    return (
        <div className="menu-menu">
            <div className="menu-out" onClick={getOut}>
                <MdPowerSettingsNew color="#f5f5f5" size={30} />
                <p className="menu-title-off">Sair do sistema</p>
            </div>
            <Link to="/" id={props.name === 'Home' ? "linkSelected" : "link"} >
                <strong>Dashboard</strong>
                <FiChevronRight size={15} color="#999" />
            </Link>

            <Link to="/operation" id={props.name === 'Operation' ? "linkSelected" : "link"}>
                <strong>Operation</strong>
                <FiChevronRight size={15} color="#999" />
            </Link>

            <Link to="/contas" id={props.name === 'Contas' ? "linkSelected" : "link"}>
                <strong>Contas</strong>
                <FiChevronRight size={15} color="#999" />
            </Link>

            <Link to="/historico" id={props.name === 'Historico' ? "linkSelected" : "link"}>
                <strong>Histórico</strong>
                <FiChevronRight size={15} color="#999" />
            </Link>

            <Link to="/cadastro" id={props.name === 'Cadastro' ? "linkSelected" : "link"}>
                <strong>Cadastro</strong>
                <FiChevronRight size={15} color="#999" />
            </Link>

        </div>
    )
}

export default Menu
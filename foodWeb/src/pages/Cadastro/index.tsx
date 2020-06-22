import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './styles.css'
import Menu from '../Components/Menu'

import Estabelecimento from './Estabelecimento'
import Produto from './Produto'

const Cadastro = () => {
    const history = useHistory()

    const [showLabel, setShowLabel] = useState('Produto')

    return (
      <>
        <div className="cadastro-header">
            <div className="cadastro-header-label">
              <button 
                onClick={() => setShowLabel('Produto')} 
                id={showLabel === "Produto" ? "cadastro-button" : "cadastro-button-selected"}
                >Cadastro de Produtos</button>
              <button 
                onClick={() => setShowLabel('Estabelecimento')} 
                id={showLabel === "Estabelecimento" ? "cadastro-button" : "cadastro-button-selected"}
              >Cadastro do Estabelecimento</button>
            </div>
        </div>
        <div className="cadastro-container">

            <Menu name={'Cadastro'} />

            {showLabel === 'Produto' ?
            <Produto />
            :showLabel === 'Estabelecimento' ?
            <Estabelecimento />
            :null}

        </div>
      </>
    )
}


export default Cadastro
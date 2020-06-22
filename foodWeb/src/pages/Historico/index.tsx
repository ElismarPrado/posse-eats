import React, { useState, useEffect } from 'react'
import './styles.css'
import api from '../../services/api'

import Menu from '../Components/Menu'

const Historico = () => {
 
  return (
    <>
     <div className="historico-header">
        
    </div>

    <div className="historico-container">
        <Menu name={'Historico'} />
        <h1>Histórico</h1>
    </div>
    </>
  )
}

export default Historico
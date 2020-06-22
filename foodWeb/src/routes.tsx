import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Operation from './pages/Operation'
import Cadastro from './pages/Cadastro'
import Contas from './pages/Contas'
import Historico from './pages/Historico'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path='/' exact />
            <Route component={Login} path='/login' />
            <Route component={Operation} path='/operation' />
            <Route component={Cadastro} path='/cadastro' />
            <Route component={Contas} path='/contas' />
            <Route component={Historico} path='/historico' />
        </BrowserRouter>
    )
}

export default Routes
import React, { useState, useEffect } from 'react'
import './styles.css'
import api from '../../services/api'
import dateFormat from 'dateformat'
import { MdChevronRight, MdSearch, MdClose } from "react-icons/md";

import Menu from '../Components/Menu'

interface Date {
  _id: string
  createAt: string
  identregador: string
  total: number
  frete: number
  produto: [{
    quantidade: number
    nome: string
  }] 
}


const Contas = () => {
  dateFormat.masks.data = 'dd/mm/yyyy';
  dateFormat.masks.hour = 'HH:MM';

  const [showSection, setShowSection] = useState<Number>(1)

  const [date1, setDate1] = useState<Date[]>([])
  const [date2, setDate2] = useState<Date[]>([])

  async function getDate(){
    const id = await localStorage.getItem('idUser@food')
    const responsePlace = await api.get(`place/getIdUser?iduser=${id}`)
    const idPlace = responsePlace.data[0]._id
    const response1 = await api.get(`/requestContas/getIdPlaceRepasse?idplace=${idPlace}&&repasse=true&&status=ENTREGUE`)
    const response2 = await api.get(`/requestContas/getIdPlaceRepasse?idplace=${idPlace}&&repasse=false&&status=ENTREGUE`)
   
    setDate1(response1.data)
    setDate2(response2.data)
  }
  useEffect(()=>{getDate()},[])



  async function repasse(id: String){
    if (window.confirm("Você recebeu do entregador?")) { 
      await api.put(`requestContas/updateRepasse/${id}`, {
        repasse: true
      })
      getDate()
    }
  }


  return (
    <>
     <div className="contas-header">
        <button className={showSection===1?"contas-buttun-selected":"contas-buttun"} onClick={()=>setShowSection(1)}>Pedidos à receber</button>
        <button className={showSection===2?"contas-buttun-selected":"contas-buttun"} onClick={()=>setShowSection(2)}>Pedidos recebidos</button>

      </div>
      <div className="contas-container">
        <Menu name={'Contas'} />

      {showSection === 1?
      <div className="contas-section">
        {date2&&date2.length?
        date2.map(date=>(
          <div className="contas-label" key={date._id}>
            <p className="contas-id">{date._id.slice((date._id.length-5), date._id.length)}</p>
              <div className="contas-label2">
                <div className="contas-labelData">
                  <p className="contas-hora">{dateFormat(date.createAt, "hour")}</p>
                  <p className="contas-hora">{dateFormat(date.createAt, "data")}</p>
                </div>
              </div>

              <div className="contas-labelProduto">
              <p className="contas-produto">Produtos:</p>
                {date.produto.slice(0,2).map(date=>(
                  <div className="contas-labelProduto2">
                    <p className="contas-quantidade">{date.quantidade}</p>
                    <p className="contas-nome">{date.nome}</p>
                  </div>
                ))}
                <p className="contas-more">...</p>
                <p className="contas-total">Receber: R$ {(date.total + date.frete).toFixed(2)}</p>
                </div>
                <button onClick={()=>repasse(date._id)} className="contas-button">RECEBIDO</button>
            </div>
              ))
              
          :null}
      </div>
      :
      showSection === 2?
      <div className="contas-section">
      {date1&&date1.length?
      date1.map(date=>(
        <div className="contas-label-recebidas" key={date._id}>
          <p className="contas-id">{date._id.slice((date._id.length-5), date._id.length)}</p>
            <div className="contas-label2">
              <div className="contas-labelData">
                <p className="contas-hora">{dateFormat(date.createAt, "hour")}</p>
                <p className="contas-hora">{dateFormat(date.createAt, "data")}</p>
              </div>
            </div>

            <div className="contas-labelProduto">
            <p className="contas-produto">Produtos:</p>
                {date.produto.slice(0,2).map(date=>(
                  <div className="contas-labelProduto2">
                    <p className="contas-quantidade">{date.quantidade}</p>
                    <p className="contas-nome">{date.nome}</p>
                  </div>
                ))}
              <p className="contas-more">...</p>
              <p className="contas-total">Recebido: R$ {(date.total + date.frete).toFixed(2)}</p>
              </div>
              <p className="contas-button-ivisivel"></p>
          </div>
            ))
            
        :null}
    </div>
      :null}

      </div>
    </>
  )
}

export default Contas
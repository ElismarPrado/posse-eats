import React, { useState, useEffect } from 'react'
import './styles.css'
import api from '../../services/api'
import dateFormat from 'dateformat'
import io from 'socket.io-client'
import Switch from "react-switch";
import { MdClose, MdExpandMore, MdAirportShuttle } from 'react-icons/md'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import Menu from '../Components/Menu'
import Message from '../Components/Message'

const API_URL = 'http://3.23.146.65:3333'

interface Data {
    _id: string
    status: string
    produto: [{
        quantidade: number
        nome: string
    }]
}

interface DataDetail {
    _id: string
    idplace: string
    nomeuser: string
    foneuser: string
    pagamento: string
    total: number
    frete: number
    createAt: Date
    status: string
    identregador: string
    produto: [{
        quantidade: number
        nome: string
        descricao: string
        opcao1: string
        opcao2: string
        opcao3: string
        observacao: string
        valor: number
    }]
}

const Operation = () => {
    dateFormat.masks.hour = 'HH:MM';

    const [mensagem, setMensagem] = useState<{msg: String, color: number}>()

    const [date1, setDate1] = useState<Data[]>([])
    const [date2, setDate2] = useState<Data[]>([])
    const [date3, setDate3] = useState<Data[]>([])

    const [dateDetail, setDateDetail] = useState<DataDetail>()

    const[state, setState] = useState(false) // stado do switch
    const[showLabel, setShowLabel] = useState(false)

    async function getDate(){
        const id = await localStorage.getItem('idUser@food')
        const responsePlace = await api.get(`place/getIdUser?iduser=${id}`)
        const idPlace = responsePlace.data[0]._id

        const response1 = await api.get(`request/getIdPlaceStatus?idplace=${idPlace}&&status=AGUARDANDO`)
        const response2 = await api.get(`request/getIdPlaceStatus?idplace=${idPlace}&&status=PREPARANDO`)
        const response3 = await api.get(`request/getIdPlace/${idPlace}`)
        setDate1(response1.data)
        setDate2(response2.data)
        setDate3(response3.data)
      }
      useEffect(()=>{getDate()},[])

    //Conexão de socket.io --------------------------------------------------------------------------------
    async function socket() {
      const id = await localStorage.getItem('idUser@food')
      const responsePlace = await api.get(`place/getIdUser?iduser=${id}`)
      const idPlace = responsePlace.data[0]._id
      const socket = io(API_URL, {
        query: {user: idPlace},
      });
      socket.on('canal', (date:{id: String, msg: String}) => {
        if(date.id === idPlace && date.msg === 'changeStatus'){
          getDate()
        }

        if(date.id === idPlace && date.msg === "novo pedido"){
          setMensagem({msg:'Chegou um novo pedido!', color:1})
          getDate()
         }

        if(date.id === idPlace && date.msg === 'atualizar status de abertura'){
          getStatePlace()
        }

        if(date.id === idPlace && date.msg === 'sem entregador'){
          setMensagem({msg:'Não há entregadores disponíveis, tente novamente em alguns minutos!', color:2})
          getDate()
        }

        if(date.id === idPlace && date.msg === 'recusado'){
          setMensagem({msg:'Você recusou um pedido!', color:2})
          getDate()
        }
      });
    }
    useEffect(() => {
      socket();
    }, []);

      async function getDateDetail(id: String){
        const response = await api.get(`request/get/${id}`)
        setDateDetail(response.data)
        setShowLabel(true)
      }

      async function changeStatus(status: String, id: String, id2: String){
          await api.put(`request/updateStatus/${id}`,{
            status,
          })
          const response = await api.get(`request/get/${id}`)
          const iduser = response.data.iduser
          await api.post(`comand/${iduser}/changeStatus`)

          if(status === 'AGUARDANDO ENTREGADOR'){
          setMensagem({ msg: 'Aguarde, chamando entregador mais próximo', color: 1})
          await api.post(`comand/all-entregadores/chamar entregador`)
          }

          if(status === 'RECUSADO') {
          await api.post(`comand/${iduser}/recusado`)
          await api.post(`comand/${id2}/changeStatus`)
          }

          if(status === 'PREPARANDO'){
            setMensagem({ msg: `Preparando pedido Nº ${id.slice((id.length-5), id.length)}`, color: 1})
            await api.post(`comand/${id2}/changeStatus`)
            }

          if(status === 'CHAMAR ENTREGADOR'){
            setMensagem({ msg: `Pedido Nº ${id.slice((id.length-5), id.length)} está pronto, chame um entregador!`, color: 1})
            await api.post(`comand/${id2}/changeStatus`)
            }

          getDate()
          setShowLabel(false)
      }

      function close(){
        setShowLabel(false)
      }

      async function getStatePlace(){
        const id = await localStorage.getItem('idUser@food')
        const responsePlace = await api.get(`place/getIdUser?iduser=${id}`)
        const stateOpen = responsePlace.data[0].open
        setState(stateOpen)
      }
      useEffect(()=>{getStatePlace()},[])


      async function changeStatePlace(){
        setState(!state)
        const id = await localStorage.getItem('idUser@food')
        const responsePlace = await api.get(`place/getIdUser?iduser=${id}`)
        const dadosPlace = responsePlace.data
        const idPlace = dadosPlace[0]._id
        await api.put(`place/updateOpen/${idPlace}`,{
          open: !state
        })
        await api.post(`comand/all-clients/atualizar status de abertura`)
        await api.post(`comand/${id}/atualizar status de abertura`)
        getDate()
      }


    return (
        <>
        {mensagem&&<Message mensagem={String(mensagem.msg)} color={mensagem.color}/>}
        <div className="operation-header">
            <div id="label-switch">
                <Switch onChange={()=> changeStatePlace()} checked={state} />
                <p className="operation-header-txt">{ state ? "Aberto": "Fechado" }</p>
            </div>
        </div>
        <div className="operation-container">
            <Menu name={'Operation'}/>
            
            <div className="operation-section">
                {date1 ?
                date1.map(date => (
                    <div 
                     key={date._id} 
                     className="operation-label" 
                     onClick={() => getDateDetail(date._id)}
                     >
                        <p id="numero-pedido">{date._id.slice((date._id.length-5), date._id.length)}</p>
                        <div>
                        <div className="operation-label-product">
                            <p id="quantidade-produto">{date.produto[0].quantidade}</p>
                            <p id="nome-produto">{date.produto[0].nome}</p>
                        </div>
                        <p id="mais-produto">...</p>
                        </div>
                        <MdExpandMore color="#999" size={25}/>
                    </div>
                ))
                :null}
            </div>

            <div className="operation-section">
                {date2 ?
                    date2.map(date => (
                        <div 
                         key={date._id} 
                         className="operation-label operation-color2" 
                         onClick={() => getDateDetail(date._id)}
                        >
                            <p id="numero-pedido">{date._id.slice((date._id.length-5), date._id.length)}</p>
                            <div>
                            <div className="operation-label-product">
                                <p id="quantidade-produto">{date.produto[0].quantidade}</p>
                                <p id="nome-produto">{date.produto[0].nome}</p>
                            </div>
                            <p id="mais-produto">...</p>
                            </div>
                            <MdExpandMore color="#999" size={25}/>
                        </div>
                    ))
                    :null}
            </div>


            <div className="operation-section">
                {date3 ?
                date3.map(date => (
                    date.status === 'AGUARDANDO' 
                    || date.status === 'PREPARANDO' 
                    || date.status === 'ENTREGUE' 
                    || date.status === 'NAO ENTREGUE' 
                    || date.status === 'INCIDENTE'
                    || date.status === 'NAO PREPARADO'
                    || date.status === 'FECHADO'
                    || date.status === 'RECUSADO'
                    ?null: 
                    <div 
                     key={date._id} 
                     className="operation-label operation-color3"
                     onClick={() => getDateDetail(date._id)}
                     >
                         <p id="numero-pedido">{date._id.slice((date._id.length-5), date._id.length)}</p>
                         <div>
                            <div className="operation-label-product">
                                <p id="quantidade-produto">{date.produto[0].quantidade}</p>
                                <p id="nome-produto">{date.produto[0].nome}</p>
                            </div>
                            <p id="mais-produto">...</p>
                            </div>
                            {
                            date.status === 'CHAMAR ENTREGADOR'?<p className="operation-texto-status-entrega" >Chame um entregador</p>
                            :date.status === 'AGUARDANDO ENTREGADOR'?<p className="operation-texto-status-entrega" >Procurando entregador
                              <Loader
                                type="Puff"
                                color="#424242"
                                height={10}
                                width={10}
                              />
                              </p>
                            :date.status === 'DESIGNADO PARA ENTREGADOR'?<p className="operation-texto-status-entrega">Entregador a caminho</p>
                            :date.status === 'ENTREGADOR NO RESTAURANTE'?<p className="operation-texto-status-entrega">Entregador no restaurante</p>
                            :date.status === 'ENTREGADOR A CAMINHO'?<p className="operation-texto-status-entrega">Entregador deslocando-se</p>
                            :date.status === 'ENTREGADOR NO CLIENTE'?<p className="operation-texto-status-entrega">Entregador no cliente</p>
                            :date.status === 'RETIRADA LOCAL'?<p className="operation-texto-status-entrega">Aguardando retirada</p>
                            :null}
                            <MdExpandMore color="#999" size={25}/>
                    </div>
                ))
                :null}
            </div>
            </div>

        {showLabel?
            dateDetail ?
            <div className="operation-section-detail">
            <div className="operation-label-detail">
    
            <div className="operation-label-client-detail">
              <div>
                <p className="operation-texto-detail">{dateDetail.nomeuser}</p>
                <p className="operation-texto-detail">{dateDetail.foneuser}</p>
              </div>
              <MdClose size={30} color="#424242" id="close" onClick={close}/>
            </div>

            <div className="operation-label-product-detail">
              {dateDetail.produto.map(date=>(
                <div className="operation-label-product2-detail">
                  <p className="operation-texto-quantidade-detail">{date.quantidade}</p>
                <div className="operation-label-product3-detail">
                  <p className="operation-texto-nome-detail">{date.nome}</p>
                  <p className="operation-texto-descricao-detail">{date.descricao}</p>
                  {date.opcao1?<p className="operation-texto-descricao2-detail">{date.opcao1}</p>:null}
                  {date.opcao2?<p className="operation-texto-descricao2-detail">{date.opcao2}</p>:null}
                  {date.opcao3?<p className="operation-texto-descricao2-detail">{date.opcao3}</p>:null}
                  {date.observacao?<p className="operation-texto-descricao-detail">Obs: {date.observacao}</p>:null}
                </div>
                <p className="operation-texto-valor-detail">R$ {(date.valor*date.quantidade).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="operation-total-detail">
              {dateDetail.pagamento?<p className="operation-texto-tipoPag1-detail">Pago pelo Aplicativo</p>
              :<p className="operation-texto-tipoPag-detail">Cliente pagará na entrega</p>}
              <p className="operation-texto-total-detail"><span className="operation-texto-total-span-detail">Total com entrega:</span> R$ {(dateDetail.total + dateDetail.frete).toFixed(2)}</p>
            </div>

            <div className="operation-label-button-detail">
            <div className="operation-status-detail">
              <p className="operation-texto-hour-detail">{dateFormat(dateDetail.createAt, "hour")}</p>
            </div>

            {dateDetail.status === 'AGUARDANDO' ?
            <div className="operation-label-button-detail2">
                <button className="operation-button-detail2" onClick={()=>changeStatus('RECUSADO', dateDetail._id, dateDetail.idplace)}>Recusar pedido</button>
                <button className="operation-button-detail" onClick={()=>changeStatus('PREPARANDO', dateDetail._id, dateDetail.idplace)}>Preparar pedido</button>
            </div>
            :dateDetail.status === 'PREPARANDO' ?
                <button className="operation-button-detail" onClick={()=>changeStatus('CHAMAR ENTREGADOR', dateDetail._id, dateDetail.idplace)}>Pedido pronto</button>
            :dateDetail.status === 'CHAMAR ENTREGADOR' ? (<div className="operation-label-button-detail2">
                <button className="operation-button-detail3" onClick={()=>changeStatus('RETIRADA LOCAL', dateDetail._id, dateDetail.idplace)}>Retirada local</button>
                <button className="operation-button-detail" onClick={()=>changeStatus('AGUARDANDO ENTREGADOR', dateDetail._id, dateDetail.idplace)}>Chamar entregador</button>
               </div> )
            :dateDetail.status == 'RETIRADA LOCAL' ?
                <button className="operation-button-detail" onClick={()=>changeStatus('ENTREGUE', dateDetail._id, dateDetail.idplace)}>Pedido entregue</button>
                
            :dateDetail.status === 'AGUARDANDO ENTREGADOR'?<p className="operation-texto-status" >Procurando entregador</p>
            :dateDetail.status === 'DESIGNADO PARA ENTREGADOR'?<p className="operation-texto-status">Entregador a caminho</p>
            :dateDetail.status === 'ENTREGADOR NO RESTAURANTE'?<p className="operation-texto-status">Entregador no restaurante</p>
            :dateDetail.status === 'ENTREGADOR A CAMINHO'?<p className="operation-texto-status">Entregador deslocando-se</p>
            :dateDetail.status === 'ENTREGADOR NO CLIENTE'?<p className="operation-texto-status">Entregador no cliente</p>
            
            :null
            }

            </div>

          </div>

        </div>
        :null
        :null}


        
    </>
    )
}

export default Operation
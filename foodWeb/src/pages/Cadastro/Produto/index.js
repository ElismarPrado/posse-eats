import React, { useState, useEffect, useCallback } from 'react'
import './styles.css'

import Select from 'react-select';
import {useDropzone} from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import Message from '../../Components/Message'

import api from '../../../services/api'

import { MdRadioButtonUnchecked } from "react-icons/md";

export default function Produto() {

  const [file, setFile] = useState()
  const [mensagem, setMensagem] = useState()

  const [showLabel, setShowLabel] = useState(false)

  const [date, setDate] = useState()
 
  const [idPlace, setIdPlace] = useState()
  const [nomePlace, setNomePlace] = useState()
  const [fotoPlace, setFotoPlace] = useState()

  const [id, setId] = useState()

  const [nome, setNome] = useState()
  const [descricao, setDescricao] = useState()
  const [categoria, setCategoria] = useState()
  const [categoriaValue, setCategoriaValue] = useState()
  const [valor, setValor] = useState()
  const [posicao, setPosicao] = useState(3)

  const [options, setOptions] = useState()

  const [opcao1, setOpcao1] = useState([])
  const [opcaoProv1, setOpcaoProv1] = useState()

  const [opcao2, setOpcao2] = useState([])
  const [opcaoProv2, setOpcaoProv2] = useState()

  const [opcao3, setOpcao3] = useState([])
  const [opcaoProv3, setOpcaoProv3] = useState()

  const [selectedFileUrl, setSelectedFileUrl] = useState('')
  const onDrop = useCallback(acceptedFiles => {
      setFile(acceptedFiles[0])
      const fileUrl = URL.createObjectURL(acceptedFiles[0])
      setSelectedFileUrl(fileUrl)
  }, [])
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  async function getDate(){
    const id = await localStorage.getItem('idUser@food')
    const responsePlace = await api.get(`place/getIdUser?iduser=${id}`)
    const dadosPlace = responsePlace.data

    const response = await api.get(`product/getIdPlace/${dadosPlace.map(date=>(date._id))}`)
    setDate(response.data)
    dadosPlace.map(date=>(
      setIdPlace(date._id),
      setNomePlace(date.nome),
      setFotoPlace(date.url)
    ))
  }
  useEffect(()=>{getDate()},[])


  function fileSelected(value) {
    setFile(value.target.files[0])
  }

  async function inserir(){

    const opcao1f = opcao1.toString()
    const opcao2f = opcao2.toString()
    const opcao3f = opcao3.toString()


    if(file){
      const data = new FormData();
      data.append('file', file);

    if(nome&&descricao&&categoria&&valor){
    const response = await api.post('product/create', data, {
      headers:{
      idplace: idPlace,
      nomeplace: nomePlace,
      fotoplace: fotoPlace,
      nome,
      descricao,
      categoria,
      valor, 
      posicao,
      opcao1: opcao1f,
      opcao2: opcao2f,
      opcao3: opcao3f,
      }

    })

    const {success, error} = response.data
    if(success){
      setMensagem({ msg: 'Produto cadastrado com sucesso!', color: 1})
      getDate()
    }else if(error){
      setMensagem({ msg: `Ocorreu um erro: ${error}`, color: 2})
      getDate()
    }
  }else{
    setMensagem({ msg: 'Preencha todos os campos!', color: 2})
  }
}else{
  setMensagem({ msg: 'Insira uma imagem!', color: 2})
}
  }

  function excluir(id){
    if (window.confirm("Você realmente quer excluir o produto?")) { excluirConfirm(id) }
  }

  async function excluirConfirm(id){
    const response = await api.delete(`product/delete/${id}`)
    const { success, error } = response.data
    if(success){
      setMensagem({ msg: 'Produto excluído com sucesso!', color: 1})
      getDate()
    }else if(error){
      setMensagem({ msg: `Ocorreu um erro: ${error}`, color: 2})
      getDate()
    }
  }

  async function alterar(id){
    const response = await api.get(`product/get/${id}`)
    const dados = response.data
    setId(dados._id)
    setPosicao(dados.posicao)
    setNome(dados.nome)
    setDescricao(dados.descricao)
    setCategoria(dados.categoria)
    setValor(dados.valor)
    setShowLabel(true)

    setCategoriaValue('')
    setCategoria('')
  }

  async function alterarConfirm(){
    const response = await api.put(`product/update/${id}`,{
      posicao,
      nome,
      descricao,
      categoria,
      valor,
    })
    const {success, error} = response.data
    if(success){
      setMensagem({ msg: 'Produto alterado com sucesso!', color: 1})
      getDate()

      setId("")
      setNome("")
      setDescricao("")
      setCategoria("")
      setValor("")
      setPosicao("")

    }else if(error){
     setMensagem({ msg: `Ocorreu um erro: ${error}`, color: 2})
     getDate()
    }
    setShowLabel(false)
  }


async function getCategoria(){
  const response = await api.get('categoria/get')
  const dados = response.data

  const array = []
  for (let i = 0; i < dados.length; i++) {
    array.push({value: dados[i].name, label: dados[i].name})
    setOptions(array)
  }
}
useEffect(()=>{getCategoria()},[])


function handleCategoria(value){
  setCategoriaValue(value)
  setCategoria(value.label)
}

//insere opções no array opcaoArray
function inserirOpcao1(){
    const array = opcao1
    array.push(`'${opcaoProv1}'`)
    setOpcao1(array)
    setOpcaoProv1("")
    getDate()
}

function inserirOpcao2(){
  const array = opcao2
  array.push(`'${opcaoProv2}'`)
  setOpcao2(array)
  setOpcaoProv2("")
  getDate()
}

function inserirOpcao3(){
  const array = opcao3
  array.push(`'${opcaoProv3}'`)
  setOpcao3(array)
  setOpcaoProv3("")
  getDate()
}
  return (
    <div className="product-container">
       {mensagem&&<Message mensagem={String(mensagem.msg)} color={mensagem.color}/>}
        <div className="product-section-left">
            <div className="product-label-left">
                {date&&date.length>0?
                  date.map(date=>(
                    <div className="product-label">
                      <div className="product-label-image">
                          <img
                          className="product-image"
                          src={date.url}/>
                      </div>
                      <div className="product-texto">
                        <p className="product-texto-nome">{date.nome}</p>
                        <p className="product-texto-descricao">{date.descricao}</p>
                        <p className="product-texto-categoria">Categoria: {date.categoria}</p>
                        <p className="product-texto-valor">R$ {date.valor.toFixed(2)}</p>

                        {date.posicao===1?<p className="product-texto-destaque">Em destaque</p>
                        :date.posicao===2?<p className="product-texto-promocao">Em Promoção</p>
                        :null}
                      </div>
                        <div className="product-label-bt">
                          <p className="product-bt-alterar" onClick={()=>alterar(date._id)}>Alterar</p>
                          <p className="product-bt-excluir" onClick={()=>excluir(date._id)}>Excluir</p>
                        </div>
                    </div>
                  ))
                :null}
            </div>
        </div>


        <div className="product-section-right">
        <div className="product-label-right">

    {!showLabel?
          <div className="product-label-right2">
           <p className="product-title">Inserir Produto</p>
           <div className="place-label-input-imagem">

            <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />

            {file
            ?<img src={selectedFileUrl} alt="Point thumbnail" />
            :(
            <p>
                <FiUpload />
                Imagem do estabelecimento
            </p>
            )
            }

            </div>
            </div>

                <input
                    className="product-input"
                    placeholder="Nome do produto"
                    maxLength={50}
                    onChange={(e)=>setNome(e.target.value)}
                />
                <input
                    className="product-input"
                    placeholder="Descrição"
                    multiline={true}
                    maxLength={90}
                    onChange={(e)=>setDescricao(e.target.value)}
                />

                <Select
                    placeholder="Categoria"
                    className="product-input-select"
                    value={categoriaValue}
                    onChange={handleCategoria}
                    options={options}
                />

                <input
                    className="product-input"
                    placeholder="Valor"
                    maxLength={6}
                    onChange={(e)=>setValor(e.target.value)}
                />

                <div className="product-input-label-checkbox">
                  <div className="product-input-label-checkbox2">
                    <input type="checkbox"  onChange={()=>setPosicao(1)} />
                    <p className="product-input-checkbox-texto">Em destaque</p>
                  </div>
                  <div className="product-input-label-checkbox2">
                    <input type="checkbox"  onChange={()=>setPosicao(2)} />
                    <p className="product-input-checkbox-texto">Em promoção</p>
                  </div>
                </div>

              <div className="product-opcao-section">
                <p>Inserir opções:</p>

                <div className="product-opcao-label">
                  <div className="product-opcao-label1">
                  {opcao1?
                  <>
                  <p className="product-opcao-title">{opcao1[0]}</p>
                    {opcao1.map(date=>(
                      date===opcao1[0]?null:
                      <div className="product-opcao-div">
                      <div>
                      <p className="product-opcao-texto">{date.split(".",1)}</p>
                      <p className="product-opcao-texto1">{date.split(".",)[1]}</p>
                      </div>
                      <MdRadioButtonUnchecked className="product-opcao-icon" />
                      </div>
                    ))}
                  </>:null}
                  </div>
             
                  <div className="product-opcao-label1">
                  {opcao2?
                  <>
                  <p className="product-opcao-title">{opcao2[0]}</p>
                    {opcao2.map(date=>(
                      date===opcao2[0]?null:
                      <div className="product-opcao-div">
                      <div>
                      <p className="product-opcao-texto">{date.split(".",1)}</p>
                      <p className="product-opcao-texto1">{date.split(".",)[1]}</p>
                      </div>
                      <MdRadioButtonUnchecked className="product-opcao-icon" />
                      </div>
                    ))}
                  </>:null}
                  </div>

                  <div className="product-opcao-label1">
                  {opcao3?
                  <>
                  <p className="product-opcao-title">{opcao3[0]}</p>
                    {opcao3.map(date=>(
                      date===opcao3[0]?null:
                      <div className="product-opcao-div">
                      <div>
                      <p className="product-opcao-texto">{date.split(".",1)}</p>
                      <p className="product-opcao-texto1">{date.split(".",)[1]}</p>
                      </div>
                      <MdRadioButtonUnchecked className="product-opcao-icon" />
                      </div>
                    ))}
                  </>:null}
                  </div>

                </div>


                <div  className="product-input-label-opcao">
                <input
                    value={opcaoProv1}
                    className="product-input-opcao"
                    maxLength={200}
                    onChange={(e)=>setOpcaoProv1(e.target.value)}
                />
                <button className="product-button-opcao" onClick={()=>inserirOpcao1()}>Add</button>
                </div>

                <div  className="product-input-label-opcao">
                <input
                    value={opcaoProv2}
                    className="product-input-opcao"
                    maxLength={200}
                    onChange={(e)=>setOpcaoProv2(e.target.value)}
                />
                <button className="product-button-opcao" onClick={()=>inserirOpcao2()}>Add</button>
                </div>

                <div  className="product-input-label-opcao">
                <input
                    value={opcaoProv3}
                    className="product-input-opcao"
                    maxLength={200}
                    onChange={(e)=>setOpcaoProv3(e.target.value)}
                />
                <button className="product-button-opcao" onClick={()=>inserirOpcao3()}>Add</button>
                </div>
              </div>
                  <div className="product-button-label">
                    <button className="product-button" onClick={()=>inserir()}>Inserir</button>
                  </div>
            </div>

      :

            <div className="product-label-right2">
            <p className="product-title">Alterar Produto</p>
       
                <input
                    className="product-input"
                    placeholder="Nome do produto"
                    maxLength={50}
                    value={nome}
                    onChange={(e)=>setNome(e.target.value)}
                />
                <input
                    className="product-input"
                    placeholder="Descrição"
                    maxLength={90}
                    value={descricao}
                    onChange={(e)=>setDescricao(e.target.value)}
                />

                <Select
                    placeholder="Categoria"
                    className="product-input-select"
                    value={categoriaValue}
                    onChange={handleCategoria}
                    options={options}
                />

                <input
                    className="product-input"
                    placeholder="Valor"
                    maxLength={6}
                    value={valor}
                    onChange={(e)=>setValor(e.target.value)}
                />
                <div className="product-input-label-checkbox">
                  <div className="product-input-label-checkbox2">
                    <input type="checkbox"  onChange={()=>setPosicao(1)} />
                    <p className="product-input-checkbox-texto">Em destaque</p>
                  </div>
                  <div className="product-input-label-checkbox2">
                    <input type="checkbox"  onChange={()=>setPosicao(2)} />
                    <p className="product-input-checkbox-texto">Em promoção</p>
                  </div>
                </div>

                <div className="product-button-label">
                    <button className="product-button" onClick={()=>alterarConfirm()}>Alterar</button>
                </div>

            </div>
}

          </div>
        </div>
    </div>
  )
}

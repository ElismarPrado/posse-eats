import React, { useState, useEffect, useCallback } from 'react'
import './styles.css'
import api from '../../../services/api'
import {useDropzone} from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'
import Select from 'react-select';
import { Map, TileLayer, Marker } from 'react-leaflet'
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import Message from '../../Components/Message'

import dateFormat from 'dateformat';



export default function Estabelecimento() {

  const [file, setFile] = useState()
  const [date, setDate] = useState()

  const [mensagem, setMensagem] = useState()

  const [initialPosition, setInitialPosition] = useState({
    latitude: '',
    longitude: ''
  })
  const [selectedPosition, setSelectedPosition] = useState({
    latitude: '',
    longitude: ''
  })

  const [time1, setTime1] = useState()
  const [time2, setTime2] = useState()
  const [time3, setTime3] = useState()
  const [time4, setTime4] = useState()
  const [time5, setTime5] = useState()
  const [time6, setTime6] = useState()

  const [idPlace, setIdplace] = useState()
  const [showLabel, setShowLabel] = useState(false)

  const [estabelecimento, setEstabelecimento] = useState()
  const [descricao, setDescricao] = useState()
  const [categoria, setCategoria] = useState()

  const [s, setS] = useState(false)
  const [d, setD] = useState(false)
  const [ss, setSs] = useState(true)

  const [options, setOptions] = useState()
  const [categoriaValue, setCategoriaValue] = useState()

  dateFormat.masks.hammerTime = 'HH:MM';

  const time1f = dateFormat(time1, "hammerTime");
  const time2f = dateFormat(time2, "hammerTime");
  const time3f = dateFormat(time3, "hammerTime");
  const time4f = dateFormat(time4, "hammerTime");
  const time5f = dateFormat(time5, "hammerTime");
  const time6f = dateFormat(time6, "hammerTime");


  const [timer, setTimer] = useState(false)

  useEffect(() => {setTimeout(() => {
    setTimer(true)
  }, 1000);}, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        setInitialPosition({latitude, longitude})
    })
  }, [])

  function handleMapClick(event){
    setSelectedPosition({
      latitude: event.latlng.lat,
      longitude: event.latlng.lng
    })
  } 


  async function getDate() {
    const id = await localStorage.getItem('idUser@food')
    const response = await api.get(`place/getIdUser?iduser=${id}`)
    const dados = response.data
    setDate(dados)
  }
  useEffect(() => { getDate() }, [])

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


  async function salvar() {
    let time1fm = ""
    let time2fm = ""
    let time3fm = ""
    let time4fm = ""
    let time5fm = ""
    let time6fm = ""
    const iduser = await localStorage.getItem('idUser@food')

    if (ss) {
      time1fm = time1f
      time2fm = time2f
    } else {
      time1fm = ""
      time2fm = ""
    }

    if (s) {
      time3fm = time3f
      time4fm = time4f
    } else {
      time3fm = ""
      time4fm = ""
    }

    if (d) {
      time5fm = time5f
      time6fm = time6f
    } else {
      time5fm = ""
      time6fm = ""
    }

    if(file){

      const data = new FormData();
      data.append('file', file);

    if (iduser && estabelecimento && categoria && time1 && time2) {
      const response = await api.post('place/create', data, {
        headers:{
        iduser,
        nome: estabelecimento,
        descricao,
        categoria,
        ssh1: time1fm,
        ssh2: time2fm,
        sh1: time3fm,
        sh2: time4fm,
        dh1: time5fm,
        dh2: time6fm,
        lat: selectedPosition.latitude,
        lgt: selectedPosition.longitude
      }
      })

      const {success, error} = response.data
      if(success){
        setMensagem({ msg: 'Cadastro efetuado com sucesso!', color: 1})
      }else if(error){
        setMensagem({ msg: `Ocorreu um erro: ${error}`, color: 2})
      }

      getDate()
    } else {
      setMensagem({ msg: 'Preencha os campos obrigatórios!', color: 2})
    }
  }else{
    setMensagem({ msg: 'Insira uma imagem!', color: 2})
  }
  }


  async function alterar() {
    date.map(date => (
      setIdplace(date._id),
      setEstabelecimento(date.nome),
      setDescricao(date.descricao),
      setCategoria(date.categoria)
    ))
    setShowLabel(true)
  }

  async function alterarConfirm() {
    let time1fm = ""
    let time2fm = ""
    let time3fm = ""
    let time4fm = ""
    let time5fm = ""
    let time6fm = ""

    if (ss) {
      time1fm = time1f
      time2fm = time2f
    } else {
      time1fm = ""
      time2fm = ""
    }

    if (s) {
      time3fm = time3f
      time4fm = time4f
    } else {
      time3fm = ""
      time4fm = ""
    }

    if (d) {
      time5fm = time5f
      time6fm = time6f
    } else {
      time5fm = ""
      time6fm = ""
    }

    const response = await api.put(`place/update/${idPlace}`, {
      nome: estabelecimento,
      descricao,
      categoria,
      ssh1: time1fm,
      ssh2: time2fm,
      sh1: time3fm,
      sh2: time4fm,
      dh1: time5fm,
      dh2: time6fm,
      lat: selectedPosition.latitude,
      lgt: selectedPosition.longitude
    })

    const {success, error} = response.data
    if(success){
      setMensagem({ msg: 'Alterado com sucesso!', color: 1})
    }else if(error){
     setMensagem({ msg: `Ocorreu um erro: ${error}`, color: 2})
    }

    setShowLabel(false)
    getDate()

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



  return (
    <>
    {timer ?
    <div className="place-container">
       {mensagem&&<Message mensagem={String(mensagem.msg)} color={mensagem.color}/>}
      <div className="place-section-left">

        {date && date.length > 0 ?
          date.map(date => (
            <div className="place-label">
              <div className="place-label-image">
                <img 
                className="place-image"
                src={date.url}/>
              </div>
              <div className="place-label-info">
                <div className="place-label-texto">
                  <p className="place-texto-nome">{date.nome}</p>
                  <p className="place-texto-descricao">{date.descricao}</p>
                  <div className="place-label-categoria">
                  <p className="place-texto-categoria">Categoria: {date.categoria}</p>
                  <p className="place-texto-avaliacao">Avaliação: <span className="place-span-avaliacao">&#9733;{date.avaliacao.toFixed(1)}</span></p>
                  </div>
                </div>
                <div className="place-label-funcionamento">
                  <p className="place-texto-horario">Horario de Funcionamento:</p>
                  {date.ssh1 ? <p className="place-texto-hora">Segunda a sexta: {date.ssh1} as {date.ssh2}</p> : null}
                  {date.sh1 ? <p className="place-texto-hora">Sabados: {date.sh1} as {date.sh2}</p> : null}
                  {date.dh1 ? <p className="place-texto-hora">Segunda a sexta: {date.dh1} as {date.dh2}</p> : null}
                </div>
              </div>
              <button className="place-button" onClick={() => alterar()}>Alterar</button>
            </div>
          ))

          :

          <div className="place-section-left2">
            <p id="place-title">Cadastro de estabelecimento</p>
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
              className="place-inputs"
              placeholder="Nome do estabelecimento"
              maxLength={40}
              onChange={(e) => setEstabelecimento(e.target.value)}
            />
            <input
              className="place-inputs"
              placeholder="Descrição"
              maxLength={90}
              onChange={(e) => setDescricao(e.target.value)}
            />

             <Select
                    placeholder="Categoria"
                    className="product-input-select"
                    value={categoriaValue}
                    onChange={handleCategoria}
                    options={options}
                />

            <div className="place-label-horario">

              <h6>Horário de abertura</h6>

              <div className="place-label-checkbox">

                <div className="place-label-checkbox2">
                  <input type="checkbox" defaultChecked={true} onChange={() => setSs(!ss)} />
                  <p className="place-txt-checkbox">Segunda a sexta</p>
                </div>

                <div className="place-label-checkbox2">
                  <input type="checkbox" onChange={() => setS(!s)} />
                  <p className="place-txt-checkbox">Sabados</p>
                </div>

                <div className="place-label-checkbox2">
                  <input type="checkbox" onChange={() => setD(!d)} />
                  <p className="place-txt-checkbox">Domingos</p>
                </div>
              </div>

              {ss &&
                <div className="place-label-input">
                  <p className="place-horario-texto-input">Horário de segunda a sexta</p>
                  <div className="place-label-input2">
                    <TimePicker
                      className="place-input-time"
                      showSecond={false}
                      onChange={setTime1}
                    />
                    <p>até</p>
                    <TimePicker
                      className="place-input-time"
                      showSecond={false}
                      onChange={setTime2}
                    />
                  </div>
                </div>
              }

              {s &&
                <div className="place-label-input">
                  <p className="place-horario-texto-input">Horário de sabádo</p>
                  <div className="place-label-input2">
                    <TimePicker
                      className="place-input-time"
                      showSecond={false}
                      onChange={setTime3}
                    />
                    <p>até</p>
                    <TimePicker
                      className="place-input-time"
                      showSecond={false}
                      onChange={setTime4}
                    />
                  </div>
                </div>
              }

              {d &&
                <div className="place-label-input">
                  <p className="place-horario-texto-input">Horário de domingo</p>
                  <div className="place-label-input2">
                    <TimePicker
                      className="place-input-time"
                      showSecond={false}
                      onChange={setTime5}
                    />
                    <p>até</p>
                    <TimePicker
                      className="place-input-time"
                      showSecond={false}
                      onChange={setTime6}
                    />
                  </div>
                </div>
              }

            </div>

            <div  className="product-label-map">
                      <p className="product-title-map">Selecione o endereço no mapa</p>
                      {initialPosition.latitude ?
                      <Map id="map" center={[initialPosition.latitude, initialPosition.longitude]} zoom={20} onclick={handleMapClick}>
                          <TileLayer
                              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />

                          {selectedPosition.latitude ? 
                            <Marker position={[selectedPosition.latitude, selectedPosition.longitude]} />
                          :null}
                      </Map>
                      :null}
                    </div>

            <div className="place-label-button-salvar">
            <button onClick={() => salvar()}>Salvar</button>
            </div>

          </div>
          }


      </div>




      <div className="place-section-right">
        {showLabel ?
          <div className="place-section-right2">
            <p id="place-title">Alterar dados</p>

            <input
              className="place-inputs"
              placeholder="Nome do estabelecimento"
              maxLength={40}
              value={estabelecimento}
              onChange={(e) => setEstabelecimento(e.target.value)}
            />
            <input
              className="place-inputs"
              placeholder="Descrição"
              maxLength={90}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

           <Select
                    placeholder="Categoria"
                    className="product-input-select"
                    value={categoriaValue}
                    onChange={handleCategoria}
                    options={options}
                />

            <div className="place-label-horario">

              <h6>Horário de abertura</h6>

              <div className="place-label-checkbox">

                <div className="place-label-checkbox2">
                  <input type="checkbox" defaultChecked={true} onChange={() => setSs(!ss)} />
                  <p className="place-txt-checkbox">Segunda a sexta</p>
                </div>

                <div className="place-label-checkbox2">
                  <input type="checkbox" onChange={() => setS(!s)} />
                  <p className="place-txt-checkbox">Sabados</p>
                </div>

                <div className="place-label-checkbox2">
                  <input type="checkbox" onChange={() => setD(!d)} />
                  <p className="place-txt-checkbox">Domingos</p>
                </div>
              </div>

              {ss &&
                <div className="place-label-input">
                  <p className="place-horario-texto-input">Horário de segunda a sexta</p>
                  <div className="place-label-input2">
                    <TimePicker
                      className="place-input-time"
                      showSecond={false}
                      onChange={setTime1}
                    />
                    <p>até</p>
                    <TimePicker
                      className="place-input-time"
                      showSecond={false}
                      onChange={setTime2}
                    />
                  </div>
                </div>
              }

              {s &&
                <div className="place-label-input">
                  <p className="place-horario-texto-input">Horário de sabádo</p>
                  <div className="place-label-input2">
                    <TimePicker
                      className="place-input-time"
                      showSecond={false}
                      onChange={setTime3}
                    />
                    <p>até</p>
                    <TimePicker
                      className="place-input-time"
                      showSecond={false}
                      onChange={setTime4}
                    />
                  </div>
                </div>
              }

              {d &&
                <div className="place-label-input">
                  <p className="place-horario-texto-input">Horário de domingo</p>
                  <div className="place-label-input2">
                    <TimePicker
                      className="place-input-time"
                      showSecond={false}
                      onChange={setTime5}
                    />
                    <p>até</p>
                    <TimePicker
                      className="place-input-time"
                      showSecond={false}
                      onChange={setTime6}
                    />
                  </div>
                </div>
              }

            </div>

                <div className="product-label-map">
                    <p className="product-title-map">Selecione o endereço no mapa</p>
                      {initialPosition.latitude?
                      <Map id="map" center={[initialPosition.latitude, initialPosition.longitude]} zoom={20} onclick={handleMapClick}>
                          <TileLayer
                              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />

                          {selectedPosition.latitude ? 
                          <Marker position={[selectedPosition.latitude, selectedPosition.longitude]} />
                          :null}
                      </Map>
                      :null}
                    </div>

            <div className="place-label-button-salvar">
              <button onClick={() => alterarConfirm()}>Salvar</button>
            </div>

           

          </div>
          : null}
      </div>

    </div>
    
    :null}
    </>
  )

}

import React, { useState, useEffect } from 'react'

import './styles.css'

interface Params {
    mensagem?: string
    color?: number
}

const Message: React.FC<Params> = (props) => {

    const [show, setShow] = useState<Boolean>(false)

useEffect(() => {
    props.mensagem && 
    setShow(true)
    setTimeout(() => {
        setShow(false)
    }, 4000);
}, [props.mensagem])

    return (
        show && props.color === 1?
        <div className="message-label message-color1">
        <p className="message-title">{props.mensagem}</p>
        </div>
        :
        show && props.color === 2?
        <div className="message-label message-color2">
        <p className="message-title">{props.mensagem}</p>
        </div>
        :null
    )
}

export default Message
import React from "react";
import './Contacto.css'

export default function Contacto(props){
    return(
        <div className="container style">
            <div className="row">
           <div className="col" ><strong>{props.nome} </strong></div>
           <div className="col" >{props.email} </div>
           <div className="col"> {props.telefone}</div>
 <div className="col"><button onClick= {() => 
                {props.apagar ( props.id) }} >Apagar</button>
        </div>
        </div>
        </div>
    )
}
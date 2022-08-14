import React from "react";
import './Contacto.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

//faFileAlt,
faTrashArrowUp
} from "@fortawesome/free-solid-svg-icons";






export default function Contacto(props){
    return(
        <div className="container style">
            <div className="row">
           <div className="col" ><strong>{props.nome} </strong></div>
           <div className="col" >{props.email} </div>
           <div className="col"> {props.telefone}</div>



          {/* <div className="col p-2 text-end">
    <FontAwesomeIcon 
    icon={faFileAlt } 
    className="me-3"
    onClick= {() =>  
    {props.editar ( props.id) }} /></div> */}



 <div className="col p-2 text-end">
    <FontAwesomeIcon 
    icon={faTrashArrowUp } 
    className="me-3"
    onClick= {() =>  
    {props.apagar ( props.id) }} /> 
    
</div>
     

    


      </div>
      </div>             


           

    


                

       


       
        
    )
}
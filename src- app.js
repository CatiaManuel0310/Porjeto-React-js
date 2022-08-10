import React, {useState, useRef} from 'react';
import { v4 as chaveuuid } from 'uuid';
import Contacto from './Components/Contacto';

export default function App() {
//Vamos definir os States e useRef
  const [contacto, setContacto] = useState ({nome:'', telefone:'', email:''})
  const [listaContactos, setListaContactos] = useState([])



  //PARTE DAS FUNÇÕES
  function criarNome(event){
    setContacto({...contacto, nome: event.target.value})
  }
  
  function criarTelefone(event){
    setContacto({...contacto, telefone: event.target.value})
  }

  function criarEmail(event){
    setContacto({...contacto, email: event.target.value})
  }

 function adicionarContacto(){
  //Agora precisamos validar os campos dos contactos
  if (contacto.nome === "" || contacto.email === ""  ||contacto.telefone === "") return

  // Para impedir que os dados se repitam e colocar focus nos inputs
  let replicar= listaContactos.find((contacto.nome === contacto.nome && contacto.email=== contacto.email && contacto.telefone=== contacto.telefone))
  if(typeof replicar ==='undifined') {
    inputTelefone.current.focus()
    inputNome.current.focus()
     inputEmail.current.focus()
    return
  }
  
  const inputTelefone =useRef()
  const inputEmail =useRef()
  const inputNome =useRef()


  //Permite que possomos adicionar novos contactos à lista dos contactos
setListaContactos([...listaContactos, contacto])


//Devemos limpar os campos dos contactos
setContacto({nome: '', email: '', telefone: ''})


 }

 // O QUE DESEJAMOS VER (retornar) NA TELA
 return (
  <>
    <h1>MINHA LISTA DE CONTACTOS</h1>
    <hr/>

     <div>
     <label>NOME:</label>
          <input type="text" ref={inputNome} onChange={criarNome} value= {contacto.nome} />
          </div>


          <div>
          <label>TELEFONE:</label>
          <input type="text" ref={inputTelefone} onChange={criarTelefone} value= {contacto.telefone} />
          </div>


          <div>
          <label>EMAIL:</label>
          <input type="email" ref={inputEmail} onChange={criarEmail} value= {contacto.email} />
          </div>
  

           <button onClick={adicionarContacto}>Adicionar Contacto</button>

         <hr/>
          

        

             
               {listaContactos.map(contacto => { 
                    return <Contacto key={chaveuuid} nome={contacto.nome} email={contacto.email} telefone={contacto.telefone}/>
              })}

              
            
      </>
    )

 }


import React, {useState, useRef, useEffect} from 'react';
import { v4 as chaveuuid } from 'uuid';
import Contacto from './Components/Contacto';

export default function App() {
//Vamos definir os States e useRef/ adicionar um Id
  const [contacto, setContacto] = useState ({id: '', nome:'', telefone:'', email:''})
  const [listaContactos, setListaContactos] = useState([0])


  const inputTelefone =useRef()
  const inputEmail =useRef()
  const inputNome =useRef()

 
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
  let replicar = listaContactos.find((contc) => contc.nome === contacto.nome && contc.email === contacto.email && contc.telefone === contacto.telefone)
  if(typeof replicar !== 'undefined') {
    inputTelefone.current.focus()
    inputNome.current.focus()
     inputEmail.current.focus()
    return
     
  }

//Permite que possamos adicionar novos contactos à lista dos contactos
setListaContactos([...listaContactos, {...contacto, id: chaveuuid()}])
//Devemos limpar os campos dos contactos
setContacto({nome: '', email: '', telefone: ''})
//inputNome.current.focus()

 }



 function TeclaAdicionar(event){
if(event.code ==='Enter'){
  adicionarContacto()
}
 }


//Procure os meus contactos, se encontar adiciona e mantem  na tela 
 useEffect(() =>{
  if(localStorage.getItem('meus_contactos') !== null){
    setListaContactos(JSON.parse(localStorage.getItem('meus_contactos')))
  }
}, [])

 //Guardar os dados para usá-los depois (localStorage)
 useEffect(() => {
  localStorage.setItem('meus_contactos', JSON.stringify(listaContactos))
 },[listaContactos])

 //Quando queremos limpar tudo
 function apagarStorage(){
  setListaContactos([])
 }
 
 //Quando queremos limpar um contacto apenas e apagá-lo no localStorage
 function apagarContacto(id){
 let tep = listaContactos.filter(contc => contc.id !== id) 
 setListaContactos(tep)
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
          <input type="text" ref={inputTelefone} onChange={criarTelefone} onKeyUp={TeclaAdicionar} value= {contacto.telefone} />
          </div>

      

          <div>
          <label>EMAIL:</label>
          <input type="email" ref={inputEmail} onChange={criarEmail} onKeyUp={TeclaAdicionar}  value= {contacto.email} />
          </div>
  

          

           <button onClick={adicionarContacto}>Adicionar Contacto</button>
           <button onClick={apagarStorage}>Apagar Tudo</button>

         <hr/>
          

        
          {/*Mostrar lista dos contactos na tela */}
             
               {listaContactos.map((contc , index)=> { 
                    return <Contacto key={index} id={contc.id} nome={contc.nome} email={contc.email} telefone={contc.telefone} apagar={apagarContacto}/>
              })}

              
            
      </>
    )

 }


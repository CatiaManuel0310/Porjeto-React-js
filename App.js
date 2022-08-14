import React, { useState, useRef, useEffect } from "react";
import { v4 as chaveuuid } from "uuid";
import Contacto from "./Components/Contacto";
import "./App.css";
//Adicionar ícones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faUserPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";




export default function App() {
  //Vamos definir os States e useRef/ adicionar um Id
  const [contacto, setContacto] = useState({
    id: "",
    nome: "",
    telefone: "",
    email: "",
  });
  const [listaContactos, setListaContactos] = useState([0]);

  const inputTelefone = useRef();
  const inputEmail = useRef();
  const inputNome = useRef();

  //PARTE DAS FUNÇÕES
  function criarNome(event) {
    setContacto({ ...contacto, nome: event.target.value });
  }

  function criarTelefone(event) {
    setContacto({ ...contacto, telefone: event.target.value });
  }

  function criarEmail(event) {
    setContacto({ ...contacto, email: event.target.value });
  }

  function adicionarContacto() {
    //Agora precisamos validar os campos dos contactos
    if (
      contacto.nome === "" ||
      contacto.email === "" ||
      contacto.telefone === ""
    )
      return;

  

    //Permite que possamos adicionar novos contactos à lista dos contactos
    setListaContactos([...listaContactos, { ...contacto, id: chaveuuid() }]);
    //Devemos limpar os campos dos contactos
    setContacto({ nome: "", email: "", telefone: "" });
    inputNome.current.focus()
  }

  function TeclaAdicionar(event) {
    if (event.code === "Enter") {
      adicionarContacto();
    }
  }

  //Procure os meus contactos, se encontar adiciona e mantem  na tela
  useEffect(() => {
    if (localStorage.getItem("meus_contactos") !== null) {
      setListaContactos(JSON.parse(localStorage.getItem("meus_contactos")));
    }
  }, []);

  //Guardar os dados para usá-los depois (localStorage)
  useEffect(() => {
    localStorage.setItem("meus_contactos", JSON.stringify(listaContactos));
  }, [listaContactos]);

  //Quando queremos limpar tudo
  function apagarStorage() {
    setListaContactos([]);
  }

  //Quando queremos limpar um contacto apenas e apagá-lo no localStorage
  function apagarContacto(id) {
    let tep = listaContactos.filter((contc) => contc.id !== id);
    setListaContactos(tep);
  }

 


  // O QUE DESEJAMOS VER (retornar) NA TELA
  return (
    <>
      <h1 className="cor-cabeçalho">
        <FontAwesomeIcon icon={faAddressBook} className="me-3" />
        MEUS CONTACTOS
      </h1>

      <div className="container-fluid form">
        <div className="row justify-content-center">
          <div className="col-8 col-sm-6 col-md-4 col-lg-2">
            <div>
              <label className="form-label">NOME:</label>
              <input
                type="text" placeholder="Nome Completo"
                ref={inputNome}
                onChange={criarNome}
                value={contacto.nome}
              />
            </div>

            <div>
              <label className="form-label">TELEF:</label>
              <input
                type="text" placeholder="Digite o telefone válido"
                ref={inputTelefone}
                onChange={criarTelefone}
                onKeyUp={TeclaAdicionar}
                value={contacto.telefone}
              />
            </div>

            <div>
              <label className="form-label">EMAIL:</label>
              <input
                type="email" placeholder="Digite o email válido"
                ref={inputEmail}
                onChange={criarEmail}
                onKeyUp={TeclaAdicionar}
                value={contacto.email} 
              />
            </div>
          </div>
        </div>
      </div>

      
        <div className="botn">
          <button onClick={adicionarContacto}>
            {" "}
            <FontAwesomeIcon 
            icon={faUserPlus} /> <strong>Adicionar</strong>
          </button>

          <button onClick={apagarStorage}>
            <FontAwesomeIcon 
            icon={faTrash} 
            className="me-2" />{" "}
            <strong>Apagar tudo</strong>
            </button>
            
        </div>
        
      

     

      {/*Mostrar lista dos contactos na tela */}

      {listaContactos.map((contc, index) => {
        return (
          <Contacto
            key={index}
            id={contc.id}
            nome={contc.nome}
            email={contc.email}
            telefone={contc.telefone}
            apagar={apagarContacto}
            
          />
        );
      })}
    </>
  );
}

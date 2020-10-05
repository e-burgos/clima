import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  // Guardar valores de ciudad y pais 
  const [ busqueda, guardarBusqueda ] = useState({
    ciudad: '',
    pais: ''
  });
  // Usamos un state para guardar los valores del formulario y pasarlos a la API
  const [ consultar, guardarConsultar ] = useState(false);
  // Usaremos un state para almacenar el resultado que obtenemos de la API, en este caso sera un objeto
  const [ resultado, guardarResultado ] = useState({});
  // Usaremos en state para detectar si hubo un error en la consulta
  const [ error, guardarError ] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {

      if(consultar){
        const appID = '2ec2a3dc426303d938a0e78816a2bdd3';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
        
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);

        // Regresamos el state de consultas a false para poder generar multibles consultas 
        guardarConsultar(false);

        // Detectar si hubo resultados correctos en la consulta 
        if( resultado.cod === "404"){
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    }
    consultarAPI();
    // eslint-disable-next-line
  },[consultar]);
  
  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados" />
  } else {
    componente = <Clima resultado={resultado} />
  }

  return (
    <Fragment>
      <Header 
        titulo='Clima React App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

import React from 'react';
import PropTypes from 'prop-types';

const Clima = ({resultado}) => {

    // Extraemos valores del resultado
    const { name, main } = resultado;

    // Al iniciar la ciudad estara vacia por lo que hay que retornar null
    if(!name){
        return null;
    }

    //La temperatura en esta API esta dada en grados kelvin por lo que la pasaremos a centigrados
    const kelvin = 273.15;

    return ( 
        <div className="card-panel hoverable white col s12">
            <div className="black-text">
                <h2>El clima de {name} es:</h2>
                <h3 className="center-align">
                        { parseFloat( main.temp - kelvin, 10 ).toFixed(2) } <span> &#x2103; </span>
                    </h3>
                <div className="row">
                    <div className="col m6 s6">
                        <p> Max: 
                            { parseFloat( main.temp_max - kelvin, 10 ).toFixed(2) } <span> &#x2103; </span>
                        </p>
                    </div>
                    <div className="col m6 s6">
                        <p> Min: 
                            { parseFloat( main.temp_min - kelvin, 10 ).toFixed(2) } <span> &#x2103; </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    
     );
}

Clima.propTypes = {
    resultado: PropTypes.object.isRequired
}
 
export default Clima;

import { createContext, useState } from "react";
import {obtenerDiferenciaYear, calcularMarca, formatearDinero,  calcularPlan} from '../helpers'

const CotizadorContext = createContext({});

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('');
    const [resultado, setResultado] = useState(0);
    const [cargando, setCargando] = useState(false);

    //Función que se encargará de actualizar el State
    const handleChangeDatos = e => {
        setDatos({
            //Al ser un objeto, tomamos una copia de lo que había antes
            ...datos,
            //reescribe la propiedad con el nuevo objeto
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () => {
        //base
        let resultado = 2000;

        //Diferencia de años frente al actual y el seleccionado
        const diferencia = obtenerDiferenciaYear(datos.year);
        //Calculo de resta del 3% de cada año
        resultado -= ((diferencia * 3) * resultado) / 100;
        //Europeo 30%, Americano 15%, Asiatico 5%
        resultado *= calcularMarca(datos.marca)
        //Básico 20%, Completo 50%
        resultado *= calcularPlan(datos.plan)

        resultado = formatearDinero(resultado)

        setCargando(true);

        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 1500);
        
    }   

    return (
        <CotizadorContext.Provider
        value={{
            datos,
            handleChangeDatos,
            error,
            setError,
            cotizarSeguro,
            resultado,
            cargando
        }}>
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext
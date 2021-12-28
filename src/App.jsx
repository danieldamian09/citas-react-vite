import React, { useState, useEffect } from 'react'
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"
import Paciente from './components/Paciente';

function App() {

  const [pacientes, setPacientes] = useState([]);
  // ?Creamos el estado que nos va a permitir modificar cada uno de los regitros 
  const [paciente, setPaciente] = useState({});

  // !el orden en el cual defino los useEffect es en el que se van a Ejecutar
  useEffect(() => {
    const obtnerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];

      setPacientes(pacientesLS);
    }

    obtnerLS()
  }, [])

  
  // !guardar pacientes en el localStorage (detectar los cambios, es decir sincroniza)
  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
    
  }, [pacientes])


  const eliminarPaciente = id => {
    const pacientesActualizado = pacientes.filter(paciente => paciente.id !== id)
    setPacientes(pacientesActualizado)
  }

  return (
    <div className="container mx-auto mt-20">

      <Header />
      <div className="mt-12 md:flex">

      <Formulario  
        pacientes={pacientes}  
        setPacientes={setPacientes}
        // enviamos el paciente que se va a modificar con el boton editar al formulario
        paciente={paciente}
        setPaciente={setPaciente}
      />

      <ListadoPacientes
        pacientes={pacientes}
        setPaciente={setPaciente}
        eliminarPaciente={eliminarPaciente}
      />

      </div>
    </div>
  )
}

export default App

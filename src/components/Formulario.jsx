import { useState, useEffect } from 'react';
import Error from './Error';
import Paciente from './Paciente';

const Formulario = ({setPacientes, pacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [alta, setAlta] = useState('');
  const [sintomas, setSintomas] = useState('');
  // Estado para el error del formulario
  const [error, setError] = useState(false)

  useEffect(() => {

    // Comprobamos si el objeto tiene algo con el siguiente if
    if(Object.keys(paciente).length > 0){

      // console.log("tenemos paciente")
      // Seteamos cada uno de los valores de los campos del formulario para despues modificarlos con el boton guardar(actualmente esta agregar paciente)
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setAlta(paciente.alta);
      setSintomas(paciente.sintomas);

    }

  }, [paciente])


  // Funcion para generar un ID
  const generarID = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion del formulario
    if([ nombre, propietario, email, alta, sintomas ].includes('')){
      setError(true)
      return;
    }

    setError(false);

    // Crear Objeto Pacientes para guardarlo en el state del componente APP
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      alta,
      sintomas
    }

    //? Si existe en el Objeto de Paciente un ID quiere decir que estamos Editando eso por que este paciente(solo) viene desde nuestro componente APP para ser editado, de lo contario si no esta este atributo ID quiere decir que es un paciente nuevo 
    //? if (paciente.id) {
    //?  console.log("Editando")
    //? }else{
    //?   console.log("Nuevo Registro")
    //? }

    if (paciente.id) {

      //! Editando el registro
      objetoPaciente.id = paciente.id;
      //! Version actualizada del Objeto (PACIENTE) que estamos leyendo del State
      //console.log(objetoPaciente);
      //! Version vieja del Objeto (PACIENTE) que viene de la funcion que esta en el boton editar
      //console.log(paciente)

      //! vamos a recorrer con un map todos los pacientes y vamos a identificar que registro es el que estamos editando con el id
      //! verifico si el id del paciente que esta en mi estado es igual al id del paciente que quiero editar (viene de la funcion del boton editar)
      const pacientesActualizado = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
      setPacientes(pacientesActualizado)
      //! actualizamdos de nuestro estado de paciente(donde esta el que elegimos para modificar) puedes comentar la siguiente linea para validar
      setPaciente({})

    } else {

      //! Nuevo registro genero el ID solo cuando es uno nuevo antes de almacenarlo en el state de todos los pacientes 
      objetoPaciente.id = generarID()
      //! Antes de gurdar nuestro Objeto en el state de APP tenemos que hacer una copia con el Spread Operator, de lo que ya esta en el estado
    setPacientes([...pacientes, objetoPaciente])

    }

    

    // Reiniciar el Formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setAlta('');
    setSintomas('');

  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimientos de Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {' '}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5">

          {/* Mostar el error en caso de que sea true || envie como prop {children} al componente de Error de esta forma puedo enviar mas contenido HTML */}
          {error && <Error><p>Todos los campos son obligatorios</p></Error>}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Masctota</label>

          <input 
            type="text"
            placeholder="Nombre de la Mascota" 
            name="mascota" 
            id="mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={nombre}
            onChange={ (e) => setNombre(e.target.value)}
          />

        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>

          <input 
            type="text"
            placeholder="Nombre del Propietario" 
            name="propietario" 
            id="propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={propietario}
            onChange={ (e) => setPropietario(e.target.value)}
          />

        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>

          <input 
            type="email"
            placeholder="Email Contacto Propietario" 
            name="email" 
            id="email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
          />

        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>

          <input 
            type="date"
            name="alta" 
            id="alta"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={alta}
            onChange={ (e) => setAlta(e.target.value)}
          />

        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas</label>

          <textarea 
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            placeholder="Describe los Síntomas"
            value={sintomas}
            onChange={ (e) => setSintomas(e.target.value)}
          />
        </div>

        <input 
          type="submit" 
          // Operador ternario para determinar que texto le agrego al boton del formulario segun la accion que quiero hacer
          value={paciente.id ? 'Guardar Paciente' : 'Agregar Paciente'}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" 
        />

      </form>
    </div>
  )
}

export default Formulario;


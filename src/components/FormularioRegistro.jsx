
import React, { Component } from 'react';

class FormularioRegistro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      apellido: '',
      curso: 'ingles', // Valor predeterminado: inglés
      meses: 1, // Valor predeterminado: 1 mes
      costoTotal: 25, // Costo por mes
      registros: [], // Estado para almacenar los registros
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  // Función para calcular el costo total con descuento del 10%/20%/27%/37%/53%
  calcularCostoTotal = (meses) => {
    const costoPorMes = 25;

    let costoTotal = costoPorMes * meses;

 
    if (meses >= 2 && meses<=3) {
      costoTotal *= 0.9 ; // Aplicar descuento
      let descuento=10;

    }else if(meses>=4 && meses<=5){
        costoTotal*=0.8;
    }else if(meses>=6 && meses<=7){
        costoTotal*=0.73;
    }else if(meses>=8 && meses<=9){
        costoTotal*=0.63;
    }else if(meses>=10){
        costoTotal*=0.47;

    }

    return costoTotal;
  };


  handleSubmit = (event) => {
    event.preventDefault();
    // Crear un nuevo registro con los datos del formulario
    const nuevoRegistro = {
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      curso: this.state.curso,
      meses: this.state.meses,
      costoTotal: this.calcularCostoTotal(this.state.meses), // Calcular costo con descuento
    };

    // Agregar el nuevo registro al array de registros en el estado
    this.setState((prevState) => ({
      registros: [...prevState.registros, nuevoRegistro],
      nombre: '',
      apellido: '',
      curso: 'ingles',
      meses: 1,
    }));
  };

  render() {
    return (
      <div>
        <h2>Formulario de Registro</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre del Cliente:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={this.state.nombre}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="apellido">Apellido del Cliente:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={this.state.apellido}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="curso">Curso:</label>
            <select
              id="curso"
              name="curso"
              value={this.state.curso}
              onChange={this.handleInputChange}
            >
              <option value="ingles">Inglés</option>
              <option value="frances">Francés</option>
            </select>
          </div>
          <div>
            <label htmlFor="meses">Cantidad de Meses:</label>
            <input
              type="number"
              id="meses"
              name="meses"
              value={this.state.meses}
              onChange={this.handleInputChange}
              min="1"
              required
            />
          </div>
          <div>
            <p>Costo Total: ${this.calcularCostoTotal(this.state.meses)}</p>
          </div>
          <button type="submit">Registrar</button>
        </form>

        {/* Mostrar registros */}
        <h2>Registros</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Curso</th>
              <th>Meses</th>
              <th>Costo Total</th>
            </tr>
          </thead>
          <tbody>
            {this.state.registros.map((registro, index) => (
              <tr key={index}>
                <td>{registro.nombre}</td>
                <td>{registro.apellido}</td>
                <td>{registro.curso}</td>
                <td>{registro.meses}</td>
                <td>${registro.costoTotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FormularioRegistro;

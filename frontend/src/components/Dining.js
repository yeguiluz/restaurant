import React, { Component } from 'react';
import axios from 'axios';

class Dining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: 0,
      list: []
    };
    axios.defaults.baseURL = 'http://localhost:8080';
    this.listPlatos = this.listDining.bind(this);
    this.renderPlatos = this.renderDining.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.renderDining();
    this.listDining();
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    axios
      .post('/dining', this.state)
      .then(res => {
        this.listDining();
        this.setState({name:'',price:0})
      })
      .catch(err => {console.log(err);
        alert('Complete el Formulario');
      });
  }
  listDining(){
    axios
      .get('/dining')
      .then(res => {
        this.setState({ list:res.data });
      })
      .catch(err => {console.log(err);
        alert(JSON.stringify(err));
      });
  }

  renderDining() {
    return (
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {this.state.list.map((item, id) => (
            <tr key={id}>
              <td>{id + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  render() {
    return (
      <div className="container">
          <div className="row" >
            <div className="col-md-6">
              <form onSubmit={this.onSubmit}>
                <fieldset>
                  <legend><h1>Nuevo Plato</h1></legend>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="nombre" className="control-label"> Nombre</label>
                      <input value={this.state.name} onChange={this.onChange} type="text" name="name" className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="number" className="control-label">Precio</label>
                      <input value={this.state.price} onChange={this.onChange} type="number" name="price" className="form-control"/>
                    </div>
                    <div className="from-group">
                      <button type="submit" className="btn btn-primary btn-md">Guardar</button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="col-md-6">
              <div className="row">
                <h1>Menú</h1>
                {this.renderDining()}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Dining;

import React, { Component } from 'react';
import axios from 'axios';

class User extends Component {
  constructor(props) {
    super(props);
    this.state={
      name: '',
      password: '',
      email: '',
      rol: ''
    };
  axios.defaults.baseURL='http://localhost:8080';
  this.onChange= this.onChange.bind(this);
  this.onSubmit= this.onSubmit.bind(this);
  }

  componentWillMount() {}

  onChange(e) {
    const name= e.target.name;
    const value= e.target.value;
    this.setState({ [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    axios
      .post('/user', this.state)
      .then(res => {
        alert('Usuario registrado');
        this.props.history.push('/users');
      })
      .catch(err => {
        console.log(err);
        alert(err);
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="col-sm-10">
              <form >
                <fieldset>
                  <legend><h1>Nuevo Usuario</h1></legend>
                  <div className="form-group">
                    <label htmlFor="name" className="control-label">Nombre de Usuario</label>
                    <input value={this.state.name} onChange={this.onChange} type="text" name="name" className="form-control"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="control-label">Email</label>
                    <input value={this.state.email} onChange={this.onChange} type="text" name="email" className="form-control"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="control-label">Password</label>
                    <input value={this.state.password} onChange={this.onChange} name="password" type="password" className="form-control"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="rol" className="control-label">Rol</label>
                    <select className="form-control" name="rol" id="sel1" onChange={this.onChange} value={this.state.rol}>
                      <option value="default" disabled>Seleccione un Rol</option>
                      <option value="adm">Administrador</option>
                      <option value="chf">Chef</option>
                      <option value="caj">Cajero</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <a href="#" onClick={this.onSubmit} className="btn btn-primary btn-md"> Guardar Orden</a>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default User;

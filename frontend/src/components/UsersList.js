import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  constructor(props) {
   super(props);

   this.state = {
     users: []
   };
   this.fetchUsers = this.fetchUsers.bind(this);
   axios.defaults.baseURL = 'http://localhost:8080';
 }
componentWillMount(){
   this.fetchUsers();
}
fetchUsers() {
  axios
    .get('/user')
    .then(results => {
      this.setState({ users: results.data });
    })
    .catch(error => console.log(error));
}


renderUsers() {
  if (this.state.users) {
    return (
      <table className="table table-hover table-striped">
        <caption />
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map((item, id) => {
            return (
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <span className={(() => {
                    switch (item.rol) {
                      case "adm":   return "badge badge-primary";
                      case "chf":   return "badge badge-warning";
                      default:    return "badge badge-success";
                    }
                  })()}>
                    {(() => {
                      switch (item.rol) {
                        case "adm":   return "Administrador";
                        case "chf":   return "Chef";
                        default:    return "Cajero";
                      }
                    })()}
                  </span>
                </td>
                <td>
                  <a href={this.props.location.pathname + "/" + item._id} className="btn btn-success btn-sm">Ver</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-right">
            <a href="users/create" className="btn btn-primary">Nuevo Usuario</a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1>Usuarios</h1>
            {this.renderUsers()}
          </div>
        </div>
      </div>
    );
  }
}
export default Users ;

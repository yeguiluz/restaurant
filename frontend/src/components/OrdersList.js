import React, { Component } from 'react';
import Moment from 'react-moment'
import 'moment-timezone';
import axios from 'axios';

class Orders extends Component {
  constructor(props) {
   super(props);

   this.state = {
     orders: []
   };
   this.fetchOrders = this.fetchOrders.bind(this);
   axios.defaults.baseURL = 'http://localhost:8080';
 }
componentWillMount(){
   this.fetchOrders();
}
fetchOrders() {
  axios
    .get('/orders')
    .then(results => {
      this.setState({ orders: results.data });
      console.dir(this.state.orders);
    })
    .catch(error => console.log(error));
}

statusChange(id,status){
  var setStatus= 'p'
  if(status==='p'){
    setStatus= 't';
  }

  axios
    .post('/orders/'+id+'/'+setStatus)
    .then(results => {
        this.fetchOrders();
        this.renderOrders();
      }
    ).catch(error => console.log(error));

}

renderOrders() {
  if (this.state.orders) {
    return (
      <table className="table table-hover table-striped">
        <caption />
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Fecha y Hora</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.state.orders.map((item, id) => {
            return (
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{item.client}</td>
                <td><Moment format="DD-MM-YYYY hh:mm">{item.date}</Moment></td>
                <td>
                  <span className={(() => {
                    switch (item.status) {
                      case "p":   return "badge badge-primary";
                      default:    return "badge badge-warning";
                    }
                  })()}>
                    {(() => {
                      switch (item.status) {
                        case "p":   return "En Proceso";
                        default:    return "Comanda";
                      }
                    })()}
                  </span>
                </td>
                <td>
                  <a href={this.props.location.pathname + "/" + item._id} className="btn btn-success btn-sm">Ver</a>
                  <a href="#"
                  onClick={()=>this.statusChange(item._id,item.status)}
                  className={(() => {
                    switch (item.status) {
                      case "p":   return "btn btn-danger btn-sm btn-status";
                      default:    return "btn btn-primary btn-sm btn-status";
                    }
                  })()}>
                  {(() => {
                    switch (item.status) {
                      case "p":   return "Terminar";
                      default:    return "Procesar";
                    }
                  })()}</a>
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
            <a href="orders/create" className="btn btn-primary">Nueva Orden</a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1>Lista de Ordenes pendientes</h1>
            {this.renderOrders()}
          </div>
        </div>
      </div>
    );
  }
}
export default Orders ;

import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios';

class Order extends Component {
  constructor(props) {
   super(props);

   this.state = {
     order: [],
     detail:[]
   };
   axios.defaults.baseURL = 'http://localhost:8080';
 }
 componentWillMount() {
   axios
     .get(`/orders/${this.props.match.params.id}`)
     .then(order=> {
       this.setState({ order: order.data, detail: order.data.dining });
     })
     .catch(error=> console.log(error));
   this.renderOrder();
 }

renderOrder() {
if (this.state.order) {
  return (
    <table className="table table-hover table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Plato</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {this.state.detail.map((item, id) => {
          return (
            <tr key={id}>
              <td>{id + 1}</td>
              <td>{item.name}</td>
              <td>{item.price} soles</td>
            </tr>
          );
        })}
      </tbody>
    </table>);
}
}
  render() {
    return (
      <div className="container" >
        <div className="row" >
          <div className="col-md-6">
            <div className="card mb3">
              <h3 class="card-header">Detalle de Orden</h3>
              <div class="card-body">
                <h5 class="card-title"><strong>Cliente: </strong>{this.state.order.client}</h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Status:&nbsp;</strong>
                  <span className={(() => {
                    switch (this.state.order.status) {
                      case "p":   return "badge badge-primary";
                      default:    return "badge badge-warning";
                    }
                  })()}>
                  {(() => {
                    switch (this.state.order.status) {
                      case "p":   return "En Proceso";
                      default:    return "Comanda";
                    }
                  })()}
                </span>
                </li>
                <li class="list-group-item"><strong>Forma de Pago:&nbsp;</strong>
                  <span className="badge badge-pill badge-dark">
                    {(() => {
                    switch (this.state.order.payment) {
                      case "E":   return "Efectivo";
                      default:    return "Tarjeta";
                    }
                    })()}
                  </span>
                </li>
                <li class="list-group-item"><strong>Fecha:</strong> <Moment format="DD-MM-YYYY HH:mm">{this.state.order.date}</Moment></li>
                <li class="list-group-item"><strong>Total:</strong> {this.state.order.total} Soles</li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <h3>Pedido</h3>
            {this.renderOrder()}
          </div>
        </div>
        <div>
          <p>&nbsp;</p>
          <a className="btn btn-primary" href="/orders">Volver</a>
        </div>
      </div>
    );
  }
}
export default Order ;

import React, { Component } from 'react';
import axios from 'axios';

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      dining: [],
      list:[],
      client: '',
      payment: 'E',
      Total: 0,
      menu: ''
    };

    axios.defaults.baseURL='http://localhost:8080';

    this.onChange= this.onChange.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
    this.addDining= this.addDining.bind(this);
  }

  componentWillMount() {
      axios
        .get('/dining')
        .then(res=> {
          this.setState({ list:res.data });
        })
        .catch(err => {console.log(err);
          alert(JSON.stringify(err));
        });
  }

  onChange(e) {
    const name= e.target.name;
    const value= e.target.value;
    this.setState({ [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    axios
      .post('/orders', this.state)
      .then(res => {
        alert('Orden generada');
        this.props.history.push('/orders');
      })
      .catch(err => console.log(err));
  }

  addDining(){
    let dining = this.state.dining;
    let Total = this.state.Total;
    let obj = JSON.parse(document.getElementById('sel2').value);
    dining.push(obj);
    Total += parseInt(obj.price,10);
    this.setState({ dining, Total });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="col-sm-10">
              <form onSubmit={this.onSubmit}>
                <fieldset>
                  <legend><h1>Nueva Orden</h1></legend>
                  <div className="form-group">
                    <label htmlFor="cliente" className="control-label">Cliente</label>
                    <input value={this.state.client} onChange={this.onChange} type="text" name="client" className="form-control"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="payment" className="control-label">Tipo de Pago</label>
                    <select className="form-control" name="payment" id="sel1" onChange={this.onChange} value={this.state.payment}>
                      <option value="default" disabled>Elije forma de pago</option>
                      <option value="E">Efectivo</option>
                      <option value="T">Tarjeta</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="menu" className="control-label">Menu</label>
                    <select className="form-control" name="menu" id="sel2" onChange={this.onChange}>
                        <option value="default" disabled> Elija un plato del Menú</option>
                        {this.state.list.map((item, id) => (
                          <option value={JSON.stringify(item)}>{item.name}</option>
                        ))}
                    </select>
                    <a href="#" className="btn btn-default" onClick={this.addDining}>Agregar al pedido</a>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-md"> Guardar Orden</button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-12">
                <h1>Pedido</h1>
                <table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Plato</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.dining.map((item, id) => (
                      <tr key={id}>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="form-group">
                  <input type="text" value={this.state.Total} Soles></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default OrderPage;

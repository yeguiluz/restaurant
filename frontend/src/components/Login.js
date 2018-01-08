import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
   super(props);
   this.state = {
     email: '',
     password: '',
     rol: '',
     name:'',
     login: false
   };
   this.onSubmit = this.onSubmit.bind(this);
   this.onChange = this.onChange.bind(this);
   this.onBlur = this.onBlur.bind(this);
   axios.defaults.baseURL = 'http://localhost:8080';
 }

componentWillMount(){}

onSubmit(){
  axios.post('/login', {
    email: this.state.email,
    password: this.state.password
  }).then(response=> {
    this.setState({login:true});
    this.props.history.push('/home');
  }).catch(error => {
    this.setState({ login:false });
    return console.log(error);
  });
}

onChange(e){
  const name = e.target.name;
  const value = e.target.value;
  this.setState({ [name]:value});
}
onBlur(){
  var validate= this.state.email.toLowerCase();
  if (validate){
    if(validate.indexOf('tekton')<1)
    {
      alert('Email no pertenece a la empresa');
      return false
    }
  }
  this.onSubmit();
}
render() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <form>
            <fieldset>
              <legend>Iniciar Sesión</legend>
              <div className="form-group">
                <label htmlFor="email" className="control-label">Email</label>
                <input value={this.state.email} onChange={this.onChange} type="text" name="email" className="form-control"/>
              </div>
              <div className="form-group">
                <label htmlFor="password" className="control-label">Password</label>
                <input value={this.state.password} type="password" name="password" className="form-control" onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <a href="#" onClick={this.onBlur} className="btn btn-primary">Entrar</a>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
    );
  }
}
export default Login ;

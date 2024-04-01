import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MenuLogged from './MenuLogged';
import Welcome from './Welcome';
import { setToken } from './hooks/useAuth'

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  handleSubmit(event) {
    axios.post(
      'http://127.0.0.1:9000/api/v2/login/',
      {
        username: this.state.username,
        password: this.state.password,
      }
    ).then(
      res => {
        //alert('Successfully logged in.');
        setToken(res.data.token);
        ReactDOM.render(<MenuLogged />, document.getElementById('menu'));
        ReactDOM.render(<Welcome />, document.getElementById('root'));
      }
    ).catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        alert('Error while logging in.')
      }
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <table>
          <tbody>
            <tr>
              <td>Usuario: </td>
              <td><input type="text" name="username" value={this.state.username} onChange={this.handleChange} /></td>
            </tr>
            <tr>
              <td>Password: </td>
              <td><input type="password" name="password" value={this.state.password} onChange={this.handleChange} /></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td><input type="submit" name="submit" value="Ingresar" /></td>
            </tr>
          </tbody>
        </table>
      </form>
    )
  }

}

ReactDOM.render(
  <Login />,
  document.getElementById('root')
);

export default Login
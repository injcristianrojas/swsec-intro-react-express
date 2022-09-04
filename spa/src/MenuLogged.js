import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu';
import Login from './Login';

class MenuLogged extends React.Component {

  render() {
    return (
      <ul>
        <li><a title="Home" id="home" href="# " onClick={this.Home}>Home</a></li><li>|</li>
        <li><a title="Muro" id="wall" href="# ">Muro</a></li><li>|</li>
        <li><a title="Salir" id="exit" href="# " onClick={this.Exit}>Salir</a></li>
      </ul>
    )
  }

  Home() {
    ReactDOM.render(<Menu />, document.getElementById('menu'));
    ReactDOM.render(<Login />, document.getElementById('root'));
  }
 
  Exit() {
    localStorage.removeItem('jwttoken');
    ReactDOM.render(<Menu />, document.getElementById('menu'));
    ReactDOM.render(<Login />, document.getElementById('root'));
  }

}

export default MenuLogged
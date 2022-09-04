import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu';

class MenuLogged extends React.Component {

  render() {
    return (
      <ul>
        <li><a title="Home" id="home" href="/">Home</a></li><li>|</li>
        <li><a title="Saludos" id="hello" href="# ">Saludos</a></li><li>|</li>
        <li><a title="Muro" id="wall" href="# ">Muro</a></li><li>|</li>
        <li><a title="Salir" id="exit" href="# " onClick={this.processExit}>Salir</a></li>
      </ul>
    )
  }
 
  processExit() {
    ReactDOM.render(<Menu />, document.getElementById('menu'));
  }

}

export default MenuLogged
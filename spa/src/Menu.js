import React from 'react';
import ReactDOM from 'react-dom';

class Menu extends React.Component {

  render() {
    return (
      <ul>
        <li><a title="Home" id="home" href="/">Home</a></li>
      </ul>
    )
  }

}

ReactDOM.render(
  <Menu />,
  document.getElementById('menu')
);

export default Menu
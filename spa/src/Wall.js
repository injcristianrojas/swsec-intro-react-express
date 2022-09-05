// Source: https://reactjs.org/docs/faq-ajax.html
import React from 'react';

class Wall extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      messages: []
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('jwttoken');
    fetch('http://127.0.0.1:9000/api/messages', { method: "GET", headers: { "Authorization": `Bearer ${token}` } })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            messages: result.data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

  }

  render() {
    const { error, isLoaded, messages } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <table>
          <th>Mensajes</th>
          {messages.map(message => (
            <tr>
              <td key={message.id}>
                {message.message}
              </td>
            </tr>
          ))}
        </table>
      )
    }
  }

}

export default Wall
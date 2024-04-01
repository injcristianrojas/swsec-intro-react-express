// Source: https://reactjs.org/docs/faq-ajax.html
import React from 'react';
import axios from 'axios';
import { getToken } from './hooks/useAuth'

class Wall extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      messages: [],
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit(event) {
    let token = getToken();
    axios.post(
      'http://127.0.0.1:9000/api/v2/messages/new',
      {
        'message': this.state.message
      },
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    ).then(
      res => {
        this.setState(
          { messages: res.data.data, message: '' },
          () => console.log(this.state)
        );
      }
    ).catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      }
    });
    event.preventDefault();
  }


  componentDidMount() {
    let token = getToken();
    fetch('http://127.0.0.1:9000/api/v2/messages', { method: "GET", headers: { "Authorization": `Bearer ${token}` } })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            messages: result.data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  render() {
    const { error, messages } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.message} onChange={this.handleChange} />
            <input type="submit" value="Postear" />
          </form>
          <table>
            <thead>
              <tr>
                <th>Mensajes</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(message => (
                <tr key={message.id}>
                  <td
                    dangerouslySetInnerHTML={{ __html: message.message }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }

}

export default Wall
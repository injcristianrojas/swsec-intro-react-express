// Source: https://reactjs.org/docs/faq-ajax.html
import React from 'react';
import { getToken } from './hooks/useAuth'

class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: []
    };
  }

  componentDidMount() {
    let token = getToken();
    fetch('http://127.0.0.1:9000/api/v2/users/type/2', { method: "GET", headers: { "Authorization": `Bearer ${token}` } })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result.data
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
    const { error, isLoaded, users } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <table>
          <thead>
            <tr>
              <th>Usuarios</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  {user.username}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  }

}

export default Users
// Source: https://reactjs.org/docs/faq-ajax.html
import React from 'react';

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
    let token = localStorage.getItem('jwttoken');
    fetch('http://127.0.0.1:9000/api/users/type/2', { method: "GET", headers: { "Authorization": `Bearer ${token}` } })
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
          <th>Usuarios</th>
          {users.map(user => (
            <tr>
              <td key={user.id}>
                {user.username}
              </td>
            </tr>
          ))}
        </table>
      )
    }
  }

}

export default Users
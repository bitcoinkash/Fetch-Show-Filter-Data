import React, { useEffect, useState } from 'react';
import './App.scss';
import User from './components/user.jsx';

function App() {
  const url = "https://randomuser.me/api/?inc=name,picture&results=100";
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userElements, setUserElements] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setUsers(data.results);
        setUserElements(createUserElements(data.results));
      })
      .catch(error => console.log(error));
  }, []);

  const createUserElements = (userList) => {
    return userList.map((user, index) => (
      <div key={index} className="col-2">
        <div className="user">
          <img src={user.picture.medium} alt={`${user.name.first} ${user.name.last}`} />
          <h3>{`${user.name.first} ${user.name.last}`}</h3>
        </div>
      </div>
    ));
  };

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Filter users based on search term
    const filteredUsers = users.filter(user =>
      `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the userElements state with filtered users
    setUserElements(createUserElements(filteredUsers));
  }, [searchTerm, users]);

  return (
    <div id="app">
      <h1>List of users</h1>
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Type to filter"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="users">
          <div className="row">{userElements}</div>
        </div>
      </div>
    </div>
  );
}

export default App;

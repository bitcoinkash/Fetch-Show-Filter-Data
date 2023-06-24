import React from 'react';

const User = (props) => {
  const { name, picture } = props;

  return (
    <div className="user">
      <img src={picture} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default User;

import React from 'react';

function UserInputs (props) {
  const { databaseName, databaseId, matcher, onChange, handleClick } = props;

  return (
    <div className="user-inputs">
      <input name="databaseName" value={databaseName} onChange={onChange}  />
      <input name="databaseId" value={databaseId} onChange={onChange} />
      <input name="matcher" value={matcher} onChange={onChange} />
      <button onClick={handleClick} >
        Get
      </button>
    </div>
  );
}

export default UserInputs;
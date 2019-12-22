import React from 'react';

function UserInputs (props) {
  const { databaseName, databaseId, matcher, onChange, handleClick } = props;

  return (
    <div className="user-input-container">
      <div className="user-input">
        <input name="databaseName" value={databaseName} onChange={onChange}  />
      </div>
      <div className="user-input">
        <input name="databaseId" value={databaseId} onChange={onChange} />
      </div>
      <div className="user-input">
        <input name="matcher" value={matcher} onChange={onChange} />
      </div>
      <button onClick={handleClick} >
        GO!
      </button>
    </div>
  );
}

export default UserInputs;
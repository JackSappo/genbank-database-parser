import React from 'react';

function UserInputs (props) {
  const { databaseName, databaseId, matcher, onChange, handleClick, errorText, loading } = props;

  return (
    <div id="main">
      <div className="user-input-container">
        <UserInputRow label="Database" name="databaseName" value={databaseName} onChange={onChange}/>
        <UserInputRow label="ID" name="databaseId" value={databaseId} onChange={onChange}/>
        <UserInputRow label="Regex Matcher" name="matcher" value={matcher} onChange={onChange}/>
        <div className="button-container">
          <button disabled={loading} onClick={handleClick} >
            GO!
          </button>
        </div>
        <div className="error-container">
          {errorText}
        </div>
      </div>
    </div>
  );
}

function UserInputRow(props) {
  return (
    <div className="user-input-row">
      <div className="user-input-label">
        {props.label}
      </div>
      <div className="user-input">
        <input name={props.name} value={props.value} onChange={props.onChange}  />
      </div>
    </div>
  )
}

export default UserInputs;
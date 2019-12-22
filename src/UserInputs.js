import React from 'react';

function UserInputs (props) {
  const { databaseName, databaseId, matcher, onChange, handleClick } = props;

  return (
    <div className="main">
    <div className="user-input-container">
      <table>
        <tr>
          <td>
            Database
          </td>
          <td>
            <div className="user-input">
              <input name="databaseName" value={databaseName} onChange={onChange}  />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            ID
          </td>
          <td>
            <div className="user-input">
              <input name="databaseId" value={databaseId} onChange={onChange} />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            Regex Matcher
          </td>
          <td>
            <div className="user-input">
              <input name="matcher" value={matcher} onChange={onChange} />
            </div>
          </td>
        </tr>
      </table>
      <button onClick={handleClick} >
        GO!
      </button>
    </div>
    </div>
  );
}

export default UserInputs;
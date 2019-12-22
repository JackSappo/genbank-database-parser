import React from 'react';

function UserInputs (props) {
  const { databaseName, databaseId, matcher, onChange, handleClick, errorText, loading } = props;

  return (
    <div id="main">
      <div className="user-input-container">
        <table>
          <tbody>
            <tr>
              <td className="label">
                Database
              </td>
              <td>
                <div className="user-input">
                  <input name="databaseName" value={databaseName} onChange={onChange}  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="label">
                ID
              </td>
              <td>
                <div className="user-input">
                  <input name="databaseId" value={databaseId} onChange={onChange} />
                </div>
              </td>
            </tr>
            <tr>
              <td className="label">
                Regex Matcher
              </td>
              <td>
                <div className="user-input">
                  <input name="matcher" value={matcher} onChange={onChange} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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

export default UserInputs;
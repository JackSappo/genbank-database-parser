export function validateUserParams(state) {
  const { databaseName, databaseId, matcher } = state;

  let missingParams = [];

  if (!databaseName) missingParams.push('Database');
  if (!databaseId) missingParams.push('ID');
  if (!matcher) missingParams.push('Regex Matcher');

  if (missingParams.length) {
    return 'Missing required params: ' + missingParams.join(', ');
  }

  try {
    new RegExp(matcher);
  } catch (e) {
    return 'Invalid RegEx';
  }
}

export function parseError(err, databaseName, databaseId) {
  try {
    const { data } = err.response;

    if (data.includes('Failed to understand id')) {
      return `ID ${databaseId} not found in database "${databaseName}"`;
    } else if (data.match(/Database.* is not supported/)) {
      return `Database "${databaseName}" is not supported`;
    } else {
      return 'An unknown error occurred when fetching data';
    }
  } catch (e) {
    return `An unknown error occurred when parsing error: "${e.message}"`;
  }
}

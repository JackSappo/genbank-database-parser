export function validateUserParams(state) {
  const { databaseName, databaseId, matcher } = state;

  let missingParams = []

  if (!databaseName) missingParams.push('Database');
  if (!databaseId) missingParams.push('ID');
  if (!matcher) missingParams.push('Regex Matcher');

  if (missingParams.length) {
    return 'Missing required params: ' + missingParams.join(', ');
  }

  try {
    new RegExp(matcher)
  } catch (e) {
    return 'Invalid RegEx'
  }
}
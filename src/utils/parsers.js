export function getMatchesFromData(data, matcher) {
  const dataString = parse(data);
  const reg = new RegExp(matcher, 'g');
  const matches = []

  let nextMatch = reg.exec(dataString);
  while (nextMatch) {
    matches.push({
      value: nextMatch[0],
      start: reg.lastIndex - nextMatch[0].length + 1,
      end: reg.lastIndex
    });
    
    nextMatch = reg.exec(dataString);
  }

  return matches;
}

export function getMatchCountsFromMatches(matches) {
  return matches.reduce((accum, next) => {
    const currValue = accum[next.value]
    accum[next.value] = currValue ? currValue + 1 : 1

    return accum;
  }, {})
}

export function parseError(err, databaseName, databaseId) {
  try {
    const { data } = err.response
  
    if (data.includes('Failed to understand id')) {
      return `ID ${databaseId} not found in database "${databaseName}"`
    } else if (data.match(/Database.* is not supported/)) {
      return `Database "${databaseName}" is not supported`;
    } else {
      return 'An unknown error occurred when fetching data'
    }
  } catch (e) {
    return `An unknown error occurred when parsing error: "${e.message}"`;
  }
}

function parse(data) {
  return data.match(/<TSeq_sequence>(.*)<\/TSeq_sequence>/)[1]
}
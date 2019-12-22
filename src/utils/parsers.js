export function getMatchesFromData(data, matcher) {
  const dataString = parseData(data);
  const reg = new RegExp(matcher, 'g');
  const matches = [];

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
    const currValue = accum[next.value];
    accum[next.value] = currValue ? currValue + 1 : 1;

    return accum;
  }, {});
}

function parseData(data) {
  return data.match(/<TSeq_sequence>(.*)<\/TSeq_sequence>/)[1];
}

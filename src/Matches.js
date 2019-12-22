import React from 'react';

function Matches (props) {
  const { matches } = props;

  // if (!matches || !matches.length) {
  //   return (
  //     <div className="matches">
  //       No matches!
  //     </div>
  //   )
  // }

  return (
    <div className="matches">
      <MatchRowHeader />
      {matches.map((match, i) => <MatchRow match={match} key={i} /> )}
    </div>
  );
}

function MatchRowHeader() {
  return (
    <div className="match-row row-header">
      <div>Value</div>
      <div>S. Index</div>
      <div>E. Index</div>
    </div>
  );
}

function MatchRow({match, key}) {
  return (
    <div className="match-row" key={key}>
      <div>{match.value}</div>  
      <div>{match.start}</div>
      <div>{match.end}</div>
    </div>
  )
}

export default Matches;
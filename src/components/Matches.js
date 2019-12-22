import React from 'react';

function Matches(props) {
  const { matches } = props;

  return (
    <div className="matches">
      <MatchRowHeader />
      {
        matches && matches.length 
          ? matches.map((match, i) => <MatchRow match={match} key={i} />)
          : <EmptyRow />
      }
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

function MatchRow({ match }) {
  return (
    <div className="match-row">
      <div>{match.value}</div>
      <div>{match.start}</div>
      <div>{match.end}</div>
    </div>
  );
}

function EmptyRow() {
  return <div className="match-row empty">No matches found!</div>;
}

export default Matches;

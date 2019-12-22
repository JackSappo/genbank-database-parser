import React from 'react';

function MatchCounts (props) {
  const { matchCounts } = props;

  return (
    <div className="match-counts">
      {Object.keys(matchCounts).map((key, i) => (
        <div key={i}>
          {key} {matchCounts[key]}
        </div>
      ))}
    </div>
  );
}

export default MatchCounts;
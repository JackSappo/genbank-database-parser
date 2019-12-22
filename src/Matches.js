import React from 'react';

function Matches (props) {
  const { matches } = props;

  return (
    <div className="matches">
      {matches.map((match, i) => (
        <div className="match" key={i}>
          {match.value} {match.start} {match.end}
        </div>
      ))}
    </div>
  );
}

export default Matches;
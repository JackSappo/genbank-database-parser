import React from 'react';

function MatchCounts (props) {
  const { matchCounts } = props;

  return (
    <div className="match-counts">
      <MatchCountRowHeader />
      {Object.keys(matchCounts).map((key, i) => 
        <MatchCountRow value={key} count={matchCounts[key]} key={i} />
      )}
    </div>
  );
}

function MatchCountRowHeader() {
  return (
    <div className="match-row row-header">
      <div>Value</div>
      <div>Count</div>
    </div>
  );
}

function MatchCountRow({value, count, key}) {
  return (
    <div className="match-counts-row" key={key}>
      <div>{value}</div>
      <div>{count}</div>
    </div>
  )
}

export default MatchCounts;
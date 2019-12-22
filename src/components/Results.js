import React from 'react';
import Matches from './Matches';
import MatchCounts from './MatchCounts';
import Loader from './Loader';

function Results(props) {
  return (
    <div id="results">
      <Matches matches={props.matches} />
      <MatchCounts matchCounts={props.matchCounts} />
      {props.loading ? <Loader /> : null}
    </div>
  );
}

export default Results;

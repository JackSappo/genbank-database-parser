import React, { Component } from 'react';
import axios from 'axios';
import UserInputs from './UserInputs'
import Matches from './Matches'
import MatchCounts from './MatchCounts'
import { getMatchesFromData, getMatchCountsFromMatches } from './utils/parsers';
import './App.css';

const NCBI_URL = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi';

class App extends Component {
  constructor() {
    super();
    this.state = {
      databaseName: 'nucleotide',
      databaseId: '30271926',
      matcher: 'ATAT.AGG',
      matches: [],
      matchCounts: []
    }
  }

  handleClick = () => {
    const url = buildNcbiUrl(this.state.databaseName, this.state.databaseId)

    axios.get(url)
      .then(({data}) => {
        const matches = getMatchesFromData(data, this.state.matcher);
        const matchCounts = getMatchCountsFromMatches(matches);

        this.setState({
          matches,
          matchCounts
        })
      })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <UserInputs 
          databaseName={this.state.databaseName}
          databaseId={this.state.databaseId}
          matcher={this.state.matcher}
          onChange={this.onChange}
          handleClick={this.handleClick}
        />

        <br/>
        <Matches matches={this.state.matches} />

        <br/>
        <MatchCounts matchCounts={this.state.matchCounts} />
      </div>
    );
  }
}


function buildNcbiUrl(databaseName, databaseId) {
  return `${NCBI_URL}?db=${databaseName}&id=${databaseId}&rettype=fasta&retmode=xml`
}

export default App;

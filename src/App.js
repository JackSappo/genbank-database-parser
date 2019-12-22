import React, { Component } from 'react';
import axios from 'axios';
import UserInputs from './UserInputs'
import Results from './Results'
import NCBICache from './utils/NCBICache'
import { getMatchesFromData, getMatchCountsFromMatches, parseError } from './utils/parsers';
import './App.css';

const NCBI_URL = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi';

class App extends Component {
  constructor() {
    super();
    this._cache = new NCBICache();
    this.state = {
      loading: false,
      databaseName: 'nucleotide',
      databaseId: '30271926',
      matcher: 'ATAT.AGG',
      matches: [],
      matchCounts: [],
      errorText: ''
    }
  }

  handleClick = () => {
    const { databaseName, databaseId } = this.state;

    const cachedValue = this._cache.get(databaseName, databaseId)
    
    const dataPromise = cachedValue 
      ? Promise.resolve({ data: cachedValue })
      : axios.get(buildNcbiUrl(databaseName, databaseId));

    this.setState({ loading: true }, () => {
      dataPromise.then(({data}) => {
        if (!cachedValue) {
          this._cache.set(databaseName, databaseId, data)
        }

        const matches = getMatchesFromData(data, this.state.matcher);
        const matchCounts = getMatchCountsFromMatches(matches);

        this.setState({
          loading: false,
          matches,
          matchCounts,
          errorText: ''
        })
      }).catch(err => {
        this.setState({
          errorText: parseError(err, databaseName, databaseId),
          loading: false
        })
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
          errorText={this.state.errorText}
        />
        <Results 
          matches={this.state.matches}
          matchCounts={this.state.matchCounts}
          loading={this.state.loading}
        />
      </div>
    );
  }
}


function buildNcbiUrl(databaseName, databaseId) {
  return `${NCBI_URL}?db=${databaseName}&id=${databaseId}&rettype=fasta&retmode=xml`
}

export default App;

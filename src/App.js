import React, { Component } from 'react';
import axios from 'axios';
import UserInputs from './UserInputs'
import Matches from './Matches'
import MatchCounts from './MatchCounts'
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
        const dataString = parse(data);
        const reg = new RegExp(this.state.matcher, 'g');
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

        console.log('~= MATCHES', matches)

        const matchCounts = matches.reduce((accum, next) => {
          const currValue = accum[next.value]
          accum[next.value] = currValue ? currValue + 1 : 1

          return accum;
        }, {})

        console.log('~= MATCHCOUNTS', matchCounts)
    
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

function parse(data) {
  // TODO: Better than regex
  return data.match(/<TSeq_sequence>(.*)<\/TSeq_sequence>/)[1]
}

function buildNcbiUrl(databaseName, databaseId) {
  return `${NCBI_URL}?db=${databaseName}&id=${databaseId}&rettype=fasta&retmode=xml`
}

export default App;

import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const NCBI_URL = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // TODO: hardcoded
      databaseName: 'nucleotide',
      databaseId: '30271926',
      matcher: 'ATAT.AGG',
      matches: [],
      matchesCount: []
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

        const matchesCount = matches.reduce((accum, next) => {
          const currValue = accum[next.value]
          accum[next.value] = currValue ? currValue + 1 : 1

          return accum;
        }, {})

        console.log('~= MATCHESCOUNT', matchesCount)
    
        this.setState({
          matches,
          matchesCount
        })
      })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { matches, matchesCount } = this.state;

    return (
      <div className="App">
        <input name="databaseName" value={this.state.databaseName} onChange={this.onChange}  />
        <input name="databaseId" value={this.state.databaseId} onChange={this.onChange} />
        <input name="matcher" value={this.state.matcher} onChange={this.onChange} />
        <button onClick={this.handleClick} >
          Get
        </button>

        <br/><br/>

        {matches.map((match, i) => (
          <div key={i}>
            {match.value} {match.start} {match.end}
          </div>
        ))}

        <br/>

        {Object.keys(matchesCount).map((key, i) => (
          <div key={i}>
            {key} {matchesCount[key]}
          </div>
        ))}
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

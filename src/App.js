import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // TODO: hardcoded
      databaseName: 'nucleotide',
      databaseId: '30271926',
      matcher: 'ATATTAGG',
      matches: []
    }
  }

  handleClick = () => {
    axios.get('http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nucleotide&id=30271926&rettype=fasta&retmode=xml')
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
    
        this.setState({
          matches
        })
      })
  }

  render() {
    const { matches } = this.state;

    return (
      <div className="App">
        <input value={this.state.databaseName} />
        <input value={this.state.databaseId} />
        <input value={this.state.matcher} />
        <button onClick={this.handleClick} >
          Get
        </button>

        {matches.map((match, i) => {
          return (
            <div key={i}>
              {match.value} {match.start} {match.end}
            </div>
          )
        })}
      </div>
    );
  }
}

function parse(data) {
  // TODO: Better than regex
  return data.match(/<TSeq_sequence>(.*)<\/TSeq_sequence>/)[1]
}

export default App;

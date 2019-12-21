import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // TODO: hardcoded
      matcher: 'ATATTAGG',
      matches: []
    }
  }

  async componentDidMount() {
    const { data } = await axios.get('http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nucleotide&id=30271926&rettype=fasta&retmode=xml')

    const dataString = parse(data);
    const reg = new RegExp(this.state.matcher, 'g');
    // var string = 'A1B1Y:A1B2Y:A1B3Y:A1B4Z:A1B5Y:A1B6Y:A1B7Y:A1B8Z:A1B9Y:A1B10Y:A1B11Y';
    // var reg = /A[0-9]+B[0-9]+Y:A[0-9]+B[0-9]+Y/g;
    const matches = []
    let found = false
    while (found = reg.exec(dataString)) {
      matches.push({
        value: found[0],
        start: reg.lastIndex - found[0].length + 1,
        end: reg.lastIndex
      });
        
        // reg.lastIndex -= found[0].split(':')[1].length;
    }

    console.log('~= MATCHES', matches)

    this.setState({
      matches
    })
  }

  render() {
    const { matches } = this.state;

    return (
      <div className="App">
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

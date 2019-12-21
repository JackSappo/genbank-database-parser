import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      dataString: ''
    }
  }

  async componentDidMount() {
    const { data } = await axios.get('http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nucleotide&id=30271926&rettype=fasta&retmode=xml')

    const dataString = parse(data);

    this.setState({
      dataString
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.dataString}
      </div>
    );
  }
}

function parse(data) {
  // TODO: Better than regex
  return data.match(/<TSeq_sequence>(.*)<\/TSeq_sequence>/)[1]
}

export default App;

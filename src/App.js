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
    axios.get('http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nucleotide&id=30271926&rettype=fasta&retmode=xml')
      .then(res => {
        this.setState({
          dataString: res.data
        })
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

export default App;

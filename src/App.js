import React, { Component } from 'react';
import './App.css';
import Output from './Components/Output';
import Select from './Components/Controls/Select';
import Text from './Components/Controls/Text';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      paras: 4,
      format: 'html',
      text: ''
    }
  }

  componentWillMount(){
    this.getSampleText();
  }

  getSampleText(){
    axios.get('https://baconipsum.com/api/?type=all-meat&paras='+this.state.paras+'&start-with-lorem=1&format='+this.state.format)
    .then((response) => {
      this.setState({text: response.data}, function(){
        console.log(this.state);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  showHTML(x){
    this.setState({format: x}, this.getSampleText);
  }

  changeParas(number){
    this.setState({paras: number}, this.getSampleText);
  }

  render() {
    return (
      <div className="App container">
      <h1>ReactJS Dummy Text Generator</h1>
      <hr />
      <form className="form-inline">
        <div className="form-group">
          <label>Paragraphs:</label>
          <Text value={this.state.paras} onChange={this.changeParas.bind(this)} />
        </div>
        <div className="form-group">
          <label>Include HTML:</label>
          <Select value={this.state.format} onChange={this.showHTML.bind(this)} />
        </div>
      </form>
      <hr />
        <Output value={this.state.text} />
      </div>
    );
  }
}

export default App;

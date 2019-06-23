import React from 'react';
import './App.css';
import MicroSite from './components/microsite';
import { getPages } from "./helpers/api";

export default
class App extends React.Component{ 
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
    }
  }
  componentDidMount() {
    getPages()
      .then(pages => this.setState({ pages }));
  }

  render() {
    if (this.state.pages.length === 0) {
      return null;
    }
    return (
      <>
        <MicroSite
            pages={this.state.pages}
        />
      </>
    );
  }

}
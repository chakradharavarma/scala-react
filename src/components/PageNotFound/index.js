import React, { Component } from 'react';

class PageNotFound extends Component {

  constructor(props) {
    super(props)
    window.history.back()
  }

  render() {
    return (
      <div/>
    );
  }
}

export default PageNotFound;
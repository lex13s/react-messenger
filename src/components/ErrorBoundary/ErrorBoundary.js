import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  };

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true})
  }

  render() {
    if (this.state.hasError) {
      return (
          <h2
              style={
                {color: 'red'}
              }
          >Что-то пошло не так.</h2>
      );
    }
    return this.props.children;
  }
}

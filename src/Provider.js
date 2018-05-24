import React from 'react';

export const StoreContext = React.createContext();

export default class Provider extends React.Component {
  render() {
    return (
      <StoreContext.Provider value={this.props.store}>
        {this.props.children}
      </StoreContext.Provider>
    )
  }
}
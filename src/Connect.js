import React from 'react';
import { StoreContext } from './Provider';

class Worker extends React.Component {
  state = {
    reduxState: null
  }

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.calculateState())
  }

  calculateState() {
    const newState = this.props.store.getState()
    const mapToProps = this.props.mapStateToProps || (a => a);
    const desiredState = mapToProps(newState, this.props);

    if (desiredState !== this.state.reduxState) this.setState({ reduxState: desiredState});
  }

  render() {
    const OurCompo = this.props.component;
    const mapDispatchToProps = this.props.mapDispatchToProps || (a => ({dispatch: a}))
    return <OurCompo {...this.state.reduxState} {...mapDispatchToProps(this.props.store.dispatch, this.props)} {...this.props}/>
  }
}



export default function (mapStateToProps, mapDispatchToProps) {
  return function (Component) {
    return class CC extends React.Component {
      render() {
        return (
          <StoreContext.Consumer>
            {store => (
              <Worker
                {...this.props}
                component={Component}
                mapStateToProps={mapStateToProps}
                store={store}
                mapDispatchToProps={mapDispatchToProps}
              />
            )}
          </StoreContext.Consumer>
        )
      }
    }
    
  }
}
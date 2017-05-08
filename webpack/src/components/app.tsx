import * as React from 'react';

import SubLoader from './sub-loader';

const global = Function('return this')();

export interface AppProps {
  
}

export interface AppState {
  Sub?: React.Component<any, any>;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);

    this.state = {
      Sub: undefined
    };
  }

  load() {
    const script: HTMLScriptElement = document.createElement('script');
    script.onload = () => {
      this.setState({
        Sub: global.Sub
      });
    };
    script.src = '/debug/sub.js';
    document.body.appendChild(script);
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Hello, World!!</h1>
        {this._resolveSub()}
      </div>
    );
  }

  _resolveSub() {
    if(global.Sub) {
      return (<global.Sub message="Sub World"/>);
    } else {
      return (<SubLoader load={this.load.bind(this)}/>);
    }
  }
}

export default App;

import * as React from 'react';

export interface SubLoaderProps {
  load: () => void;
}

class SubLoader extends React.Component<SubLoaderProps, undefined> {
  componentWillMount() {
    this.props.load();
  }

  render() {
    return null;
  }
}

export default SubLoader;

import * as React from 'react';

export interface SubProps {
  message: string;
}

class Sub extends React.Component<SubProps, {}> {
  render(): JSX.Element {
    return (
      <h2>This is Sub Component. The message is {this.props.message}</h2>
    );
  }
}

export default Sub;

import React from 'react';

import Sider from './sider';
// import './application.less';

class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { location, children } = this.props;
    return (
      <div className="application">
        <Sider location={location} />
        <div className="application-main">
          {children}
        </div>
      </div>
    );
  }
}

export default Application;

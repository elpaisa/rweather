import React from 'react';
import { SiGoogleearth } from 'react-icons/si';

class Loading extends React.Component {
  render() {
    return (
      <div className="backdrop">
        <div className="loader">
          <SiGoogleearth className="text-white f-5" />
        </div>
      </div>
    );
  }
}

export default Loading;

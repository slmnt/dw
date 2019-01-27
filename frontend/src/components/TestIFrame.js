import React, { Component } from 'react';

class TestIFrame extends Component {
  componentDidMount() {
      this._updateIframe();
  }
  componentDidUpdate() {
      this._updateIframe();
  }
  _updateIframe() {
      const iframe = this.refs.iframe;
      const document = iframe.contentDocument;
      if (!document) return;
      document.body.innerHTML = `
        <html>
          <body>
            <style>
              body {
                overflow: hidden;
                font-size: 0.6em;
              }
            </style>
            ${this.props.content}
          </body>
        </html>
      `;
      /*
      const head = document.getElementsByTagName('head')[0];
      this.props.stylesheets.forEach(url => {
          const ref = document.createElement('link');
          ref.rel = 'stylesheet';
          ref.type = 'text/css';
          ref.href = url;
          head.appendChild(ref);
      });*/
  }

  render() {
      return (<iframe
        style={{width: "100%", height: "100%", border: "none", pointerEvents: "none"}}
        //allowFullScreen={true}
        //"allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
        //"geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor"
        ref="iframe"/>)
  }
}

export default TestIFrame;

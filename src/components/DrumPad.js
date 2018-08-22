import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class DrumPad extends Component {
  constructor(props) {
    super(props);

    this.audioHandler = React.createRef();
    this.onDrumPadClicked = this.onDrumPadClicked.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onDrumPadClicked() {
    const text = this.props.padItem.id.replace(/-/g, " ");
    const audioElm = this.audioHandler.current;

    this.props.updateDisplayText(text);
    audioElm.currentTime = 0;
    audioElm.play();
  }

  onKeyDown(event) {
    const root = ReactDOM.findDOMNode(this);

    if (event.keyCode === this.props.padItem.keyCode) {
      root.classList.add("active");
      this.onDrumPadClicked();
    }
  }

  onKeyUp(event) {
    const root = ReactDOM.findDOMNode(this);

    if (event.keyCode === this.props.padItem.keyCode) {
      setTimeout(() => {
        root.classList.remove("active");
      }, 33);
    }
  }

  componentDidUpdate() {
    this.audioHandler.current.volume = this.props.volumeValue / 100;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  render() {
    const padItem = this.props.padItem;

    return (
      <div className="drum-pad" id={padItem.id} onClick={this.onDrumPadClicked}>
        <audio className="clip" id={padItem.keyTrigger} src={padItem.url} ref={this.audioHandler} />
        {padItem.keyTrigger}
      </div>
    )
  }
}
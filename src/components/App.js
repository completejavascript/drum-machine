import React, { Component } from 'react';
import DrumPad from './DrumPad';
import FolkMe from './Folkme';
import './App.css';

const bankOne = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];

const bankTwo = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}];

const banks = [bankOne, bankTwo];

const volumeHandlerStyle = {
  "--min": 0,
  "--max": 100,
  "--val": 50,
  "--width": "100%",
  "--height": "1.5em",
  "--border-radius": "0.5em",
  "--track-height": "0.75em",
  "--track-border-width": "1px",
  "--track-border-color": "#000",
  "--track-border-style": "solid",
  "--track-color": "#202020",
  "--progress-height": "0.75em",
  "--progress-color": "#35cac5",
  "--thumb-width": "1.15em",
  "--thumb-height": "1.15em",
  "--thumb-border-radius": "40%",
  "--thumb-color": "#202020",
  "--thumb-border": "1px solid #000"
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.volumeHandler = React.createRef();
    this.iconVolume = React.createRef();
    this.displayVolumeValue = React.createRef();
    this.switchBank = React.createRef();
    this.switchBankLabel = React.createRef();

    this.state = {
      bankIndex: 0,
      volumeValue: 50,
      displayText: this.props.displayTextDefault
    }

    this.onBankChanged = this.onBankChanged.bind(this);
    this.onVolumeChanged = this.onVolumeChanged.bind(this);
    this.onMouseLeaveInput = this.onMouseLeaveInput.bind(this);
    this.updateDisplayText = this.updateDisplayText.bind(this);
  }

  onBankChanged({ target }) {
    const bankIndex = target.checked ? 1 : 0;

    this.setState({
      bankIndex: bankIndex,
      displayText: this.props.displayTextDefault
    });
  }

  updateDisplayText(text) {
    this.setState({
      displayText: text
    });
  }

  onVolumeChanged({ target }) {
    const value = Number.parseInt(target.value, 10);
    const volumeHandlerElm = this.volumeHandler.current;
    const iconVolumeElm = this.iconVolume.current;
    const displayVolumeValueElm = this.displayVolumeValue.current;

    volumeHandlerElm.style.setProperty('--val', value);

    if (value === 0) iconVolumeElm.className = "fas fa-volume-off";
    else if (value < 50) iconVolumeElm.className = "fas fa-volume-down";
    else iconVolumeElm.className = "fas fa-volume-up";

    displayVolumeValueElm.style.setProperty('opacity', 1);
    setTimeout(() => {
      displayVolumeValueElm.style.setProperty('opacity', 0);
    }, 1000);

    this.setState({
      volumeValue: value
    });
  }

  onMouseLeaveInput() {
    setTimeout(() => {
      this.displayVolumeValue.current.style.setProperty('opacity', 0);
    }, 1000);
  }

  componentDidUpdate() {
    if (this.hideVolumeTimeout) {
      clearTimeout(this.hideVolumeTimeout);
      this.hideVolumeTimeout = null;
    }
    else {
      this.hideVolumeTimeout = setTimeout(() => {
        this.displayVolumeValue.current.style.setProperty('opacity', 0);
      }, 1000);
    }
  }

  render() {
    return (
      <div className="drum" id="drum-machine">
        <div className="drum-display" id="display">
          <h1>{this.state.displayText}</h1>
        </div>

        <div className="drum-control">
          <div className="drum-control-volumn">
            <i className="fas fa-volume-down" ref={this.iconVolume}></i>
            <span> Volume</span>
            <span className="drum-control-volumn-value" ref={this.displayVolumeValue}> {this.state.volumeValue}</span>
            <input type="range" onInput={this.onVolumeChanged} onMouseLeave={this.onMouseLeaveInput} style={volumeHandlerStyle} ref={this.volumeHandler} />
          </div>
          <div className="drum-control-bank">
            <div>{this.state.bankIndex ? "Smooth Piano Kit" : "Heater Kit"}</div>
            <label className="switch" title="Switch bank">
              <input type="checkbox" onChange={this.onBankChanged} ref={this.switchBank}/>
              <span className="slider round" ref={this.switchBankLabel}></span>
            </label>
          </div>
        </div>

        <div className="drum-pads">
          {
            banks[this.state.bankIndex].map((item, idx) => {
              return <DrumPad
                key={idx}
                padItem={item}
                updateDisplayText={this.updateDisplayText}
                volumeValue={this.state.volumeValue} />
            })
          }
        </div>

        <div className="drum-footer">
          Made by <a href="http://about.phamvanlam.com">Lam Pham</a>.
        </div>

        <FolkMe
          targetURL="https://github.com/completejavascript/drum-machine"
          color="#fff"
          backgroundColor="#35cac5"
          position="right"
          size="100px"
          ariaLabel="View source on Github"
        />
      </div>
    )
  }
}
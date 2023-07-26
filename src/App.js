import React from 'react';
import "./App.css"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transcript: '',
      started: '',
      same: false
    };
    this.recognition = null;
  }

  componentDidMount() {
    // Überprüfe, ob die Web Speech API in Chrome verfügbar ist
    if ('webkitSpeechRecognition' in window) {
      // Erstelle eine neue Instanz der Web Speech API
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true; // Kontinuierliche Spracherkennung

      // Eventlistener für Spracherkennungsergebnisse
      this.recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1][0].transcript;
        this.setState(prevState => ({
          transcript: prevState.same ? prevState.transcript : result,
          same: prevState.transcript === result
        }));
      };
    } else {
      console.log('Die Web Speech API wird in diesem Browser nicht unterstützt.');
    }
  }

  startSpeechRecognition = () => {
    if (this.recognition) {
      this.setState({ started: true });
      this.recognition.start();
    }
  };

  stopSpeechRecognition = () => {
    if (this.recognition) {
      this.setState({ started: false });
      this.recognition.stop();
    }
  };

  render() {
    const { transcript, started, same } = this.state;

    return (
      <section className='main'>
        <div className='option'>
          <button id="start" disabled={started} onClick={this.startSpeechRecognition}>START</button>
          <button id="stop" disabled={!started} onClick={this.stopSpeechRecognition}>STOP</button>
        </div>
        <div className='outputbox'>
          <span id="erkanntertext">TEXT-TRANSLATION</span>
          <span className='outputtext'>
            {started && same ? '' : transcript}
          </span>
        </div>
      </section>
    );
  }
}

export default App;

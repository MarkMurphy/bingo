import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const numbers = [
  'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15',
  'I16', 'I17', 'I18', 'I19', 'I20', 'I21', 'I22', 'I23', 'I24', 'I25', 'I26', 'I27', 'I28', 'I29', 'I30',
  'N31', 'N32', 'N33', 'N34', 'N35', 'N36', 'N37', 'N38', 'N39', 'N40', 'N41', 'N42', 'N43', 'N44', 'N45',
  'G46', 'G47', 'G48', 'G49', 'G50', 'G51', 'G52', 'G53', 'G54', 'G55', 'G56', 'G57', 'G58', 'G59', 'G60',
  'O61', 'O62', 'O63', 'O64', 'O65', 'O66', 'O67', 'O68', 'O69', 'O70', 'O71', 'O72', 'O73', 'O74', 'O75'
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      availableNumbers: numbers.slice(0),
      calledNumbers: [],
      currentNumber: ''
    }
  }

  componentDidMount() {
    this.next()
  }

  reset() {
    this.setState({
      currentNumber: '',
      availableNumbers: numbers.slice(0),
      calledNumbers: []
    }, this.next)
  }

  next() {
    const {availableNumbers, calledNumbers} = this.state;
    const nextNumber = availableNumbers[Math.floor(Math.random()*availableNumbers.length)];
    const nextNumberIndex = availableNumbers.indexOf(nextNumber);

    calledNumbers.push(nextNumber)
    availableNumbers.splice(nextNumberIndex, 1);

    this.setState({
      currentNumber: nextNumber,
      availableNumbers,
      calledNumbers
    }, () => console.debug(this.state));

    return nextNumber
  }

  handleNextClick = () => {
    this.next()
  }

  handleResetClick = () => {
    this.reset()
  }

  render() {
    let rows = [
      [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
    ]

    rows = rows.map((row, rowIndex) => {
      ['B', 'I', 'N', 'G', 'O'].forEach((letter, letterIndex) => {
        let number = rowIndex + (letterIndex * 15) + 1
        let value = letter+number
        let active = this.state.calledNumbers.indexOf(value) >= 0
        let style = { opacity: active ? 1 : .25 }

        row.push(
          <td key={value} style={style}>
            <span>{letter}</span>
            <span>{number}</span>
          </td>
        )
      })

      return <tr key={rowIndex}>{row}</tr>
    })

    const recentNumbers = this.state.calledNumbers.slice(-4).map(calledNumber => {
      return <h6 className="text-muted">{calledNumber}</h6>
    })

    recentNumbers.pop()

    return (
      <div className="App">
        <div className="row">
          <div className="col-sm-6">
            <div className="container mt-3 mb-1">
              <h1>{this.state.currentNumber}</h1>
              <div className="mb-3">{recentNumbers.reverse()}</div>
              <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handleNextClick}>Next Number</button>
              <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.handleResetClick}>Winner</button>

            </div>
          </div>
          <div className="col-sm-6">
            <table className="table table-inverse table-sm">
              <thead>
                <tr>
                  <th>B</th>
                  <th>I</th>
                  <th>N</th>
                  <th>G</th>
                  <th>O</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

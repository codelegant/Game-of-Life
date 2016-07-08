/**
 * Author: 赖传峰
 * Email: laichuanfeng@hotmail.com
 * Homepage: http://laichuanfeng.com/
 * Date: 2016/7/5
 */
import React from 'react';
import Cell from './Cell';
export default class Life extends React.Component {
  constructor() {
    super();
    this.max = 40;
    this.process = 'pause';
    this.state = {};
    this._startHandler = this._startHandler.bind(this);
    this._pauseHandler = this._pauseHandler.bind(this);
    this._updateState = this._updateState.bind(this);
  }

  _updateState() {
    let _this = this;
    return setTimeout((function update() {
      let updateState = {};
      let originData = _this.state;
      for (let key in originData) {
        let keyXY = key.split('_');
        let xIndex = Number(keyXY[0]);
        let yIndex = Number(keyXY[1]);
        let aliveCount = 0;
        for (let x = xIndex - 1; x <= xIndex + 1; x ++) {
          if (x < 0 || x > _this.max - 1) continue;
          if (aliveCount > 3) break;
          for (let y = yIndex - 1; y <= yIndex + 1; y ++) {
            if (y < 0 || y > _this.max - 1) continue;
            if (`${x}_${y}` === key) continue;
            if (originData[`${x}_${y}`] === 1) aliveCount += 1;
            if (aliveCount > 3) break;
          }
        }
        switch (aliveCount) {
          case 3:
            updateState[key] = 1;
            break;
          case 2:
            updateState[key] = originData[key];
            break;
          default:
            updateState[key] = 0;
        }
      }
      if (updateState != originData && _this.process === 'update') {
        _this.setState(updateState);
        setTimeout(update, 0);
      }
    })(), 0);
  }

  _startHandler(event) {
    if (this.process === 'update') return;
    this.process = 'update';
    if (this.state['0_0'] != undefined) {
      // event.target.disabled = true;
      // document.getElementById('btn_pause').disabled = false;
    } else {
      let lifeState = {};
      for (let x = 0; x < this.max; x ++) {
        for (let y = 0; y < this.max; y ++) {
          (Math.random() * 10 > 7)
              ? lifeState[`${x}_${y}`] = 1
              : lifeState[`${x}_${y}`] = 0;
        }
      }
      this.setState(lifeState);
    }
    this._updateState();
  }

  _pauseHandler(event) {
    console.log(this.process);
    if (this.process === 'pause') return;
    this.process = 'pause';
    // event.target.disabled = true;
    // document.getElementById('btn_start').disabled = false;
  }

  render() {
    let cell = [];
    for (let x = 0; x < this.max; x ++) {
      let cellRow = [];
      for (let y = 0; y < this.max; y ++) {
        cellRow.push(<Cell key={`${x}_${y}`} life={this.state[`${x}_${y}`]}/>);
      }
      cell.push(<tr key={`${x}`}>{cellRow}</tr>);
    }
    return <table>
      <tbody>{cell}</tbody>
      <tfoot>
      <tr>
        <td colSpan={this.max}>
          <button id="btn_start" className="start" type="button" onClick={this._startHandler}>Start</button>
          <button id="btn_pause" className="pause" type="button" onClick={this._pauseHandler}>
            Pause
          </button>
        </td>
      </tr>
      </tfoot>
    </table>;
  }
};

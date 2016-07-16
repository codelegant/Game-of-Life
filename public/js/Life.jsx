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
    this.state = {
      life    : {},
      btnState: 0
    };
    this.startHandler = this.startHandler.bind(this);
    this.pauseHandler = this.pauseHandler.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState() {
    let _this = this;
    return setTimeout((function update() {
      let updateState = {};
      let originData = _this.state.life;
      for (let key in originData) {
        let keyXY = key.split('_');
        let xIndex = Number(keyXY[0]);
        let yIndex = Number(keyXY[1]);
        let aliveCount = 0;
        let max = _this.max;
        for (let x = xIndex - 1; x <= xIndex + 1; x ++) {
          if (x < 0 || x > max - 1) continue;
          if (aliveCount > 3) break;
          for (let y = yIndex - 1; y <= yIndex + 1; y ++) {
            if (y < 0 || y > max - 1) continue;
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
      if (updateState != originData && _this.state.btnState) {
        _this.setState({
          life: updateState
        }, function() {
          setTimeout(update, 0);
        });
      }
    })(), 0);
  }

  startHandler() {
    if (this.state.btnState) return;
    if (this.state.life['0_0'] != undefined) {
      this.setState({
        btnState: 1
      }, ()=> {
        this.updateState();
      });
    } else {
      let lifeState = {};
      for (let x = 0; x < this.max; x ++) {
        for (let y = 0; y < this.max; y ++) {
          (Math.random() * 10 > 7)
              ? lifeState[`${x}_${y}`] = 1
              : lifeState[`${x}_${y}`] = 0;
        }
      }
      this.setState({
        life    : lifeState,
        btnState: 1
      }, ()=> {
        //目前只能在回调中获取 this.state.life 值
        this.updateState();
      });
      //外部无法获取 this.state.life 的值
    }
  }

  pauseHandler() {
    if (! this.state.btnState) return;
    this.setState({
      btnState: 0
    });
  }

  render() {
    let cell = [];
    let life = this.state.life;
    let max = this.max;
    for (let x = 0; x < max; x ++) {
      let cellRow = [];
      for (let y = 0; y < max; y ++) {
        cellRow.push(<Cell key={`${x}_${y}`}
                           life={life[`${x}_${y}`]}/>);
      }
      cell.push(<tr key={`${x}`}>{cellRow}</tr>);
    }
    return (<table>
      <tbody>{cell}</tbody>
      <tfoot>
      <tr>
        <td colSpan={max}>
          <button className="start"
                  type="button"
                  onClick={this.startHandler}
                  disabled={this.state.btnState}>Start
          </button>
          <button className="pause"
                  type="button"
                  onClick={this.pauseHandler}
                  disabled={! this.state.btnState}>
            Pause
          </button>
        </td>
      </tr>
      </tfoot>
    </table>);
  }
};

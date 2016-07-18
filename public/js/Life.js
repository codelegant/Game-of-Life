/**
 * Author: 赖传峰
 * Email: laichuanfeng@hotmail.com
 * Homepage: http://laichuanfeng.com/
 * Date: 2016/7/5
 */
import React from 'react';
import Cell from './Cell';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import shallowCompare from 'react-addons-shallow-compare';

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
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  updateState() {
    const _this = this;
    return setTimeout((function update() {
      const updateState = {};
      const originData = _this.state.life;
      for (const key in originData) {
        const keyXY = key.split('_');
        const xIndex = Number(keyXY[0]);
        const yIndex = Number(keyXY[1]);
        let aliveCount = 0;
        const max = _this.max;
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
        }, () => {
          setTimeout(update, 0);
        });
      }
    }()), 0);
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
      const lifeState = {};
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
    const cell = [];
    const life = this.state.life;
    const max = this.max;
    for (let x = 0; x < max; x ++) {
      const cellRow = [];
      for (let y = 0; y < max; y ++) {
        cellRow.push(<Cell key={`${x}_${y}`}
                           life={life[`${x}_${y}`]} />);
      }
      cell.push(<tr key={`${x}`} >{cellRow}</tr>);
    }
    return (<table>
      <tbody>{cell}</tbody>
      <tfoot>
      <tr>
        <td colSpan={max} >
          <button className="start"
                  type="button"
                  onClick={this.startHandler}
                  disabled={this.state.btnState} >Start
          </button>
          <button className="pause"
                  type="button"
                  onClick={this.pauseHandler}
                  disabled={! this.state.btnState} >
            Pause
          </button>
        </td>
      </tr>
      </tfoot>
    </table>);
  }
};

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
    this.max      = 40;
    let lifeState = {};
    for (let x = 0; x < this.max; x ++) {
      for (let y = 0; y < this.max; y ++) {
        (Math.random() * 10 > 7)
            ? lifeState[`${x}_${y}`] = 'alive'
            : lifeState[`${x}_${y}`] = 'death';
      }
    }
    this.state = lifeState;
  }

  componentDidMount() {
    let _this = this;
    setTimeout(function update() {
      let updateState = {};
      let originData  = _this.state;
      for (let key in originData) {
        let keyXY      = key.split('_');
        let xIndex     = Number(keyXY[0]);
        let yIndex     = Number(keyXY[1]);
        let aliveCount = 0;
        for (let x = xIndex - 1; x <= xIndex + 1; x ++) {
          if (x < 0 || x > _this.max - 1) continue;
          if (aliveCount > 3) break;
          for (let y = yIndex - 1; y <= yIndex + 1; y ++) {
            if (y < 0 || y > _this.max - 1) continue;
            if (`${x}_${y}` === key) continue;
            if (originData[`${x}_${y}`] === 'alive') aliveCount += 1;
            if (aliveCount > 3) break;
          }
        }
        switch (aliveCount) {
          case 3:
            updateState[key] = 'alive';
            break;
          case 2:
            updateState[key] = originData[key];
            break;
          default:
            updateState[key] = 'death';
        }
      }
      if (updateState != originData) {
        _this.setState(updateState);
        setTimeout(update, 0);
      }
    }, 0);
  }

  render() {
    let cell = [];
    /*下面的代码如果用闭包包裹起来*/
    for (let x = 0; x < this.max; x ++) {
      let cellRow = [];
      for (let y = 0; y < this.max; y ++) {
        cellRow.push(<Cell key={`${x}_${y}`} life={this.state[`${x}_${y}`]}/>);
      }
      cell.push(<tr key={`${x}`}>{cellRow}</tr>);
    }
    return <table>
      <tbody>{cell}</tbody>
    </table>;
  }
};

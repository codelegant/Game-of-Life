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
    this.state={life:'death'};
  }

  render() {
    setTimeout(()=>{
      this.setState({
        life:'alive'
      });
    },2000);
    let cell = [];
    for (let i = 40; i --;) {
      let cellRow = [];
      for (let j = 40; j --;) {
        if(j!==20) {
          cellRow.push(<Cell life="death"/>);
        }else{
          cellRow.push(<Cell life={this.state.life}/>);
        }
      }
      cell.push(<tr>{cellRow}</tr>);
    }
    return <table>{cell}</table>;
  }
};

/**
 * Author: 赖传峰
 * Email: laichuanfeng@hotmail.com
 * Homepage: http://laichuanfeng.com/
 * Date: 2016/7/6
 */
import React from 'react';
export default class Cell extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <td className={this.props.life?'alive':'death'}></td>;
  }
}
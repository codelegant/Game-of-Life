/**
 * Author: 赖传峰
 * Email: laichuanfeng@hotmail.com
 * Homepage: http://laichuanfeng.com/
 * Date: 2016/7/5
 */
import React from 'react';
export default class Hello extends React.Component {
  constructor(){
    super();
  }
  render() {
    return <h1>Hello {this.props.name}</h1>
    ;
  }
};

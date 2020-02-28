import React, { Component } from 'react';
import {Card,Button,Icon, Radio} from 'antd';
import './ui.less'

export default class Buttons extends Component {
    state = {
      };
    
      handleSizeChange = e => {
        this.setState({ size: e.target.value });
      };
      handleCloseLoading = ()=>{
          if(this.state.loading){
            this.setState({
                loading:false
            })
          }else{
            this.setState({
                loading:true
            })
          }
      };
    render() {
        // const { size } = this.state;
        return (
            <div>
                <Card title="基础按钮" className="card">
                    <Button type="primary">新增</Button>
                    <Button>查看</Button>
                    <Button type="dashed">查询</Button>
                    <Button type="danger">删除</Button>
                    <Button disabled>禁用</Button>
                </Card>
                <Card title="图形按钮" className="card">
                    <Button type="primary" icon="edit">新增</Button>
                    <Button>查看</Button>
                    <Button type="dashed" icon="search">查询</Button>
                    <Button type="danger" icon="delete">删除</Button>
                    <Button disabled icon="close-circle">禁用</Button>
                </Card>
                <Card title="Loading按钮" className="card">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" loading={this.state.loading} shape="circle"></Button>
                    <Button type="dashed" loading={this.state.loading}>点击加载</Button>
                    <Button loading={this.state.loading} shape="circle"></Button>
                    <Button type="danger" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>
                <Card title="按钮组">
                    <Button.Group>
                        <Button type="primary">
                            <Icon type="left" />
                            返回
                        </Button>
                        <Button type="primary">
                            前进
                            <Icon type="right" />
                        </Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="card1">
                    <Radio.Group value={this.state.size} onChange={this.handleSizeChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>新增</Button>
                    <Button size={this.state.size}>查看</Button>
                    <Button type="dashed" size={this.state.size}>查询</Button>
                    <Button type="danger" size={this.state.size}>删除</Button>
                </Card>
            </div>
        )
    }
}

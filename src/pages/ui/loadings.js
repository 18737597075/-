import React, { Component } from 'react'
import './ui.less'
import { Card, Spin, Icon, Alert } from 'antd'

const antIcon = <Icon type="loading" style={{fontSize:24}} spin/>

export default class Loadings extends Component {
    render() {
        return (
            <div>
                <Card title="Spin用法" className="card">
                    <Spin size="small"/>
                    <Spin />
                    <Spin size="large"/>
                    <Spin indicator={antIcon}/>
                </Card>
                <Card title="内容遮罩">
                    <Spin tip="加载中">
                        <Alert 
                            message="React"
                            description="欢迎来到React实战项目"
                            type="info"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}

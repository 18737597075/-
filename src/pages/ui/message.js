
import React, { Component } from 'react'
import './ui.less'
import { Card,Button,message } from 'antd'

export default class Message extends Component {
    showMessage = (type) =>{
        message[type]("今天天气真的好冷啊");
    }
    render() {
        return (
            <div>
                <Card title="全局提示框" className="card">
                    <Button onClick={()=>this.showMessage('success')}>Success</Button>
                    <Button onClick={()=>this.showMessage('error')}>Error</Button>
                    <Button onClick={()=>this.showMessage('warning')}>Warning</Button>
                    <Button onClick={()=>this.showMessage('info')}>Info</Button>
                    <Button onClick={()=>this.showMessage('loading')}>Loading</Button>
                </Card>
            </div>
        )
    }
}

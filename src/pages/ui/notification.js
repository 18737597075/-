import React, { Component } from 'react'
import './ui.less'
import { Card,Button,Icon,notification } from 'antd'

const openNotification = () => {
    notification.open({
    message: '温馨提示',
    description:
        '天冷路滑，骑行时请在注意安全',
    icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
};

const openNotificationWithIcon = (type,direction) => {
    if(direction){
        notification.config({
            placement:direction
        })
    }
    notification[type]({
    message: '发工资了',
    description:
        '发了工资就可以买买买买了。。。。',
    });
};

export default class Notification extends Component {
    render() {
        return (
            <div>
                <Card title="通知提醒框" className="card">
                    <Button type="primary" onClick={openNotification}>
                        Open the notification box
                    </Button>
                </Card>
                <Card title="带图标的" className="card">
                    <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
                    <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
                    <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
                    <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
                </Card>
                <Card title="控制方向" className="card">
                    <Button onClick={() => openNotificationWithIcon('success','topLeft')}>TopLeft</Button>
                    <Button onClick={() => openNotificationWithIcon('info','topRight')}>TopRight</Button>
                    <Button onClick={() => openNotificationWithIcon('warning','bottomLeft')}>BottomLeft</Button>
                    <Button onClick={() => openNotificationWithIcon('error','bottomRight')}>BottomRight</Button>
                </Card>
            </div>
        )
    }
}

import React, { Component } from 'react'
import './ui.less'
import { Card,Icon,message,Tabs } from 'antd'

const TabPane = Tabs.TabPane;

export default class Tab extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { 
                title: '天气', 
                content: '每天天气都很好', 
                key: '1' 
            },
            { 
                title: '心情', 
                content: '每天心情都很好', 
                key: '2' 
            },
            {
                title: '工作',
                content: '每天都很充实',
                key: '3',
                closable: false,
            },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }
    onChange = activeKey => {
        this.setState({ activeKey });
    };
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    add = () => {
        const { panes } = this.state;
        const activeKey = `饮食${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: '今天吃点什么呢？', key: activeKey });
        this.setState({ panes, activeKey });
    };
    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };
    callBack = (key) => {
        message.info("Hi,您选择了页签："+key)
    }
    render() {
        return (
            <div>
                <Card title="Tab页签" className="card">
                    <Tabs defaultActiveKey="1" onChange={this.callBack}>
                        <TabPane tab="天气" key="1">
                            今天天气不错
                        </TabPane>
                        <TabPane tab="心情" key="2">
                            今天心情很不错
                        </TabPane>
                        <TabPane tab="工作" key="3">
                            今天没什么工作要做
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card">
                    <Tabs defaultActiveKey="1" onChange={this.callBack}>
                        <TabPane tab={<span><Icon type="gitlab" />天气</span>} key="1">
                            今天天气不错
                        </TabPane>
                        <TabPane tab={<span><Icon type="yahoo" />心情</span>} key="2">
                            今天心情很不错
                        </TabPane>
                        <TabPane tab={<span><Icon type="fire" />工作</span>} key="3">
                            今天没什么工作要做
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="可编辑的标签页" className="card">
                    <Tabs
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {this.state.panes.map(pane => (
                            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                                {pane.content}
                            </TabPane>
                        ))}
                    </Tabs>
                </Card>
            </div>
        )
    }
}

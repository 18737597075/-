import React, { Component } from 'react'
import { Card, Table, Modal, message, Button,Badge } from 'antd'
import axios from './../../axios/index'
// import Utils from './../../util/utils'

export default class High extends Component {
    state = {
        // dataSource2:[]
    }
    params = {
        page:1
    }
    componentDidMount(){
        this.request();
    }
    request = ()=>{
        // let _this=this;
        axios.ajax({
            url:'/table/high/list',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            if(res.code == 0){
                res.result.list.map((item,index)=>{
                    item.key = index;
                })
                this.setState({
                    dataSource:res.result.list
                })
            }
        })
    }
    handleChange = (pagination,filters,sorter)=>{
        this.setState({
            sortOrder:sorter.order
        })
    }

    handleDelete = (item)=>{
        // let id = item.id;
        Modal.confirm({
            title:'确认',
            content:'您确认要删除此条数据吗？',
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    }
    render() {
        const columns = [
            {
                title:'id',
                dataIndex:'id',
                width:80
            },{
                title:'用户名',
                dataIndex:'userName',
                width:80
            },{
                title:'性别',
                dataIndex:'sex',
                width:80,
                render(sex){
                    return sex == 1 ? '男' : '女'
                }
            },{
                title:'状态',
                dataIndex:'state',
                width:80,
                render(state){
                    let config = {
                        '1' : '咸鱼一条',
                        '2' : '风华浪子',
                        '3' : '邻家妹妹',
                        '4' : '白衣天使',
                        '5' : '创业者'
                    }
                    return config[state];
                }
            },{
                title:'爱好',
                dataIndex:'interest',
                width:80,
                render(interest){
                    let config = {
                        '1' : '美食',
                        '2' : '旅游',
                        '3' : '打游戏',
                        '4' : '追剧',
                        '5' : '看小说',
                        '6' : '逛街',
                        '7' : '拍照',
                        '8' : '爬山'
                    }
                    return config[interest];
                }
            },{
                title:'生日',
                dataIndex:'birthday',
                width:80,
            },{
                title:'地址',
                dataIndex:'address',
                width:140
            },{
                title:'联系方式',
                dataIndex:'phoneNumber',
                width:80
            }
        ]
        const columns2 = [
            {
                title:'id',
                dataIndex:'id',
                width:80,
                fixed:'left'
            },{
                title:'用户名',
                dataIndex:'userName',
                width:80,
                fixed:'left'
            },{
                title:'性别',
                dataIndex:'sex',
                width:80,
                render(sex){
                    return sex == 1 ? '男' : '女'
                }
            },{
                title:'状态',
                dataIndex:'state',
                width:80,
                render(state){
                    let config = {
                        '1' : '咸鱼一条',
                        '2' : '风华浪子',
                        '3' : '邻家妹妹',
                        '4' : '白衣天使',
                        '5' : '创业者'
                    }
                    return config[state];
                }
            },{
                title:'爱好',
                dataIndex:'interest',
                width:80,
                render(interest){
                    let config = {
                        '1' : '美食',
                        '2' : '旅游',
                        '3' : '打游戏',
                        '4' : '追剧',
                        '5' : '看小说',
                        '6' : '逛街',
                        '7' : '拍照',
                        '8' : '爬山'
                    }
                    return config[interest];
                }
            },{
                title:'生日',
                dataIndex:'birthday',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday1',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday2',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday3',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday4',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday5',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday6',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday7',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday8',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday9',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday10',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday11',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday12',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday13',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday14',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday15',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday16',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday17',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday18',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday19',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday20',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday21',
                width:80,
            },{
                title:'生日',
                dataIndex:'birthday22',
                width:80,
            },{
                title:'地址',
                dataIndex:'address',
                width:140,
                fixed:'right'
            },{
                title:'联系方式',
                dataIndex:'phoneNumber',
                width:80,
                fixed:'right'
            }
        ]
        const columns3 = [
            {
                title:'id',
                dataIndex:'id',
            },{
                title:'用户名',
                dataIndex:'userName',
            },{
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex == 1 ? '男' : '女'
                }
            },{
                title:'年龄',
                dataIndex:'age',
                sorter:(a,b)=>{
                    return a.age - b.age;
                },
                sortOrder:this.state.sortOrder
            },{
                title:'状态',
                dataIndex:'state',
                render(state){
                    let config = {
                        '1' : '咸鱼一条',
                        '2' : '风华浪子',
                        '3' : '邻家妹妹',
                        '4' : '白衣天使',
                        '5' : '创业者'
                    }
                    return config[state];
                }
            },{
                title:'爱好',
                dataIndex:'interest',
                render(interest){
                    let config = {
                        '1' : '美食',
                        '2' : '旅游',
                        '3' : '打游戏',
                        '4' : '追剧',
                        '5' : '看小说',
                        '6' : '逛街',
                        '7' : '拍照',
                        '8' : '爬山'
                    }
                    return config[interest];
                }
            },{
                title:'生日',
                dataIndex:'birthday',
            },{
                title:'地址',
                dataIndex:'address',
            },{
                title:'联系方式',
                dataIndex:'phoneNumber',
            }
        ]
        const columns4 = [
            {
                title:'id',
                dataIndex:'id',
            },{
                title:'用户名',
                dataIndex:'userName',
            },{
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex == 1 ? '男' : '女'
                }
            },{
                title:'年龄',
                dataIndex:'age'
            },{
                title:'状态',
                dataIndex:'state',
                render(state){
                    let config = {
                        '1' : '咸鱼一条',
                        '2' : '风华浪子',
                        '3' : '邻家妹妹',
                        '4' : '白衣天使',
                        '5' : '创业者'
                    }
                    return config[state];
                }
            },{
                title:'爱好',
                dataIndex:'interest',
                render(interest){
                    let config = {
                        '1' : <Badge status='success' text='美食'/>,
                        '2' : <Badge status="error" text="旅游" />,
                        '3' : <Badge status="default" text="打游戏" />,
                        '4' : <Badge status="processing" text="追剧" />,
                        '5' : <Badge status="warning" text="看小说" />,
                        '6' : <Badge status="success" text="逛街" />,
                        '7' : <Badge status="warning" text="拍照" />,
                        '8' :  <Badge status="success" text="爬山" />
                    }
                    return config[interest];
                }
            },{
                title:'生日',
                dataIndex:'birthday',
            },{
                title:'地址',
                dataIndex:'address',
            },{
                title:'联系方式',
                dataIndex:'phoneNumber',
            },{
                title:'操作',
                render:(text,item)=>{
                    return <Button onClick={(item)=>{this.handleDelete(item )}}>删除</Button>
                }
            }
        ]
        return (
            <div>
                <Card title="头部固定">
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{y:240}}
                    />
                </Card>
                <Card title="左侧固定" style={{marginTop:10}}>
                    <Table 
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{x:2460}}
                    />
                </Card>
                <Card title="年龄排序" style={{marginTop:10}}>
                    <Table 
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" style={{marginTop:10}}>
                    <Table 
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}

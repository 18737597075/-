import React, { Component } from 'react'
import { Card, Table, Modal, message, Button } from 'antd'
import axios from './../../axios/index'
import Utils from './../../util/utils'

export default class Basic extends Component {
    state = {
        dataSource2:[]
    }
    params = {
        page:1
    }
    componentDidMount(){
        const dataSource = [
            {
                id:'0',
                userName:'bwb',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2019-2-14',
                address:'河南',
                phoneNumber:'15698745698'
            },
            {
                id:'1',
                userName:'gqp',
                sex:'女',
                state:'4',
                interest:'6',
                birthday:'2019-2-14',
                address:'河南',
                phoneNumber:'15698745698'
            },
            {
                id:'2',
                userName:'lwq',
                sex:'女',
                state:'3',
                interest:'4',
                birthday:'2019-2-14',
                address:'河南',
                phoneNumber:'15698745698'
            },
            {
                id:'3',
                userName:'wxy',
                sex:'1',
                state:'2',
                interest:'3',
                birthday:'2019-2-14',
                address:'河南',
                phoneNumber:'15698745698'
            },
            {
                id:'4',
                userName:'zwh',
                sex:'1',
                state:'5',
                interest:'1',
                birthday:'2019-2-14',
                address:'河南',
                phoneNumber:'15698745698'
            }
        ]
        dataSource.map((item,index)=>{
            item.key = index;
        })
        this.setState({
            dataSource
        })
        this.request()
    }

    //动态获取mock数据
    request = ()=>{
        let _this=this;
        axios.ajax({
            url:'/table/list',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                res.result.list.map((item,index)=>{
                    item.key = index;
                })
                this.setState({
                    dataSource2:res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        this.request();
                    })
                })
            }
        })
    }

    onRowClick = (record,index) => {
        let selectKey = [index];
        Modal.info({
            title:'信息',
            content:`用户名：${record.userName},爱好:${record.interest}`
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }
    //多选删除操作
    handleDelete = (()=>{
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item)=>{
            ids.push(item.id)
        });
        Modal.confirm({
            title:'删除提示',
            content:`您确定要删除这些数据吗？${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功');
                this.request(); //刷新页面
            }
        })
    })

    render() {
        const columns = [
            {
                title:'id',
                dataIndex:'id'
            },{
                title:'用户名',
                dataIndex:'userName'
            },{
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex === 1 ? '男' : '女'
                }
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
                dataIndex:'birthday'
            },{
                title:'地址',
                dataIndex:'address'
            },{
                title:'联系方式',
                dataIndex:'phoneNumber'
            }
        ]
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type:'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type:'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectRows) => {
                let ids = [];
                selectedRowKeys.map((item)=>{
                    ids.push(item.id)
                })
                this.setState({
                    selectedRowKeys,
                    selectedIds:ids
                })
            }
        }
        return (
            <div>
                <Card title="基础表格">
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格" style={{marginTop:10}}>
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-单选" style={{marginTop:10}}>
                    <Table 
                        rowSelection={rowSelection}
                        onRow={(record,index)=>{
                            return {
                                onClick:() => { 
                                    this.onRowClick(record,index);
                                },//点击行
                            }
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-多选" style={{marginTop:10}}>
                    <div style={{marginBottom:10}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        rowSelection={rowCheckSelection}
                        onRow={(record,index)=>{
                            return {
                                onClick:() => {
                                    this.onRowClick(record,index);
                                },//点击行
                            }
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-表格分页" style={{marginTop:10}}>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }
}

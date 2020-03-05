import React, { Component } from 'react'
import {Card,Button,Form,Modal, message} from 'antd';
import axios from '../../axios/index'
import Utils from '../../util/utils'
import BaseForm from '../../components/BaseForm/index'
import ETable from './../../components/Etable/index'

export default class Order extends Component {
    state = {
        orderInfo:{},
        orderConfirmVisble:false,
    }
    params = {
        page:1
    }
    formList = [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:80,
            list:[{id:'0',name:'全部'},{id:'1',name:'北京'},{id:'2',name:'天津'},{id:'3',name:'上海'}]
        },
        {
            type:'时间查询',
            label:'订单时间',
        },
        {
            type:'SELECT',
            label:'订单状态',
            field:'order_status',
            placeholder:'全部',
            initialValue:'1',
            width:100,
            list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'结束进程'}]
        },
    ]
    componentDidMount(){
        this.requestList()
    }

    handleFilter = (params)=>{
        this.params = params;
        this.requestList();
    }

    requestList = ()=>{
        // let _this=this;
        axios.requestList(this,'/order/list',this.params,true)
    }
    //订单结束确认
    handleConfirm = ()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'提示信息',
                content:'请选择一条订单进行结束'
            })
            return;
        }
        axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisble:true
                })
            }
        })
    }
    //结束订单
    handleFindishOrder = ()=>{
        let item = this.state.selectedItem;
        axios.ajax({
            url:'/order/finish_order',
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                message.success('订单结束成功')
                this.setState({
                    orderConfirmVisble:false
                })
                this.requestList()
            }
        })
    }
    openOrderDetail = ()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'提示信息',
                content:'请先选择一条订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }
    render() {
        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title:'车辆编号',
                dataIndex:'bike_sn'
            },
            {
                title:'用户名',
                dataIndex:'user_name'
            },
            {
                title:'手机号',
                dataIndex:'mobile'
            },
            {
                title:'里程',
                dataIndex:'distance',
                render(distance){
                    return distance/1000 + 'Km'
                }
            },
            {
                title:'行驶时长',
                dataIndex:'total_time'
            },
            {
                title:'状态',
                dataIndex:'status',
                render(status){
                    return status === 1 ? '进行中' : '行驶结束'
                }
            },
            {
                title:'开始时间',
                dataIndex:'start_time'
            },
            {
                title:'结束时间',
                dataIndex:'end_time'
            },
            {
                title:'订单金额',
                dataIndex:'total_fee'
            },
            {
                title:'实付金额',
                dataIndex:'user_pay'
            },
        ]
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop : 10}}>
                    <Button type='primary' onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type='primary' style={{marginLeft:10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <ETable 
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedIds = {this.state.selectedIds}
                        selectedItem = {this.state.selectedItem}
                        pagination={this.state.pagination}
                        // rowSelection = "radio"
                    />
                </div>
                <Modal 
                    title='结束订单'
                    visible={this.state.orderConfirmVisble}
                    onCancel={()=>{
                        this.setState({
                            orderConfirmVisble:false
                        })
                    }}
                    onOk={this.handleFindishOrder}
                    width={600}
                >
                    <Form layout='horizontal' >
                        <Form.Item label='车辆编号' {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </Form.Item>
                        <Form.Item label='剩余电量' {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </Form.Item>
                        <Form.Item label='行程开始时间' {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </Form.Item>
                        <Form.Item label='当前位置' {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
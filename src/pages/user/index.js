import React, { Component } from 'react'
import {Card,Button,Modal, Input,Radio,DatePicker, Select,Form } from 'antd'
import axios from './../../axios'
import Utils from './../../util/utils'
import ETable from './../../components/Etable'
import BaseForm from '../../components/BaseForm'
import moment from 'moment'

const { TextArea } = Input;
const { Option } = Select;

export default class User extends Component {

    state = {
        isVisible:false
    }

    params = {
        page:1
    }

    formList = [
        {
            type:'INPUT',
            label:'用户名',
            field:'user_name',
            placeholder:'请输入用户名',
            width:130,
        },
        {
            type:'INPUT',
            label:'手机号',
            field:'user_mobile',
            placeholder:'请输入手机号',
            width:130,
        },
        {
            type:'DATE',
            label:'请选择入职日期',
            field:'user_date',
            placeholder:'请输入日期',
        }
    ]

    componentDidMount(){
        this.requestList()
    }

    handleFilter = (params)=>{
        this.params = params;
        this.requestList();
    }
    
    requestList = ()=>{
        axios.requestList(this,'/user/list',this.params,true)
    }

    //功能区操作
    handleOperate = (type)=>{
        let item = this.state.selectedItem;
        if(type === 'create'){
            this.setState({
                type,
                isVisible:true,
                title:'创建员工'
            })
        }else if(type === 'edit'){
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"请选择一个用户"
                })
                return;
            }
            this.setState({
                type,
                isVisible:true,
                title:'编辑员工',
                userInfo:item
            })
        }else if(type === 'detail'){
            this.setState({
                type,
                isVisible:true,
                title:'员工详情',
                userInfo:item
            })
        }else{
            if(!item){
                Modal.info({
                    title:"提示",
                    content:"请选择一个用户"
                })
                return;
            }
            let _this = this;
            Modal.confirm({
                title:'确认删除',
                content:'是否确认删除当前选中的员工',
                onOk(){
                    axios.ajax({
                        url:'/user/delete',
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then((res)=>{
                        if(res.code === 0){
                            _this.setState({
                                isVisible:false
                            })
                            _this.requestList();
                        }
                    })
                }
            })
        }
    }

    //创建员工提交
    handleSubmit = ()=>{
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url:type='create' ? '/user/add' : '/user/edit',
            data:{
                params:data
            }
        }).then((res)=>{
            if(res.code === 0){
                this.userForm.props.form.resetFields();
                this.setState({
                    isVisible:false
                })
                this.requestList();
            }
        })
    }
    render() {
        const columns = [
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'username'
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex === 1 ? '男' : '女'
                }
            },
            {
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
            },
            {
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
            },
            {
                title:'生日',
                dataIndex:'birthday'
            },
            {
                title:'联系地址',
                dataIndex:'address'
            },
            {
                title:'入职时间',
                dataIndex:'time'
            },
        ]
        let footer = {};
        if(this.state.type === 'detail'){
            footer = {
                footer:null
            }
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop : 10}}>
                    <Button type='primary' icon="plus" onClick={()=>this.handleOperate('create')}>创建员工</Button>
                    <Button type='primary' icon="edit" style={{marginLeft:10}} onClick={()=>this.handleOperate('edit')}>编辑员工</Button>
                    <Button type='primary' style={{marginLeft:10}} onClick={()=>this.handleOperate('detail')}>员工详情</Button>
                    <Button type='primary' icon="delete" style={{marginLeft:10}} onClick={()=>this.handleOperate('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable 
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem = {this.state.selectedItem}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal 
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible:false
                        })
                    }}
                    onOk={this.handleSubmit}
                    width={600}
                    {...footer}
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst)=>this.userForm = inst}/>
                </Modal>
            </div>
        )
    }
}
class UserForm extends Component {
    getState = (state)=>{
        return {
            '1' : '咸鱼一条',
            '2' : '风华浪子',
            '3' : '邻家妹妹',
            '4' : '白衣天使',
            '5' : '创业者'
        }[state]
    }
    render() {
        let type = this.props.type;
        let userInfo = this.props.userInfo || {};
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        return (
            <Form layout='horizontal' >
                <Form.Item label='用户名' {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.username :
                        getFieldDecorator('usename',{
                            initialValue:userInfo.username
                        })(
                            <Input type='text' placeholder="请输入用户名"/>
                        )
                    }
                </Form.Item>
                <Form.Item label='性别' {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.sex === 1 ?'男':'女' :
                        getFieldDecorator('sex',{
                            initialValue:userInfo.sex
                        })(
                            <Radio.Group>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                        )
                    }
                </Form.Item>
                <Form.Item label='状态' {...formItemLayout}>
                    {
                        type === 'detail' ? this.getState(userInfo.state) :
                        getFieldDecorator('state',{
                            initialValue:userInfo.state
                        })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>邻家妹妹</Option>
                                <Option value={4}>白衣天使</Option>
                                <Option value={5}>创业者</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label='生日' {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.birthday :
                        getFieldDecorator('birthday',{
                            initialValue:moment(userInfo.birthday)
                        })(
                            <DatePicker />
                        )
                    }
                </Form.Item>
                <Form.Item label='联系地址' {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.address :
                        getFieldDecorator('address',{
                            initialValue:userInfo.address
                        })(
                            <TextArea rows={4} placeholder="请输入联系地址"/>
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}
UserForm = Form.create({})(UserForm)


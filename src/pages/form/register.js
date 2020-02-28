import React, { Component } from 'react'
import { Card, Form,Input,Icon,Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Upload,message, Checkbox, Button   } from 'antd'
import moment from 'moment';

const RadioGroup = Radio.Group;
const { Option } = Select;
const TextArea = Input.TextArea;

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class Register extends Component {

    state = {};

    //注册按钮的点击事件
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo))
        message.success(`${userInfo.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.userPwd}`)
    }

    //图片上传
    getBase64 = (img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    userImg:imageUrl,
                    loading: false,
                }),
            );
        }
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        //定义偏移列
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">
                        <Form.Item label="用户名" {...formItemLayout}>
                            {getFieldDecorator('userName', {
                                initialValue:'',
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />}
                                    placeholder="请输入用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="密码" {...formItemLayout}>
                            {getFieldDecorator('userPwd', {
                                initialValue:'',
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />}
                                    placeholder="请输入密码"
                                    type="password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="性别" {...formItemLayout}>
                            {getFieldDecorator('sex', {
                                initialValue:'1',
                            })(
                                <RadioGroup>
                                    <Radio value="1">男</Radio>
                                    <Radio value="2">女</Radio>
                                </RadioGroup>
                            )}
                        </Form.Item>
                        <Form.Item label="年龄" {...formItemLayout}>
                            {getFieldDecorator('age', {
                                initialValue:'18',
                            })(
                                <InputNumber />
                            )}
                        </Form.Item>
                        <Form.Item label="当前状态" {...formItemLayout}>
                            {getFieldDecorator('state', {
                                initialValue:'1',
                            })(
                                <Select>
                                    <Option value="1">一条咸鱼</Option>
                                    <Option value="2">两条咸鱼</Option>
                                    <Option value="3">三条咸鱼</Option>
                                    <Option value="4">四条咸鱼</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="爱好" {...formItemLayout}>
                            {getFieldDecorator('like', {
                                initialValue:['1','2','3','4'],
                            })(
                                <Select mode='multiple'>
                                    <Option value="1">吃饭</Option>
                                    <Option value="2">听歌</Option>
                                    <Option value="3">睡</Option>
                                    <Option value="4">巴文博</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="是否已婚" {...formItemLayout}>
                            {getFieldDecorator('isMarried', {
                                valuePropName: 'checked',
                                initialValue:true,
                            })(
                                <Switch />
                            )}
                        </Form.Item>
                        <Form.Item label="生日" {...formItemLayout}>
                            {getFieldDecorator('birthday', {
                                initialValue:moment('2019-2-14'),
                            })(
                                <DatePicker 
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="联系地址" {...formItemLayout}>
                            {getFieldDecorator('address', {
                                initialValue:''
                            })(
                                <TextArea placeholder="请输入您的联系地址" autoSize={{ minRows: 3, maxRows: 5 }}/>
                            )}
                        </Form.Item>
                        <Form.Item label="早起时间" {...formItemLayout}>
                            {getFieldDecorator('time', {
                                initialValue:''
                            })(
                                <TimePicker />
                            )}
                        </Form.Item>
                        <Form.Item label="头像上传" {...formItemLayout}>
                            {getFieldDecorator('userImg', {
                                initialValue:''
                            })(
                                //action是官网的传地址
                                <Upload 
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {this.state.userImg ? <img src={this.state.userImg} alt="avatar" style={{ width: '100%' }} /> : <Icon type="plus"/>}
                                </Upload>
                            )}
                        </Form.Item>
                        <Form.Item {...offsetLayout}>
                            {getFieldDecorator('agree', {
                                initialValue:'',
                                rules: [{ required: true, message: '请阅读协议!' }],
                            })(
                                <Checkbox>我已同意<a href='#'>xxx协议</a></Checkbox>
                            )}
                        </Form.Item>
                        <Form.Item {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Register);

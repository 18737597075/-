import React from 'react'
import {Input,Select,Form,Button,Checkbox, DatePicker} from 'antd'
import utils from '../../util/utils';
// const { option } = Select;

class FilterForm extends React.Component{

    handleFilterSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset = ()=>{
        this.props.form.resetFields();
    }

    initFormList = ()=>{
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if(formList && formList.length>0){
            formList.forEach((item,i)=>{
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type === '城市') {
                    const city = <Form.Item label="城市" key={field}>
                        {
                            getFieldDecorator('city',{
                                initialValue:'0'
                            })(
                                <Select
                                    style={{width:80}}
                                    placeholder={placeholder}
                                >
                                    {utils.getOptionList([{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '上海' }, { id: '3', name: '天津' }, { id: '4', name: '杭州' }])}
                                </Select>
                            )
                        }
                    </Form.Item>;
                    formItemList.push(city)
                }else if(item.type === '时间查询'){
                    const begin_time = <Form.Item label='时间查询' key={field}>
                    {
                        getFieldDecorator('begin_time',{
                            initialValue:initialValue
                        })(
                            <DatePicker showTime={true} placeholder={placeholder} format='YYYY-MM-DD HH:mm:ss'/>
                        )
                    }
                </Form.Item>
                formItemList.push(begin_time)
                const end_time = <Form.Item label='~' colon={false} key={field}>
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker showTime={true} placeholder={placeholder} format='YYYY-MM-DD HH:mm:ss'/>
                        )
                    }
                </Form.Item>
                formItemList.push(end_time)
                }else if(item.type === 'INPUT'){
                    const INPUT = <Form.Item label={label} key={field}>
                    {
                        getFieldDecorator([field],{
                            initialValue:initialValue
                        })(
                            <Input type="text" style={{ width: width }} placeholder={placeholder} />
                        )
                    }
                </Form.Item>
                formItemList.push(INPUT)
                }else if(item.type === 'SELECT'){
                    const SELECT = <Form.Item label={label} key={field}>
                    {
                        getFieldDecorator([field],{
                            initialValue:initialValue
                        })(
                            <Select 
                                placeholder={placeholder}
                                style={{width:width}}
                            >
                                {utils.getOptionList(item.list)}
                            </Select>
                        )
                    }
                </Form.Item>
                formItemList.push(SELECT)
                }else if(item.type === 'CHECKBOX'){
                    const CHECKBOX = <Form.Item label={label} key={field}>
                    {
                        getFieldDecorator([field],{
                            valuePropName:'checked',
                            initialValue:initialValue
                        })(
                            <Checkbox>
                                {label}
                            </Checkbox>
                        )
                    }
                </Form.Item>
                formItemList.push(CHECKBOX)
                }else if(item.type === 'DATE'){
                    const Date = <Form.Item label={label} key={field}>
                    {
                        getFieldDecorator([field])(
                            <DatePicker showTime={true} placeholder={placeholder} format='YYYY-MM-DD HH:mm:ss'/>
                        )
                    }
                </Form.Item>
                formItemList.push(Date)
                }
            })
        }
        return formItemList
    }

    render(){
        return(
            <Form layout='inline'>
                {this.initFormList()}
                <Form.Item>
                    <Button type='primary' style={{margin:'0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </Form.Item>
            </Form>
        )
    }

}
export default Form.create({})(FilterForm)
import React, { Component } from 'react'
import {Card} from 'antd'
import echartTheme from './../echartTheme'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Line extends Component {
    componentWillMount(){
        echarts.registerTheme('Enjoy',echartTheme)
    }
    getOption = ()=>{
        let option = {
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[500,1000,700,2000,1500,3000,800]
                }
            ]
        }
        return option;
    }
    getOption2 = ()=>{
        let option = {
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            legend:{
                data:['白衣天使订单量','邻家妹妹订单量']
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'白衣天使订单量',
                    type:'line',
                    data:[700,1200,900,2200,1700,3200,1000]
                },
                {
                    name:'邻家妹妹订单量',
                    type:'line',
                    data:[500,1000,700,2000,1500,3000,800]
                }
            ]
        }
        return option;
    }
    getOption3 = ()=>{
        let option = {
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                boundaryGap: false,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[700,1200,900,2200,1700,3200,1000],
                    areaStyle:{}
                }
            ]
        }
        return option;
    }
    render() {
        return (
            <div>
                <Card title="折线图表之一">
                    <ReactEcharts option={this.getOption()} theme="Enjoy" style={{height:500}}/>
                </Card>
                <Card  title="折线图表之二" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="Enjoy" style={{height:500}}/>
                </Card>
                <Card  title="折线图表之三" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption3()} theme="Enjoy" style={{height:500}}/>
                </Card>
            </div>
        )
    }
}

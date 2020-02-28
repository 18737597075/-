import React, { Component } from 'react'
import {Card} from 'antd'
import echartTheme from './../echartTheme'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends Component {
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
                    type:'bar',
                    data:[1000,2000,3000,4500,2000,1500,1000]
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
            legend:{
                data:['白衣天使','邻家妹妹','御姐风范']
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
                    name:'白衣天使',
                    type:'bar',
                    data:[500,1000,1500,2000,2500,3000,3500]
                },{
                    name:'邻家妹妹',
                    type:'bar',
                    data:[300,700,1200,3000,2100,2000,1500]
                },{
                    name:'御姐风范',
                    type:'bar',
                    data:[200,800,1000,2500,3000,2800,2000]
                }
            ]
        }
        return option;
    }
    render() {
        return (
            <div>
                <Card title="柱形图表之一">
                    <ReactEcharts option={this.getOption()} theme="Enjoy" style={{height:500}}/>
                </Card>
                <Card  title="柱形图表之二" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="Enjoy" style={{height:500}}/>
                </Card>
            </div>
        )
    }
}

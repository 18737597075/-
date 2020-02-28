import React, { Component } from 'react'
import {Card} from 'antd'
import echartTheme from './../echartTheme'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Pie extends Component {
    componentWillMount(){
        echarts.registerTheme('Enjoy',echartTheme)
    }
    getOption = ()=>{
        let option = {
            title:{
                text:'用户骑行订单',
                x:'center'
            },
            legend:{
                orient:'vertical',
                right:10,
                top:20,
                bottom:20,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b}:{c}({d}%)'
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    data:[
                        {
                            value:1000,
                            name:'周一'
                        },
                        {
                            value:1800,
                            name:'周二'
                        },
                        {
                            value:2000,
                            name:'周三'
                        },
                        {
                            value:2100,
                            name:'周四'
                        },
                        {
                            value:2500,
                            name:'周五'
                        },
                        {
                            value:2800,
                            name:'周六'
                        },
                        {
                            value:3000,
                            name:'周日'
                        }
                    ]
                }
            ]
        }
        return option;
    }
    getOption2 = ()=>{
        let option = {
            title:{
                text:'用户骑行订单',
                x:'center'
            },
            legend:{
                orient:'vertical',
                right:10,
                top:20,
                bottom:20,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b}:{c}({d}%)'
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    radius:['50%','80%'],
                    data:[
                        {
                            value:1000,
                            name:'周一'
                        },
                        {
                            value:1800,
                            name:'周二'
                        },
                        {
                            value:2000,
                            name:'周三'
                        },
                        {
                            value:2100,
                            name:'周四'
                        },
                        {
                            value:2500,
                            name:'周五'
                        },
                        {
                            value:2800,
                            name:'周六'
                        },
                        {
                            value:3000,
                            name:'周日'
                        }
                    ]
                }
            ]
        }
        return option;
    }
    getOption3 = ()=>{
        let option = {
            title:{
                text:'用户骑行订单',
                x:'center'
            },
            legend:{
                orient:'vertical',
                right:10,
                top:20,
                bottom:20,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b}:{c}({d}%)'
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    radius:'55%',
                    data:[
                        {
                            value:1000,
                            name:'周一'
                        },
                        {
                            value:1800,
                            name:'周二'
                        },
                        {
                            value:2000,
                            name:'周三'
                        },
                        {
                            value:2100,
                            name:'周四'
                        },
                        {
                            value:2500,
                            name:'周五'
                        },
                        {
                            value:2800,
                            name:'周六'
                        },
                        {
                            value:3000,
                            name:'周日'
                        }
                    ].sort((a,b)=>{
                        return a.value - b.value
                    }),
                    roseType: 'radius',
                }
            ]
        }
        return option;
    }
    render() {
        return (
            <div>
                <Card title="饼图表之一">
                    <ReactEcharts option={this.getOption()} theme="Enjoy" style={{height:500}}/>
                </Card>
                <Card  title="饼图表之二" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="Enjoy" style={{height:500}}/>
                </Card>
                <Card  title="饼图表之三" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption3()} theme="Enjoy" style={{height:500}}/>
                </Card>
            </div>
        )
    }
}

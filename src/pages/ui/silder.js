import React, { Component } from 'react'
import{Card,Carousel} from 'antd'
import './ui.less'

export default class Silder extends Component {
    render() {
        return (
            <div>
                <Card title="文字轮播" style={{marginBottom:10}}>
                    <Carousel autoplay effect="fade">
                        <div><h3>今天天气很好！</h3></div>
                        <div><h3>今天心情很美丽！</h3></div>
                        <div><h3>今天状态还不错！</h3></div>
                        <div><h3>每天过得都很开心！</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="silder-warp">
                    <Carousel autoplay>
                        <div><img src="/carousel-img/carousel-1.jpg" alt="" style={{width:'100%',height:300}}/></div>
                        <div><img src="/carousel-img/carousel-2.jpg" alt="" style={{width:'100%',height:300}}/></div>
                        <div><img src="/carousel-img/carousel-3.jpg" alt="" style={{width:'100%',height:300}}/></div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}

import React, { Component } from 'react'
import './nofound.less'

export default class NoFound extends Component {
    render() {
        return (
            <div className="nofound-img">
                <img src="/assets/404.jpg" alt=""/>
            </div>
        )
    }
}

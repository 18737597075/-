import React, { Component } from 'react'
import{ HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Button from './pages/ui/button'
import NoFound from './pages/nofound/nofound'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Home from './pages/home'
import Notification from './pages/ui/notification'
import Message from './pages/ui/message'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Silder from './pages/ui/silder'
import FromLogin from './pages/form/login'
import Register from './pages/form/register'
import Basic from './pages/table/basic'
import High from './pages/table/high'
import City from './pages/city'
import Rich from './pages/rich'
import Order from './pages/order'
import Common from './common'
import OrderDetail from './pages/order/detail'
import User from './pages/user'
import bikeMap from './pages/map/bikeMap'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import Permission from './pages/permission'

export default class Router extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path='/common' render={()=>
                            <Common>
                                <Switch>
                                    <Route path='/common/order/detail/:orderId' component={OrderDetail} />
                                </Switch>
                            </Common>
                        } />
                        <Route path='/' render={()=>
                            <Admin>
                                <Switch>
                                    <Route path='/home' component={Home} />
                                    <Route path='/ui/buttons' component={Button} />
                                    <Route path='/ui/modals' component={Modals} />
                                    <Route path='/ui/loadings' component={Loadings} />
                                    <Route path='/ui/notification' component={Notification} />
                                    <Route path='/ui/messages' component={Message} />
                                    <Route path='/ui/tabs' component={Tabs} />
                                    <Route path='/ui/gallery' component={Gallery} />
                                    <Route path='/ui/carousel' component={Silder} />
                                    <Route path='/form/login' component={FromLogin} />
                                    <Route path='/form/reg' component={Register} />
                                    <Route path='/table/basic' component={Basic} />
                                    <Route path='/table/high' component={High} />
                                    <Route path='/city' component={City} />
                                    <Route path='/rich' component={Rich} />
                                    <Route path='/order' component={Order} />
                                    <Route path='/user' component={User} />
                                    <Route path='/bikeMap' component={bikeMap} />
                                    <Route path='/charts/bar' component={Bar} />
                                    <Route path='/charts/pie' component={Pie} />
                                    <Route path='/charts/line' component={Line} />
                                    <Route path='/permission' component={Permission} />
                                    <Redirect to='/home'/>
                                    <Route component={NoFound} />
                                </Switch>
                            </Admin>
                        } />
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}

import React from 'react'
import { withRouter } from 'react-router-dom'
import HeaderNav from './common/HeaderNav'
class Home extends React.Component {
    render() {
        return <><HeaderNav /></>
    }
}
export default withRouter(Home)
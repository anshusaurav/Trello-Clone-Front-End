import React from 'react'
import { withRouter } from 'react-router-dom'
import HeaderNav from './common/HeaderNav'
import HomeMainContainer from './home/HomeMainContainer'
class Home extends React.Component {
    render() {
        return (<>
            <HeaderNav toggleLoggedIn={this.props.toggleLoggedIn} />
            <HomeMainContainer />
        </>)
    }
}
export default withRouter(Home)
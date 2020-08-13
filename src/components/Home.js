import React from 'react'
import { withRouter } from 'react-router-dom'
import HeaderNav from './common/HeaderNav'
import HomeLeftSidebar from './home/HomeLeftSidebar'
class Home extends React.Component {
    render() {
        return (<>
            <HeaderNav />
            <HomeLeftSidebar />
        </>)
    }
}
export default withRouter(Home)
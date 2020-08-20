import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import HeaderNav from './common/HeaderNav'
import TeamMainContainer from './team/TeamMainContainer'
class SingleTeamPage extends Component {

    render() {

        return (
            <>
                <HeaderNav />
                <TeamMainContainer />
            </>
        )
    }
}
export default withRouter(SingleTeamPage)
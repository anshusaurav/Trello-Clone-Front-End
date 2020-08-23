import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import HeaderNav from './common/HeaderNav'
import BoardPlaygroundContainer from './playground/BoardPlaygroundContainer'
class SingleBoardPage extends Component {

    render() {
        return (
            <>
                <HeaderNav toggleLoggedIn={this.props.toggleLoggedIn} isLoggedIn={this.props.isLoggedIn} />
                <BoardPlaygroundContainer />
            </>
        )
    }
}
export default withRouter(SingleBoardPage)
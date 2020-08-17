import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import HeaderNav from './common/HeaderNav'
import BoardPlaygroundContainer from './playground/BoardPlaygroundContainer'
class SingleBoardPage extends Component {

    render() {
        return (
            <>
                <HeaderNav />
                <BoardPlaygroundContainer />
            </>
        )
    }
}
export default withRouter(SingleBoardPage)
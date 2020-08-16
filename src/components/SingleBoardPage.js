import React, { Component } from 'react'

import HeaderNav from './common/HeaderNav'
import BoardPlaygroundContainer from './playground/BoardPlaygroundContainer'
class SingleBoard extends Component {

    render() {
        return (
            <>
                <HeaderNav />
                <BoardPlaygroundContainer />
            </>
        )
    }
}
export default SingleBoard
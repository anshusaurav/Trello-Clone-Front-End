import React from 'react'
import { withRouter } from 'react-router-dom'
import HeaderNav from './common/HeaderNav'
import BoardsMainContainer from './boards/BoardsMainContainer'
class BoardsPage extends React.Component {
    render() {
        return (<>
            <HeaderNav toggleLoggedIn={this.props.toggleLoggedIn} isLoggedIn={this.props.isLoggedIn} />
            <BoardsMainContainer />
        </>)
    }
}
export default withRouter(BoardsPage)
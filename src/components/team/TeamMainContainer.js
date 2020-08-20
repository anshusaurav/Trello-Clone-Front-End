import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import TeamMain from './TeamMain'
class TeamMainContainer extends Component {
    render() {
        const teamSlug = this.props.match.params.slug;
        return (
            <TeamMain teamSlug={teamSlug} />
        )
    }
}
export default withRouter(TeamMainContainer)
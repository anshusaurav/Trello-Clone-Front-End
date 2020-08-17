import React, { Component } from 'react'
import { Icon, Button } from 'semantic-ui-react'
class SingleTeamPage extends Component {
    render() {
        return (
            <>
                <div className="tabbed-pane-header" >
                    <div className="tabbed-pane-header-wrapper">
                        <div className="tabbed-pane-header-content">
                            <div className="org-profile-avatar">
                                <Icon fluid size="massive" name="users" className="profile-icon" />
                            </div>
                            <div className="tabbed-pane-header-details">
                                <div className="js-current-details">
                                    <div className="team-name-div">
                                        <h1 className="team-name-header">
                                            Hiring
                                        </h1>
                                        <span className="team-name-header-span">
                                            <Icon fitted name="lock" className="visibility-icon" />
                                            Private
                                        </span>
                                        <span className="team-name-header-span">
                                            <Icon fitted name="globe" className="visibility-icon" />
                                            Public
                                        </span>
                                    </div>
                                    <div className="team-details-div">
                                        <p>Hiring and HR</p>
                                    </div>
                                    <Button icon='edit' content='Edit Team Profile' className="edit-team-btn" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default SingleTeamPage
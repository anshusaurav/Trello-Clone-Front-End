import React, { Component } from 'react';
import { Icon, Button, Tab } from 'semantic-ui-react'
class TeamMain extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = { team: null, isUpdated: false }
    }
    async saveTeam() {
        console.log("fetching team")
        const { teamSlug } = this.props;
        // const teamSlug = this.props.match.params.slug;
        console.log(teamSlug);
        const url = `http://localhost:4000/api/teams/${teamSlug}`;
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/JSON",
                    Authorization: `Token ${jwttoken}`,
                },
            });
            const data = await response.json();
            console.log(data);
            if (!data.errors) {
                this.setState({ team: data.team });
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    componentDidMount() {
        this.saveTeam();
    }
    render() {
        const { team } = this.state;
        return (
            <>
                {
                    team && <div className='complete-div-team'>
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
                                                    {team.name}
                                                </h1>
                                                {/* <span className="team-name-header-span">
                                            <Icon fitted name="lock" className="visibility-icon" />
                                            Private
                                        </span>
                                        <span className="team-name-header-span">
                                            <Icon fitted name="globe" className="visibility-icon" />
                                            Public
                                        </span> */}
                                            </div>
                                            <div className="team-details-div">
                                                <p>{team.description ? team.description : ''}</p>
                                            </div>
                                            <Button icon='edit' content='Edit Team Profile' className="edit-team-btn" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Tab panes={[
                                {
                                    menuItem: { key: 'users', icon: 'trello', content: 'Users' },
                                    render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
                                },
                                {
                                    menuItem: { key: 'users', icon: 'users', content: 'Members' },
                                    render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
                                },
                                {
                                    menuItem: { key: 'users', icon: 'settings', content: 'Settings' },
                                    render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
                                },
                            ]} />
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default TeamMain;
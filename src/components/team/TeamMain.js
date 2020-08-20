import React, { Component } from 'react';
import { Icon, Button, Menu } from 'semantic-ui-react'
import TeamMembers from './TeamMembers';
import TeamBoards from './TeamBoards';
import TeamSettings from './TeamSettings'
class TeamMain extends Component {


    constructor(props) {
        super(props);
        this.state = { team: null, isUpdated: false, activeItem: 'Boards' }
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
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
        const { team, activeItem } = this.state;
        return (
            <>
                {
                    team && <div className='complete-div-team' >
                        <div className="tabbed-pane-header" >
                            <div className="tabbed-pane-header-wrapper">
                                <div className="tabbed-pane-header-content">
                                    <div className="org-profile-avatar">
                                        <Icon
                                            fluid
                                            size="massive"
                                            name="users"
                                            className="profile-icon" />
                                    </div>
                                    <div className="tabbed-pane-header-details">
                                        <div className="js-current-details">
                                            <div className="team-name-div">
                                                <h1 className="team-name-header">
                                                    {team.name}
                                                </h1>
                                                {/* 
                                                    <span className="team-name-header-span">
                                                        <Icon fitted name="lock" className="visibility-icon" />
                                                        Private
                                                    </span>
                                                    <span className="team-name-header-span">
                                                        <Icon fitted name="globe" className="visibility-icon" />
                                                        Public
                                                    </span> 
                                                */}
                                            </div>
                                            <div className="team-details-div">
                                                <p>{team.description ? team.description : ''}</p>
                                            </div>
                                            <Button
                                                icon='edit'
                                                content='Edit Team Profile'
                                                className="edit-team-btn" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Menu pointing secondary>
                                <Menu.Item
                                    icon='users'
                                    name='Members'
                                    active={activeItem === 'Members'}
                                    onClick={this.handleItemClick}
                                ></Menu.Item>
                                <Menu.Item
                                    icon='trello'
                                    name='Boards'
                                    active={activeItem === 'Boards'}
                                    onClick={this.handleItemClick}
                                />
                                <Menu.Item
                                    icon='settings'
                                    name='Settings'
                                    active={activeItem === 'Settings'}
                                    onClick={this.handleItemClick}
                                />

                            </Menu>

                        </div>
                        <div
                            className='settings-main-section'
                        >
                            {activeItem === 'Members' ? (
                                <TeamMembers teamSlug={team.slug} />
                            ) : activeItem === 'Boards' ? (
                                <TeamBoards teamSlug={team.slug} />
                            ) : activeItem === 'Settings' ? (
                                <TeamSettings teamSlug={team.slug} />
                            ) : null}
                        </div>
                    </div>
                }
            </>

        )
    }
}

export default TeamMain;
import React, { Component } from 'react';
import { Icon, Button, Menu } from 'semantic-ui-react'
import TeamMembers from './TeamMembers';
import TeamBoards from './TeamBoards';
import TeamSettings from './TeamSettings'
import { FullPageImageLoader } from './../loaders'
class TeamMain extends Component {


    constructor(props) {
        super(props);
        this.state = { team: null, isUpdated: false, activeItem: 'Members' }
    }
    toggleUpdate = () => this.setState({ isUpdated: !this.state.isUpdated })
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    handleSettingsclick = () => this.setState({ activeItem: 'Settings' });

    async saveTeam() {
        console.log("fetching team")
        const { teamSlug } = this.props;
        const url = `https://trello-clone-mern.herokuapp.com/api/teams/${teamSlug}`;
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
    componentDidUpdate(prevProps, prevState) {
        if (this.state.isUpdated !== prevState.isUpdated)
            this.saveTeam();
    }
    render() {
        const { team, activeItem } = this.state;
        return (
            <>
                {
                    team ? (<div className='complete-div-team' >
                        <div className="tabbed-pane-header" >
                            <div className="tabbed-pane-header-wrapper">
                                <div className="tabbed-pane-header-content">
                                    <div className="org-profile-avatar">
                                        <Icon
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


                                            </div>
                                            <div className="team-details-div">
                                                <p>{team.description ? team.description : ''}</p>
                                            </div>
                                            <div className="team-details-div">
                                                <span className="team-name-header-span">
                                                    <Icon fitted name="chess king" className="visibility-icon" />
                                                        Created by {team.owner.fullname}
                                                </span>
                                            </div>
                                            <Button
                                                icon='edit'
                                                content='Edit Team Profile'
                                                className="edit-team-btn"
                                                onClick={this.handleSettingsclick}
                                            />
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
                                <TeamSettings teamSlug={team.slug} toggleUpdate={this.toggleUpdate} />
                            ) : null}
                        </div>
                    </div>
                    ) : (FullPageImageLoader())
                }
            </>

        )
    }
}

export default TeamMain;
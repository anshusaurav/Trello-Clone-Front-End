import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
class TeamMembers extends Component {

    constructor(props) {
        super(props);
        this.state = { team: null }
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
            // <>
            //     {
            //         team && team.owner && <p> {team.owner.fullname}</p>
            //     }

            // </>
            <div className="org-member-wrapper">
                <div className="org-members-page-layout">
                    <div className="org-members-page-layout-list">

                        <div className="org-members-section">
                            <div className="org-members-actions-header">
                                <h1 className="org-members-header">
                                    <span>
                                        Team Members
                                    </span>
                                    <span>
                                        &nbsp;
                                    </span>
                                    <span>
                                        (2)
                                    </span>
                                </h1>
                                <p className="org-members-description">
                                    <span>
                                        Team members can view and join all Team Visible boards and create new boards in the team.
                                    </span>
                                </p>
                            </div>
                            <div className="org-members-actions">
                                <div className="org-members-actions-search">
                                    <Button icon='add user' content='Invite Team Members' color='green' />
                                </div>
                            </div>

                        </div>
                        <div className="org-members-list">
                            <div className="member-list-item-detail">
                                <div className="member-no-menu">
                                    <span className="member-initials">AS</span>
                                </div>
                                <div className="details">
                                    <p className="name-line"><span>Anshu Saurabh</span></p>
                                    <p className="user-line"><span>anshusaurav</span></p>
                                </div>
                                <div className="options">
                                    <Button icon='remove user' content='Remove' />
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>

        )
    }

}
export default TeamMembers;
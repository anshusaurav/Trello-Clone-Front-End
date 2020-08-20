import React, { Component } from 'react'

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
            <div>
                <div className="org-members-page-layout">

                </div>
            </div>

        )
    }

}
export default TeamMembers;
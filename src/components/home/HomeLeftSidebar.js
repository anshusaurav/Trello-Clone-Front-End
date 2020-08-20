import React from 'react';
import { List, Button, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PopUpAddTeam from './../common/PopUpAddTeam'
class HomeLeftSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            teams: null,
            isUpdated: false,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
    }
    toggleUpdate() {
        this.setState({ isUpdated: !this.state.isUpdated })
    }
    handleOpen() {
        this.setState({ isOpen: true });
    }
    handleClose() {
        this.setState({ isOpen: false });
    }
    async saveTeams() {
        const url = 'http://localhost:4000/api/teams'
        const { jwttoken } = localStorage
        console.log(jwttoken)
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/JSON',
                    Authorization: `Token ${jwttoken}`
                }
            })
            const data = await response.json()
            if (!data.errors) {
                const teams = data.teams.map(team => {
                    return { slug: team.slug, name: team.name, value: team.id };
                })
                this.setState({ teams })
            }
        } catch (error) {
            console.error('Error: ' + error)
        }
    }
    componentDidMount() {
        this.saveTeams();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isUpdated !== this.state.isUpdated) {
            this.saveTeams();
        }
    }
    render() {
        const { isOpen, teams } = this.state;
        return (
            <>
                <List link>
                    <List.Item as={Link} to='/boards'>
                        <List.Icon name='trello' />
                        <List.Content>
                            <List.Header>Boards</List.Header>
                        </List.Content>
                    </List.Item>

                    <List.Item as={Link} active to='/'>
                        <List.Icon name='home' />
                        <List.Content>
                            <List.Header>Home</List.Header>
                        </List.Content>
                    </List.Item>
                </List>
                <p>TEAMS</p>
                <Popup
                    basic
                    on="click"
                    open={isOpen}
                    onOpen={this.handleOpen}
                    style={{
                        position: "fixed",
                        minWidth: "100vw",
                        minHeight: "100vh",
                        top: -1,
                        left: -1,
                        bottom: 0,
                        right: 0,
                        transform: "none",
                        marginTop: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                    trigger={<Button icon='plus' content='Create a team' className='add-team-btn' />}
                >
                    <PopUpAddTeam
                        handleClose={this.handleClose}
                        toggleUpdate={this.toggleUpdate}
                    />
                </Popup>
                <List link className='left-sidebar-team-list'>
                    {
                        teams && teams.map(team => {
                            return (
                                <List.Item as={Link} to={`/teams/${team.slug}`} key={team.slug}>
                                    <List.Icon name='users' />
                                    <List.Content>
                                        <List.Header>{team.name}</List.Header>
                                    </List.Content>
                                </List.Item>
                            )
                        })
                    }
                </List>
            </>
        )
    }
}
export default HomeLeftSidebar;
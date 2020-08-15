import React from 'react';
import { List, Button, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PopUpAddTeam from './../common/PopUpAddTeam'
class BoardsLeftSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleOpen() {
        this.setState({ isOpen: true });
    }
    handleClose() {
        this.setState({ isOpen: false });
    }
    render() {
        const { isOpen } = this.state;
        return (
            <>
                <List link>
                    <List.Item active>
                        <List.Icon name='trello' />
                        <List.Content>
                            <List.Header>Board</List.Header>
                        </List.Content>
                    </List.Item>
                    <List.Item as={Link} to='/'>
                        <List.Icon name='theme' />
                        <List.Content>

                            <List.Header>Templates</List.Header>
                        </List.Content>
                    </List.Item>
                    <List.Item as={Link} to='/'>
                        <List.Icon name='home' />
                        <List.Content>
                            <List.Header>Home</List.Header>
                        </List.Content>
                    </List.Item>
                </List>
                <p>TEAMS</p>
                <Popup
                    on="click"
                    open={isOpen}
                    onOpen={this.handleOpen}
                    style={{
                        position: "fixed",
                        minWidth: "100vw",
                        minHeight: "100vh",
                        top: -2,
                        left: -2,
                        bottom: -2,
                        right: -2,
                        transform: "none",
                        marginTop: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                    trigger={<Button icon='plus' content='Create a team' className='add-team-btn' />}
                >
                    <PopUpAddTeam
                        handleClose={this.handleClose}
                    />
                </Popup>
            </>
        )
    }
}
export default BoardsLeftSidebar;
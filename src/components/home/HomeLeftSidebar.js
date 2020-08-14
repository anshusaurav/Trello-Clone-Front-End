import React from 'react';
import { List, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
class HomeLeftSidebar extends React.Component {
    render() {

        return (
            <>
                <List link>
                    <List.Item as={Link} to='/boards'>
                        <List.Icon name='trello' />
                        <List.Content>
                            <List.Header>Board</List.Header>
                        </List.Content>
                    </List.Item>
                    <List.Item as={Link}>
                        <List.Icon name='theme' />
                        <List.Content>

                            <List.Header>Templates</List.Header>
                        </List.Content>
                    </List.Item>
                    <List.Item active>
                        <List.Icon name='home' />
                        <List.Content>
                            <List.Header>Home</List.Header>
                        </List.Content>
                    </List.Item>
                </List>
                <p>TEAMS</p>
                <Button icon='plus' content='Create a team' className='add-team-btn' />
            </>
        )
    }
}
export default HomeLeftSidebar;
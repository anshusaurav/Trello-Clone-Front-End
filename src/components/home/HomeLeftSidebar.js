import React from 'react';
import { List, Button } from 'semantic-ui-react'
class HomeLeftSidebar extends React.Component {
    render() {

        return (
            <>
                <List link>
                    <List.Item active>
                        <List.Icon name='trello' />
                        <List.Content>
                            <List.Header>Board</List.Header>
                        </List.Content>
                    </List.Item>
                    <List.Item as='a'>
                        <List.Icon name='theme' />
                        <List.Content>

                            <List.Header>Templates</List.Header>
                        </List.Content>
                    </List.Item>
                    <List.Item as='a'>
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
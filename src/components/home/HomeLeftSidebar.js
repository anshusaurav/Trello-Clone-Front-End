import React from 'react';
import { List } from 'semantic-ui-react'
class HomeLeftSidebar extends React.Component {
    render() {
        return (
            <List link >
                <List.Item active>
                    <List.Icon name='trello' />
                    <List.Header>Board</List.Header>
                </List.Item>
                <List.Item as='a'>
                    <List.Icon name='theme' />
                    <List.Header>Templates</List.Header>
                </List.Item>
                <List.Item as='a'>
                    <List.Icon name='home' />
                    <List.Header>Home</List.Header>
                </List.Item>
            </List>
        )
    }
}
export default HomeLeftSidebar;
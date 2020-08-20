import React from 'react'
import { Icon, Button, Popup } from 'semantic-ui-react'
import PopUpAddBoard from './../common/PopUpAddBoard'
class HomeRightSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            updated: false
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
    }
    toggleUpdate() {
        this.setState({ updated: !this.state.updated })
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
            <div className='home-right-sidebar-outer'>
                <div className='home-right-sidebar-inner'>
                    <div className='home-right-sidebar-first'>
                        <div className='home-right-sidebar-viewed'>
                            <Icon name='clock outline'
                                size='large'>
                            </Icon>
                            <h2>
                                Recenty Viewed
                            </h2>
                        </div>
                    </div>
                    <div className='home-right-sidebar-second'>
                        <p>LINKS</p>
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
                            trigger={<Button
                                icon='plus'
                                content='Create a board'
                                className='add-board-btn' />
                            }
                        >
                            <PopUpAddBoard
                                handleClose={this.handleClose}
                                toggleUpdate={this.toggleUpdate}
                            />
                        </Popup>
                    </div>
                </div>
            </div>
        )
    }
}
export default HomeRightSidebar;
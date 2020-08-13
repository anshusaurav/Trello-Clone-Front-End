import React from 'react';
import BoardsLeftSidebar from './BoardsLeftSidebar';
import BoardsMainContentContainer from './BoardsMainContentContainer';
class BoardsMainContainer extends React.Component {
    render() {
        return (
            <div className='home-container'>
                <div className="home-sticky-container">
                    <div className='left-sidebar-sticky'>
                        <div className="left-sidebar-container">
                            <BoardsLeftSidebar />
                        </div>

                    </div>
                    <div className="all-boards">
                        <div className='all-boards-sticky'>
                            <BoardsMainContentContainer />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default BoardsMainContainer;
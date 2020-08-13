import React from 'react';
import HomeLeftSidebar from './HomeLeftSidebar';
import HomeMainContentContainer from './HomeMainContentContainer';
class HomeMainContainer extends React.Component {
    render() {
        return (
            <div className='home-container'>
                <div className="home-sticky-container">
                    <div className='left-sidebar-sticky'>
                        <div className="left-sidebar-container">
                            <HomeLeftSidebar />
                        </div>

                    </div>
                    <div className="all-boards">
                        <div className='all-boards-sticky'>
                            <HomeMainContentContainer />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default HomeMainContainer;
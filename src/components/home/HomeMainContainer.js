import React from 'react';
import HomeLeftSidebar from './HomeLeftSidebar';
import HomeMainContentContainer from './HomeMainContentContainer';
import HomeRightSidebar from './HomeRightSidebar';
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
                    <HomeMainContentContainer />
                    <HomeRightSidebar />
                </div>
            </div>
        )
    }
}
export default HomeMainContainer;
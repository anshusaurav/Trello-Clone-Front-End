import React from 'react'
import { Icon } from 'semantic-ui-react'
class HomeRightSidebar extends React.Component {
    render() {
        return (
            <div className='home-right-sidebar-outer'>
                <div className='home-right-sidebar-inner'>
                    <div className='home-right-sidebar-first'>
                        <div className='home-right-sidebar-viewed'>
                            <Icon name='clock outline' size='large'>

                            </Icon>
                            <h2>
                                Recenty Viewed
                            </h2>

                        </div>
                    </div>
                    <div className='home-right-sidebar-second'>

                    </div>
                </div>
            </div>
        )
    }
}
export default HomeRightSidebar;
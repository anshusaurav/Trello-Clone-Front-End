import React from 'react';
import { Icon } from 'semantic-ui-react'
class HomeMainContentContainer extends React.Component {
    render() {
        const recent = ["New SDEs", "Company Overview", "Balu"];
        const personal = ["Balu", "Company Overview"];
        const hiring = ["New Hiring"];
        const marketing = [];
        const src = 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1152/b636e51cb79969dcdba81217c5072172/photo-1596788571133-8d8b42ba200b.jpg';
        return (
            <div className="content-all-boards">
                <div>
                    <div className="boards-page-board-section mod-no-sidebar">
                        <div className="boards-page-board-section-header">
                            <Icon name='clock outline'>

                            </Icon>
                            <h2>
                                RecentyViewed
                            </h2>

                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
export default HomeMainContentContainer;
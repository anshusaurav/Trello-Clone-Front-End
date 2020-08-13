import React from 'react'
class GlobalFooter extends React.Component {
    render() {
        return (
            <footer className="global-footer">
                <p className="global-footer-detail">
                    <img alt="atlassian-logo-small" className="atlassian-logo-small white" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/e4e8fa01ba058bce8e9f2bb7459516f9/atlassian-logo-white-small.svg" width="150" />
                    <img alt="atlassian-logo-small" className="atlassian-logo-small" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/6cdbcb3dcf82bba860f1768d184161ee/atlassian-logo-gray-small.svg" width="150" />
                    &nbsp;© Copyright 2020. All rights reserved.
                </p>
            </footer>
        )
    }
}
export default GlobalFooter;
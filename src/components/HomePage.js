import React from 'react'
import { withRouter } from 'react-router-dom'
import BottomHomePageUnauthenticated from './common/BottomHomePageUnauthenticated'
import HeaderHomePageUnauthenicated from './common/HeaderHomePageUnauthenticated'
import HeroHomePageUnauthenicated from './common/HeroHomePageUnauthenicated'
import GlobalFooter from './common/GlobalFooter'
class HomePage extends React.Component {
    render() {
        return (
            <>
                <HeaderHomePageUnauthenicated />
                <HeroHomePageUnauthenicated />
                <BottomHomePageUnauthenticated />
                <GlobalFooter />

            </>
        )
    }
}
export default withRouter(HomePage);

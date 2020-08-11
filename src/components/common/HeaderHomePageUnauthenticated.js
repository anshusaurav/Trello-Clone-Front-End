import React from 'react'
import { Link } from 'react-router-dom'
import logo from './../../trello-logo-blue.svg'
import { Button } from 'semantic-ui-react'
class HeaderHomePageUnauthenicated extends React.Component {
    render() {
        return (
            <header class="fixed-top">
                <nav class="navbar py-3" data-track-group="Global Header">
                    <Link to="/" className='float-left'>
                        <img alt="Trello" className='trello-main-logo' src={logo}></img>
                    </Link>
                    <div class="d-none d-md-block recommend">
                    </div>
                    <div class="float-right buttons">
                        <Link to="/signin">
                            <Button>Log In</Button>
                        </Link>
                        <Link href="/signup">
                            <Button>Sign Up</Button>
                        </Link>
                    </div>
                </nav>
            </header>);
    }
}
export default HeaderHomePageUnauthenicated
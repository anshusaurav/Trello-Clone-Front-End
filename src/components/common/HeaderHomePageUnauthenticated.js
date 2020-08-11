import React from 'react'
import { Link } from 'react-router-dom'
import logo from './../../images/trello-logo-white.svg'
import { Button } from 'semantic-ui-react'
class HeaderHomePageUnauthenicated extends React.Component {
    render() {
        return (
            <header className="fixed-top">
                <nav className="navbar">
                    <Link to="/" className='float-left'>
                        <img alt="Trello" className='trello-main-logo' src={logo} />
                    </Link>
                    <div className="mid-block">
                    </div>
                    <div className="float-right">
                        <Link to="/signin">
                            <Button size='large'>Log In</Button>
                        </Link>
                        <Link to="/signup">
                            <Button basic size='large'>Sign Up</Button>
                        </Link>
                    </div>
                </nav>
            </header>);
    }
}
export default HeaderHomePageUnauthenicated
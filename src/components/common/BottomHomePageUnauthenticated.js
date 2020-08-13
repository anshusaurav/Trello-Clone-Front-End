import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Button } from 'semantic-ui-react'
class BottomHomePageUnauthenticated extends React.Component {
    render() {
        return (
            <div className="home-page-bottom">
                <section className="home-page-get-started">
                    <div className="home-page-bottom-container">
                        <div className="home-page-bottom-row">
                            <div className="home-bottom-inner-div">
                                <h3>
                                    Start Planning Today
                                </h3>
                                <p>
                                    Sign up and become one of the millions of people around the world using Trello to get more done.
                                </p>
                                <Link to="/signup" >
                                    Get Started – It’s Free!
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        );
    }
}
export default BottomHomePageUnauthenticated;
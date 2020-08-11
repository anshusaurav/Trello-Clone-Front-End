import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Button } from 'semantic-ui-react'
class HeroHomePageUnauthenicated extends React.Component {
    render() {
        return (<section className="hero-home-page">
            <div className="hero-home-page-container">
                <div className="hero-home-inner-div">
                    <div class="hero-home-inner-text">
                        <h1>Trello lets you work more collaboratively and get more done.</h1>
                        <p class="lead">Trello’s boards, lists, and cards enable you to organize and prioritize your projects in a fun, flexible, and rewarding way.</p>
                    </div>
                    <div className="hero-home-inner-img">
                        <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/308998dcb3ed5ab3d01217a4d24ffa03/hero-a.svg" width="582" class="img-fluid" alt="" />
                    </div>
                    <form className="hero-home-form" method="POST" action="/signup_redirect">
                        <Input size='big' name="email" className="hero-home-form-input" type="email" placeholder="Email" />
                        <button className="hero-home-form-btn">
                            Sign Up – It’s Free!
                        </button>
                    </form>
                </div>
            </div>
        </section >);
    }
}
export default HeroHomePageUnauthenicated;
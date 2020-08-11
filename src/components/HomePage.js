import React from 'react'
import { withRouter } from 'react-router-dom'

class HomePage extends React.Component {
    render() {
        return (<section id="hero">
            <div class="container pt-7 pb-6 text-white">
                <div class="row align-items-center text-center text-md-left">
                    <div class="col-lg-5">
                        <h1>Trello lets you work more collaboratively and get more done.</h1>
                        <p class="lead">Trello’s boards, lists, and cards enable you to organize and prioritize your projects in a fun, flexible, and rewarding way.</p>
                    </div>
                    <div className="col-lg-6 offset-lg-1">
                        <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/308998dcb3ed5ab3d01217a4d24ffa03/hero-a.svg" width="582" class="img-fluid" alt="" />
                    </div>
                    <form class="quick-signup" method="POST" action="/signup_redirect">
                        <input name="email" class="quick-signup-email" type="email" placeholder="Email" />
                        <button type="submit" data-analytics-button="greenSignupHeroButton" class="btn btn-wrap btn-success btn-lg px-4">
                            Up – It’s Free!
                         </button>
                    </form>
                </div>
            </div>
        </section>)
    }
}
export default withRouter(HomePage);
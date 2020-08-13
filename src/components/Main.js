import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import React from 'react'
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm'
import Home from './Home'
import HomePage from './HomePage'
// import ForgotPasswordForm from './components/ForgotPasswordForm'
class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false
        }
        this.toggleLoggedIn = this.toggleLoggedIn.bind(this)
    }
    toggleLoggedIn() {
        this.setState({ isLoggedIn: !this.state.isLoggedIn })
    }
    componentDidMount() {
        if (
            localStorage.getItem('jwttoken') &&
            localStorage.getItem('loggedInUser')
        )
            this.setState({ isLoggedIn: true })
    }
    render() {
        const { jwttoken } = localStorage;

        return (
            <Router>
                <Switch>
                    <Route exact path='/signin'>
                        {!jwttoken ? <SignInForm toggleLoggedIn={this.toggleLoggedIn} />
                            : <Redirect to='/' />
                        }
                    </Route>
                    <Route exact path='/signup'>
                        {!jwttoken ? <SignUpForm toggleLoggedIn={this.toggleLoggedIn} />
                            : <Redirect to='/' />
                        }
                    </Route>
                    <Route exact path='/forgot'>
                        {!jwttoken ? <ForgotPasswordForm toggleLoggedIn={this.toggleLoggedIn} />
                            : <Redirect to='/' />
                        }
                    </Route>
                    <Route exact path='/'>
                        {!jwttoken ? <HomePage />
                            : < Home toggleLoggedIn={this.toggleLoggedIn} />
                        }
                    </Route>
                </Switch>
            </Router>
        )
    }
}
export default Main
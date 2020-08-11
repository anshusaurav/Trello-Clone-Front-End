import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm'
// import ForgotPasswordForm from './components/ForgotPasswordForm'
class Main extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/signin'>
                        <SignInForm />
                    </Route>
                    <Route exact path='/signup'>
                        <SignUpForm />
                    </Route>
                    <Route exact path='/forgot'>
                        <ForgotPasswordForm />
                    </Route>
                </Switch>
            </Router>
        )
    }
}
export default Main
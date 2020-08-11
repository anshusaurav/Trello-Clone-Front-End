import React from 'react';
import './App.css';
import './../src/scss/index.scss'
import 'semantic-ui-css/semantic.min.css'
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import ForgotPasswordForm from './components/ForgotPasswordForm'
function App() {
  return (
    <ForgotPasswordForm />
  );
}

export default App;

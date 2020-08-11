import React from 'react';
import logo from './../../trello-logo-blue.svg'
class CustomFormHeader extends React.Component {
    render() {
        return (
            <img alt="Trello" className="trello-main-logo" src={logo}></img>
        )
    }
}
export default CustomFormHeader;
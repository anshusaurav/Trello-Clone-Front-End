import React, { Component } from 'react'
// import { Icon } from 'semantic-ui-react';
class AddIssueForm extends Component {
    render() {
        return (
            <form className='card-composer'>
                <div className='card-compose-area-div'>
                    <textarea className='card-compose-area-input'
                        placeholder='Enter  a title for this card...'>
                    </textarea>
                </div>
                <div className='card-controllers'>
                    <div className='card-control-section'>
                        <input type='submit' className='card-add-input-btn' value='Add Card' />
                    </div>
                    {/* <div className='card-control-close-div'>
                        <Icon fluid size='big' fitted name='x' className='card-control-close-btn'></Icon>
                    </div> */}
                    {/* <span className='card-control-close-btn'>X</span> */}
                </div>
            </form>
        )
    }
}
export default AddIssueForm
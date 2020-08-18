import React, { Component } from 'react'
// import { Icon } from 'semantic-ui-react';
class AddListForm extends Component {
    render() {
        return (
            <form className='list-composer'>
                <div className='list-compose-area-div'>
                    <textarea className='list-compose-area-input'
                        placeholder='Enter  a title for this card...'>
                    </textarea>
                </div>
                <div className='list-controllers'>
                    <div className='list-control-section'>
                        <input type='submit' className='list-add-input-btn' value='Add Card' />
                    </div>
                    {/* <div className='list-control-close-div'>
                        <Icon fluid size='big' fitted name='x' className='list-control-close-btn'></Icon>
                    </div> */}
                    {/* <span className='card-control-close-btn'>X</span> */}
                </div>
            </form>
        )
    }
}
export default AddListForm
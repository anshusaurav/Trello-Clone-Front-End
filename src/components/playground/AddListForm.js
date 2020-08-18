import React, { Component } from 'react'
// import { Icon } from 'semantic-ui-react';
class AddListForm extends Component {
    render() {
        return (
            <form className='list-composer'>
                <div className='list-compose-area-div'>
                    <textarea className='list-compose-area-input'
                        placeholder='Enter a title for this card...'>
                    </textarea>
                </div>
                <div className='list-controllers'>
                    <div className='list-control-section'>
                        <input type='submit' className='list-add-input-btn' value='Add Card' />
                    </div>

                </div>
            </form>
        )
    }
}
export default AddListForm
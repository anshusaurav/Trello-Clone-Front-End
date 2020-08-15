import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
class PopUpAddBoard extends React.Component {

    render() {
        const teams = [
            {
                key: 'No Team',
                text: 'No Team',
                value: 'No Team',
            },
            {
                key: 'Jenny Hess',
                text: 'Jenny Hess',
                value: 'Jenny Hess',
            },
            {
                key: 'Elliot Fu',
                text: 'Elliot Fu',
                value: 'Elliot Fu',
            },
            {
                key: 'Stevie Feliciano',
                text: 'Stevie Feliciano',
                value: 'Stevie Feliciano',

            },
            {
                key: 'Elliot Fu',
                text: 'Elliot Fu',
                value: 'Elliot Fu',
            },
            {
                key: 'Stevie Feliciano',
                text: 'Stevie Feliciano',
                value: 'Stevie Feliciano',

            },

        ]
        const arrBG = ['https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
            'https://images.pexels.com/photos/870711/pexels-photo-870711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
            'https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
            'https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg?cs=srgb&dl=pexels-tahir-shaw-186980.jpg&fm=jpg',
            'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?cs=srgb&dl=pexels-julius-silver-753626.jpg&fm=jpg',
            'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
            'https://images.pexels.com/photos/870711/pexels-photo-870711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
            'https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
            'https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg?cs=srgb&dl=pexels-tahir-shaw-186980.jpg&fm=jpg',]
        return (
            <div className="popup-add-board-form-card">
                <div className="popup-add-board-outer">
                    <div className="popup-add-board-inner">
                        <form className="create-board-form">
                            <div className="create-board-form-container">
                                <div className="create-board-tile">
                                    <button className="create-board-popup-close-btn">
                                        X
                                    </button>
                                    <div>
                                        <input placeholder="Add board title" className="board-pop-up-input"></input>
                                    </div>
                                    <div>
                                        <Dropdown
                                            inline
                                            options={teams}
                                            defaultValue={teams[0].value}

                                        />
                                    </div>
                                    <div>
                                        <button className='add-board-private-btn'>
                                            <Icon name="lock" className="add-board-i-btn"></Icon>
                                            Private

                                        </button>
                                        <button className='add-board-private-btn'>
                                            <Icon name="globe" className="add-board-i-btn"></Icon>
                                            Public

                                        </button>
                                    </div>
                                </div>
                                <ul className="create-board-background">
                                    {
                                        arrBG.map(elem => {
                                            return (<li className="create-board-background-item">
                                                <button className='create-board-bg-item-btn' style={{
                                                    backgroundImage: `url(${elem})`
                                                }}>

                                                </button>
                                            </li>)
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="action-items">
                                <button className='add-board-submit-btn'>Create Board</button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        )
    }
}
export default PopUpAddBoard
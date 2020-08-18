import React, { Component } from 'react'
import { Button, Popup, Icon } from 'semantic-ui-react'
import AddIssueForm from './AddIssueForm'
import AddListForm from './AddListForm'
import stc from 'string-to-color'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
class BoardPlaygroundContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [3, 4, 6, 7],
        }
        this.handleAddListClick = this.handleAddListClick.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);

    }
    handleAddListClick(e) {
        e.preventDefault();
    }

    onDragEnd(result) {
        console.log('HERE');
        const { source, destination } = result;
        console.log(source, destination)
    }
    render() {
        const { list } = this.state;
        const arr = ['Anshu Saurabh', 'Tera Patrick', 'Jesse Jane', 'Stoya'];

        const labels = ['Website', 'Android', 'iOS', 'Protoype']
        return (
            <>
                <div className='playground-boundary'>
                    <div className='playground-content'>
                        <div className='playground-wrapper'>
                            <div className='playground-main-content'>
                                <div className='playground-header'>
                                    <div className='header-board-name-div'>
                                        <h1 className='header-board-name-h'>Balu</h1>

                                    </div>
                                    <span className="playground-header-star-ic-div">
                                        <Icon name='star outline' size='large' className="playground-header-star-icon" />
                                    </span>
                                    <div className="board-header-btn-org-wrapper">
                                        <span className="board-header-btn-divider"></span>
                                        <span className="board-private-marker-div">
                                            <span className="board-private-marker-text">
                                                Personal
                                            </span>
                                        </span>
                                        <span className="board-header-btn-divider"></span>
                                        <div className="board-member-outer-div">
                                            <div className="board-member-inner-div">
                                                {
                                                    arr.map((name, index) => {
                                                        return (
                                                            <span className="board-member-elem" style={{ zIndex: '' + arr.length - index }} >
                                                                <span className="board-member-name">
                                                                    {name.split(' ').map(elem => elem[0]).join('').slice(0, 2)}
                                                                </span>
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>

                                    </div>
                                    <div className="board-header-right-grp">
                                        <span className="board-right-settings">
                                            <Icon name='settings' className="board-right-icon"></Icon>
                                            <span className="board-right-btn">Settings</span>
                                        </span>

                                    </div>
                                </div>
                                <div className='playground-board-canvas'>
                                    <DragDropContext onDragEnd={this.onDragEnd}>
                                        <div className='playground-board-wrapper'>
                                            {
                                                list.map(elem => (
                                                    <Droppable droppableId={elem + ''}>
                                                        {(provided, snapshot) => (
                                                            <div className='playground-board-list-wrapper'>
                                                                <div className='playground-board-list-content'>
                                                                    <div className='playground-board-list-header'>
                                                                        <h2 className='playground-board-list-name'>Ideas</h2>
                                                                        <span className='playground-board-list-header-extra'> ...</span>
                                                                    </div>
                                                                    <div className='playground-list-cards' ref={provided.innerRef}>

                                                                        {Array(elem).fill(null).map((elem, index) => (
                                                                            <Draggable
                                                                                key={Math.floor(Math.random() * 4551) + index + 9}
                                                                                draggableId={'' + Math.floor(Math.random() * 4551) + index + 9}
                                                                                index={index}>

                                                                                {(provided, snapshot) => (
                                                                                    <div
                                                                                        ref={provided.innerRef}
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                    >
                                                                                        {<div className='list-card'>
                                                                                            <div className='list-card-cover'>

                                                                                            </div>
                                                                                            <span className='list-card-edit-icon'>E</span>
                                                                                            <div className='list-card-details'>
                                                                                                <div className='list-card-labels'>
                                                                                                    {
                                                                                                        Array(2).fill(null).map(elem => {
                                                                                                            let x = labels[Math.floor(Math.random() * 4)];
                                                                                                            return (
                                                                                                                <span className='card-label' style={{ backgroundColor: stc(x.toLowerCase()) }}>{x}</span>
                                                                                                            )
                                                                                                        })
                                                                                                    }
                                                                                                    <span className='card-label'>Android</span>
                                                                                                    <span className='card-label'>Website</span>
                                                                                                </div>
                                                                                                <span className='list-card-title'>
                                                                                                    Progressive web app development
                                                                                                </span>
                                                                                                <div className='badges'>
                                                                                                    <span className='js-badges'>
                                                                                                        <div className='due-date-badge'>
                                                                                                            <span className='badge-icon'>^</span>
                                                                                                            <span className='badge-text'>Aug 28</span>
                                                                                                        </div>
                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>}
                                                                                    </div>
                                                                                )}

                                                                            </Draggable>
                                                                        ))

                                                                        }
                                                                    </div>
                                                                    <div className='card-compose-wrapper'>
                                                                        <Popup
                                                                            on="click"
                                                                            trigger={<Button fluid labelPosition='left' icon='plus' content='Add card' ></Button>}
                                                                            style={{ top: 40 }}
                                                                            basic
                                                                            hideOnScroll
                                                                        ><AddIssueForm handleClose={this.handleClose} /></Popup>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Droppable>
                                                ))
                                            }
                                            <div className='add-list-wrapper'>
                                                <Popup
                                                    on='click'
                                                    trigger={<Button labelPosition='left' fluid icon='plus' content='Add list' className='open-add-list-btn' onClick={this.handleAddListClick} />}
                                                    style={{ top: -55, left: -4, padding: 0, }}
                                                    basic
                                                    hideOnScroll
                                                ><AddListForm /></Popup>
                                            </div>

                                        </div>
                                    </DragDropContext>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default BoardPlaygroundContainer
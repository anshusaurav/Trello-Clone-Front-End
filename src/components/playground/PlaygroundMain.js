import React, { Component } from 'react'
import { Button, Popup } from 'semantic-ui-react'
import AddIssueForm from './AddIssueForm'
import AddListForm from './AddListForm'
import stc from 'string-to-color'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class PlayGroundMain extends Component {
    constructor(props) {
        super(props);
        this.state = { lists: null }
        this.handleAddListClick = this.handleAddListClick.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);

    }
    handleAddListClick(e) {
        e.preventDefault();
    }

    onDragEnd(result) {
        const { source, destination } = result;
        console.log(source, destination)
    }
    async saveLists() {
        console.log("fetching list of this board")
        const { boardSlug } = this.props;
        const url = `http://localhost:4000/api/lists/${boardSlug}`;
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/JSON",
                    Authorization: `Token ${jwttoken}`,
                },
            });
            const data = await response.json();
            console.log(data);
            if (!data.errors) {
                this.setState({ lists: data.lists });
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    componentDidMount() {
        this.saveLists();
    }
    render() {
        const { lists } = this.state;
        const { boardSlug } = this.props;
        const labels = ['Website', 'Android', 'iOS', 'Protoype']
        return (
            <div className='playground-board-canvas'>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className='playground-board-wrapper'>
                        {
                            lists && lists.map((list, ind) => (
                                <Droppable droppableId={list._id + ''}>
                                    {(provided, snapshot) => (
                                        <div className='playground-board-list-wrapper'>
                                            <div className='playground-board-list-content'>
                                                <div className='playground-board-list-header'>
                                                    <h2 className='playground-board-list-name'>{list.name}</h2>
                                                    <span className='playground-board-list-header-extra'> ...</span>
                                                </div>
                                                <div className='playground-list-cards' ref={provided.innerRef}>

                                                    {list.issues.map((issue, index) => (
                                                        <Draggable
                                                            key={issue._id}
                                                            draggableId={issue._id}
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
                            ><AddListForm boardSlug={boardSlug} /></Popup>
                        </div>

                    </div>
                </DragDropContext>
            </div>
        )
    }
}
export default PlayGroundMain

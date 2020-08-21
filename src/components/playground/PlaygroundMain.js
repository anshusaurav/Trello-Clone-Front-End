import React, { Component } from 'react'
import { Button, Popup, Icon } from 'semantic-ui-react'
import AddIssueForm from './AddIssueForm'
import AddListForm from './AddListForm'
import IssueEditorPopUp from './IssueEditorPopup'
import stc from 'string-to-color'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class PlayGroundMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: null,
            isUpdated: false,
            board: null,
            isOpen: false,
            isOpenList: null
        }
        this.handleOpenAddList = this.handleOpenAddList.bind(this);
        this.handleCloseAddList = this.handleCloseAddList.bind(this);

        this.handleOpenAddCard = this.handleOpenAddCard.bind(this);
        this.handleCloseAddCard = this.handleCloseAddCard.bind(this);

        this.handleAddListClick = this.handleAddListClick.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
    }
    handleAddListClick(e) {
        e.preventDefault();
    }
    toggleUpdate() {
        this.setState({ isUpdated: !this.state.isUpdated })
    }
    onDragEnd(result) {
        const { source, destination } = result;
        if (!source || !destination)
            return;
        console.log(source, destination);
        this.saveSwap(source.droppableId,
            destination.droppableId,
            source.index,
            destination.index)
    }
    async saveSwap(srcListId, destListId, srcPos, destPos) {
        const url = `http://localhost:4000/api/swaps?srcListId=${srcListId}&destListId=${destListId}&srcPos=${srcPos}&destPos=${destPos}`;
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON",
                    Authorization: `Token ${jwttoken}`,
                },
            });
            const data = await response.json();
            if (!data.errors) {
                this.setState({ isUpdated: !this.state.isUpdated });
            }
        } catch (error) {
            console.error("Error: " + error);
        }
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
            // console.log(data);
            if (!data.errors) {
                const lists = data.lists;
                this.setState({ lists }, () => {
                    const map = new Map();
                    lists.forEach(list => {
                        map.set(list._id, false);
                    })
                    this.setState({ isOpenList: map })
                });
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    async saveBoard() {
        console.log("fetching board")
        const { boardSlug } = this.props;
        const url = `http://localhost:4000/api/boards/${boardSlug}`;
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
            // console.log(data);
            if (!data.errors) {
                this.setState({ board: data.board });
            }
        } catch (error) {
            console.error("Error: " + error);
        }
    }
    handleOpenAddList() {
        this.setState({ isOpen: true });
    }
    handleCloseAddList() {
        this.setState({ isOpen: false });
    }

    handleOpenAddCard(event) {

        const id = event.target.dataset.listId;
        const newMap = new Map(this.state.isOpenList);
        newMap.set(id, true);
        this.setState({ isOpenList: newMap });
    }
    handleCloseAddCard() {
        const newMap = new Map(this.state.isOpenList);
        let arr = Array.from(newMap.keys());
        arr = arr.map(elem => [elem, false]);
        const isOpenList = new Map(arr);
        this.setState({ isOpenList });
    }
    componentDidMount() {
        this.saveLists();
        this.saveBoard();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isUpdated !== this.state.isUpdated) {
            this.saveLists();
        }
    }

    render() {
        const { lists, board, isOpen, isOpenList } = this.state;
        const { boardSlug } = this.props;
        const labels = ['Website', 'Android', 'iOS', 'Protoype']
        return (
            <div className='playground-board-canvas'
                style={{ backgroundImage: board ? `url(${board.image})` : '' }}>
                <DragDropContext onDragEnd={this.onDragEnd} >
                    <div className='playground-board-wrapper' >
                        {
                            lists && isOpenList && lists.map((list, ind) => (
                                <Droppable droppableId={list._id + ''} key={list._id} style={{ overflowY: 'scroll' }}>
                                    {(provided, snapshot) => (
                                        <div className='playground-board-list-wrapper'>
                                            <div className='playground-board-list-content'>
                                                <div className='playground-board-list-header'>
                                                    <h2 className='playground-board-list-name'>
                                                        {list.name}
                                                    </h2>
                                                    <span className='playground-board-list-header-extra'>
                                                        <Icon name="ellipsis horizontal"
                                                            className="more-list-icon" />
                                                    </span>
                                                </div>
                                                <div className='playground-list-cards'
                                                    ref={provided.innerRef}>

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
                                                                        <span className='list-card-edit-icon'>

                                                                            <Popup
                                                                                on="click"
                                                                                basic
                                                                                trigger={<Icon name="edit outline" />}>
                                                                                <IssueEditorPopUp />
                                                                            </Popup>
                                                                        </span>
                                                                        <div className='list-card-details'>
                                                                            <div className='list-card-labels'>
                                                                                {
                                                                                    labels.map((elem, i) => {
                                                                                        return (
                                                                                            <span className='card-label'
                                                                                                key={i}
                                                                                                style={{ backgroundColor: stc(labels[i].toLowerCase()) }}>
                                                                                                {labels[i]}
                                                                                            </span>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </div>
                                                                            <span className='list-card-title'>
                                                                                {issue.title}
                                                                            </span>
                                                                            <div className='badges'>
                                                                                <span className='js-badges'>
                                                                                    <div className='due-date-badge'>
                                                                                        <span className='badge-icon'><Icon name="clock outline" /></span>
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
                                                        open={isOpenList.get(list._id)}
                                                        onOpen={this.handleOpenAddCard}
                                                        trigger={
                                                            <Button
                                                                fluid
                                                                labelPosition='left'
                                                                icon='plus'
                                                                content={!list.issues.length ? 'Add card' : 'Add another card'}
                                                                data-list-id={list._id}>
                                                            </Button>
                                                        }
                                                        style={{ left: -4, backgroundColor: '#EBECF0' }}
                                                        basic
                                                        hideOnScroll>
                                                        <AddIssueForm
                                                            listId={list._id}
                                                            toggleUpdate={this.toggleUpdate}
                                                            handleClose={this.handleCloseAddCard}
                                                        /></Popup>

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
                                open={isOpen}
                                onOpen={this.handleOpenAddList}
                                trigger={
                                    <Button
                                        labelPosition='left'
                                        fluid
                                        icon='plus'
                                        content='Add list'
                                        className='open-add-list-btn'
                                        onClick={this.handleAddListClick} />
                                }
                                style={{ top: -55, left: -4, padding: 14, backgroundColor: '#EBECF0' }}
                                basic
                                hideOnScroll
                            ><AddListForm
                                    boardSlug={boardSlug}
                                    toggleUpdate={this.toggleUpdate}
                                    handleClose={this.handleCloseAddList}
                                /></Popup>
                        </div>

                    </div>
                </DragDropContext>
            </div>
        )
    }
}
export default PlayGroundMain

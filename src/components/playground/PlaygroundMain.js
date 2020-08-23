import React, { Component } from 'react'
import { Button, Popup, Icon, Dropdown } from 'semantic-ui-react'
import AddIssueForm from './AddIssueForm'
import AddListForm from './AddListForm'
import IssueEditorPopUp from './IssueEditorPopup'
import CardCommentPopup from './CardCommentPopup'
import stc from 'string-to-color'
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const options = [
    { key: 'deletelist', text: 'Archive List', icon: 'trash', value: 'deletelist' },
    { key: 'deletecards', text: 'Archive All Cards', icon: 'trash alternate', value: 'deletecards' },
]
class PlayGroundMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: null,
            isUpdated: false,
            board: null,
            isOpen: false,
            isOpenList: null,
            isEditCard: null,
            isCommentCard: null,
            defaultListDropDown: ""
        }
        this.handleOpenAddList = this.handleOpenAddList.bind(this);
        this.handleCloseAddList = this.handleCloseAddList.bind(this);

        this.handleOpenAddCard = this.handleOpenAddCard.bind(this);
        this.handleCloseAddCard = this.handleCloseAddCard.bind(this);

        this.handleOpenEditCard = this.handleOpenEditCard.bind(this);
        this.handleCloseEditCard = this.handleCloseEditCard.bind(this);

        this.handleOpenCommentCard = this.handleOpenCommentCard.bind(this);
        this.handleCloseCommentCard = this.handleCloseCommentCard.bind(this);

        this.handleChangeListDropDown = this.handleChangeListDropDown.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
    }
    // handleAddListClick(e) {
    //     e.preventDefault();
    // }
    handleChangeListDropDown(e, { value }) {
        const listSlug = e.target.parentNode.parentNode.parentNode.dataset.listSlug;
        this.setState({ default: value }, () => {
            if (this.state.default === 'deletelist') {
                this.deleteList(listSlug);
            }
            else if (this.state.default === 'deletecards') {
                console.log('Deleting all cards' + listSlug);
            }
        })

    }

    handleOpenCommentCard(event) {
        const id = event.target.closest('.js-badges').dataset.issueId;

        const newMap = new Map(this.state.isCommentCard);
        newMap.set(id, true);
        this.setState({ isCommentCard: newMap });

    }
    handleCloseCommentCard() {
        const newMap = new Map(this.state.isCommentCard);
        let arr = Array.from(newMap.keys());
        arr = arr.map(elem => [elem, false]);
        const isCommentCard = new Map(arr);
        this.setState({ isCommentCard });
        this.toggleUpdate();

    }
    handleOpenEditCard(event) {
        const id = event.target.dataset.issueId;
        const newMap = new Map(this.state.isEditCard);
        newMap.set(id, true);
        this.setState({ isEditCard: newMap });

    }
    handleCloseEditCard() {
        const newMap = new Map(this.state.isEditCard);
        let arr = Array.from(newMap.keys());
        arr = arr.map(elem => [elem, false]);
        const isEditCard = new Map(arr);
        this.setState({ isEditCard });
        this.toggleUpdate();

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
    async deleteList(listSlug) {
        const url = `http://localhost:4000/api/lists/single/${listSlug}`;
        const { jwttoken } = localStorage;
        try {
            const response = await fetch(url, {
                method: "DELETE",
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
                    this.setState({ isOpenList: map }, () => {
                        const issueMap = new Map();
                        lists.forEach(list => {
                            list.issues.forEach(issue => {
                                issueMap.set(issue._id, false);
                            })
                        })
                        this.setState({ isEditCard: issueMap }, () => {
                            const commentMap = new Map();
                            lists.forEach(list => {
                                list.issues.forEach(issue => {
                                    commentMap.set(issue._id, false);
                                })
                            })
                            this.setState({ isCommentCard: commentMap })
                        })
                    })
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
    timeAgo(date) {
        TimeAgo.addLocale(en);
        const timeAgo = new TimeAgo("en-US");
        return timeAgo.format(date);
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
        const { lists, board, isOpen, isOpenList, isEditCard, isCommentCard } = this.state;
        const { boardSlug } = this.props;

        return (
            <div className='playground-board-canvas'
                style={{ backgroundImage: board ? `url(${board.image})` : '' }}>
                <DragDropContext onDragEnd={this.onDragEnd} >
                    <div className='playground-board-wrapper' >
                        {
                            lists && isOpenList && isEditCard && isCommentCard && lists.map((list, ind) => (
                                <Droppable
                                    droppableId={list._id + ''}
                                    key={list._id}
                                    style={{ overflowY: 'scroll' }}>
                                    {(provided, snapshot) => (
                                        <div className='playground-board-list-wrapper'>
                                            <div className='playground-board-list-content'>
                                                <div className='playground-board-list-header'>
                                                    <h2 className='playground-board-list-name'>
                                                        {list.name}
                                                    </h2>
                                                    <span className='playground-board-list-header-extra'>
                                                        <Dropdown trigger=
                                                            {
                                                                <Icon name="ellipsis horizontal"
                                                                    className="more-list-icon"
                                                                    data-list-slug={list.slug} />

                                                            }
                                                            data-list-slug={list.slug}
                                                            onChange={this.handleChangeListDropDown}
                                                            options={options}
                                                            pointing='top left'
                                                            icon={null}

                                                        />

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
                                                                                open={isEditCard.get(issue._id)}
                                                                                onOpen={this.handleOpenEditCard}
                                                                                basic
                                                                                trigger={
                                                                                    <Icon
                                                                                        name="edit outline"
                                                                                        data-issue-id={issue._id}

                                                                                    />}>
                                                                                <IssueEditorPopUp
                                                                                    issueId={issue._id}
                                                                                    toggleUpdate={this.toggleUpdate}
                                                                                    handleClose={this.handleCloseEditCard}

                                                                                />
                                                                            </Popup>
                                                                        </span>
                                                                        <div className='list-card-details'>
                                                                            <div className='list-card-labels'>

                                                                                {
                                                                                    issue.labels && issue.labels.map((label, index) => {
                                                                                        return (
                                                                                            <span className='card-label'
                                                                                                key={index}
                                                                                                style={{ backgroundColor: stc(label.toUpperCase()) }}>
                                                                                                {label.charAt(0).toUpperCase() + label.slice(1)}
                                                                                            </span>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </div>
                                                                            <span className='list-card-title'>
                                                                                {issue.title}
                                                                            </span>

                                                                            <div className='badges'>
                                                                                {
                                                                                    issue.dueDate && (
                                                                                        <span className='js-badges' >

                                                                                            <div className='due-date-badge'
                                                                                                style={{
                                                                                                    backgroundColor: `${Date.now() > new Date(issue.dueDate) ? '#EC9488' : '#fff'}`
                                                                                                }}>
                                                                                                <span className='badge-icon'>
                                                                                                    <Icon name="clock outline" />
                                                                                                </span>
                                                                                                <span className='badge-text'>
                                                                                                    {this.timeAgo(new Date(issue.dueDate))}
                                                                                                </span>
                                                                                            </div>
                                                                                        </span>
                                                                                    )
                                                                                }
                                                                                <Popup
                                                                                    on="click"
                                                                                    open={isCommentCard.get(issue._id)}
                                                                                    onOpen={this.handleOpenCommentCard}
                                                                                    basic
                                                                                    style={{
                                                                                        position: "fixed",
                                                                                        minWidth: "100vw",
                                                                                        minHeight: "100vh",
                                                                                        top: -2,
                                                                                        left: -2,
                                                                                        bottom: -2,
                                                                                        right: -2,
                                                                                        transform: "none",
                                                                                        marginTop: 0,
                                                                                        backgroundColor: "rgba(0,0,0,0.5)",
                                                                                    }}
                                                                                    trigger={
                                                                                        issue.comments.length !== 0 ? (
                                                                                            <span className='js-badges comment-badge ' data-issue-id={issue._id} >

                                                                                                <div className='due-date-badge'>
                                                                                                    <span className='badge-icon'>
                                                                                                        <Icon name="comments outline" />
                                                                                                    </span>
                                                                                                    <span className='badge-text'>
                                                                                                        {issue.comments.length}
                                                                                                    </span>
                                                                                                </div>
                                                                                            </span>
                                                                                        ) : (
                                                                                                <span className='js-badges comment-badge ' data-issue-id={issue._id}>

                                                                                                    <div className='due-date-badge'>
                                                                                                        <span className='badge-icon'>
                                                                                                            <Icon name="comments outline" />
                                                                                                        </span>

                                                                                                    </div>
                                                                                                </span>
                                                                                            )
                                                                                    }>
                                                                                    <CardCommentPopup
                                                                                        issueId={issue._id}
                                                                                        toggleUpdate={this.toggleUpdate}
                                                                                        handleClose={this.handleCloseCommentCard}

                                                                                    />
                                                                                </Popup>

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
                                hideOnScroll>
                                <AddListForm
                                    boardSlug={boardSlug}
                                    toggleUpdate={this.toggleUpdate}
                                    handleClose={this.handleCloseAddList} />
                            </Popup>
                        </div>

                    </div>
                </DragDropContext>
            </div >
        )
    }
}
export default PlayGroundMain

import './css/TrelloTaskBoard.css';
import './css/Modal.css';
import Modal from './Components/Modal';
import React, { Component } from "react";


class TrelloTaskBoard extends Component {

    constructor() {
        super();

        let cachedLists = JSON.parse(localStorage.getItem('cachedLists'));
        cachedLists = Array.isArray(cachedLists) ? cachedLists : [];

        this.state = {
            lists: cachedLists,
            title: '',
            contextToAdd: '',
            taskDescription: '',
            currentIndex: -1,
            message: ''
        };
        this.modalRef = React.createRef();
    }


    componentDidMount() {
        let sampleLists = [
            {
                title: "Todo Tasks",
                items: [{
                    description: "Research about React Hooks",
                    taskName: "Learning",
                    id: '462'
                },
                {
                    description: "Meet friend for lunch",
                    taskName: "Socializing",
                    id: '992'
                },
                {
                    description: "Build a Trello board",
                    taskName: "Development",
                    id: '295'
                }]
            },
            {
                title: "In Progress",
                items: [
                    {
                        description: "Study and understand Google map Integration",
                        taskName: "Study task",
                        id: '381'
                    },
                    {
                        description: "Pre releae unit testing",
                        taskName: "Testing",
                        id: '701'
                    }]
            }];

        if (this.state.lists.length === 0) {
            this.setState({ 'lists': sampleLists }, () => this.updateLocalStorageWithState());
        }


    }

    updateLocalStorageWithState = () => {
        let currentStateLists = JSON.stringify(this.state.lists);
        localStorage.setItem('cachedLists', currentStateLists);
    }



    addItemGeneric = () => {
        //since there are 2 types of item addition we use a generic method
        // Another Intention is to use common Modal for both additions

        let tempObj = {};
        let newList = [];

        if (this.state.contextToAdd === 'TaskList') {

            tempObj = {
                taskName: this.state.title,
                description: this.state.taskDescription,
                id: Math.floor(Math.random() * 1000 + 1) //genererate a random id
            }
            let copyLists = this.state.lists;
            let current = this.state.currentIndex
            if (current >= 0) {
                copyLists[current].items.unshift(tempObj);
            }
            newList = copyLists;
            console.log(newList);

        }
        else { //add a new List

            tempObj = {
                title: this.state.title,
                items: []
            };
            newList = [...this.state.lists, tempObj];
        }

        this.setState({ 'lists': newList, taskDescription: '', title: '', contextToAdd: '' }, () => this.updateLocalStorageWithState());
        this.modalRef.current.closeModel();

    }


    updateAdditiontype = (isFromTaskList, currentListIndex) => {

        this.setState({ contextToAdd: '', taskDescription: '', title: '', message: '' }); //Initiallization
        let context, currentIndex, modalMesage;

        if (typeof isFromTaskList === "boolean" && isFromTaskList) {
            context = 'TaskList';
            currentIndex = currentListIndex;
            modalMesage = "Please Enter name and description of your new task";
        }
        else {
            context = '';
            currentIndex = -1;
            modalMesage = "Please Enter title for your new list";
        }

        this.setState({ contextToAdd: context, currentIndex: currentIndex, message: modalMesage }, () => this.updateLocalStorageWithState());
        console.log(this.state);

    }


    removeList = (index) => {

        let newList = [...this.state.lists];
        newList.splice(index, 1);
        this.setState({ 'lists': newList }, () => this.updateLocalStorageWithState());

    }



    removeTask = (listIndex, taskId, event) => { // A Sample method with required functionality, validation and Error Handling

        // console.log(event);
        // console.log(listIndex);
        // console.log(taskId);

        let concernedListItems, updatedItems;

        let copyLists = [...this.state.lists];
        if (listIndex > -1) {
            concernedListItems = copyLists[listIndex].items;
            if (concernedListItems && !isNaN(taskId)) {

                updatedItems = concernedListItems.filter(item => item.id !== taskId);
                copyLists[listIndex].items = updatedItems;
                this.setState({ 'lists': copyLists }, () => this.updateLocalStorageWithState());

            }
        }
        if (!updatedItems) { // would be invalid if not found
            console.warn('Task could not be deleted ');
        }

    }



    handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        }, () => this.updateLocalStorageWithState())
    }



    getDraggedTaskDeatails = (listIndex, draggedTask, event) => {
        console.log(event);
        console.log(draggedTask);
        console.log(listIndex);
        let taskDetails = {
            draggedTask: draggedTask, //Whole task Object is passed here
            listIndex: listIndex
        };
        taskDetails = JSON.stringify(taskDetails); // Most common format to exchange data from anywhere to anyhwere
        event.dataTransfer.setData("taskDetails", taskDetails);
    }

    allowToDrop = (event) => {
        event.preventDefault();
    }



    updateLists = (destinationListIndex, event) => {
        event.preventDefault();
        var taskDetails = JSON.parse(event.dataTransfer.getData("taskDetails"));
        console.log(taskDetails);
        console.log(destinationListIndex);

        // Removes the dragged Task from the List from which it was taken 

        if (typeof taskDetails === "object" && !isNaN(taskDetails.listIndex) && taskDetails.draggedTask.id) {

            this.removeTask(taskDetails.listIndex, taskDetails.draggedTask.id);
        }
        else {
            console.warn('Could not get necessary Task details from Drag event');
        }

        // Adds dragged Task to new Destination List

        if (!isNaN(destinationListIndex) && typeof taskDetails.draggedTask === "object" && taskDetails.draggedTask.taskName) {

            let copyLists = [...this.state.lists];
            copyLists[destinationListIndex].items.unshift(taskDetails.draggedTask);
            this.setState({ 'lists': copyLists }, () => this.updateLocalStorageWithState());


        } else {
            console.warn('Could not update Destination : maybe due to insufficent details in task');
        }

    }



    render() {

        const uiToShow = this.state.lists.length ?
            (
                this.state.lists.map((list, index) => (

                    <div className="List" key={index}>

                        <h4>{list.title}</h4>
                        <button className="icon-btn deleteList" onClick={this.removeList.bind(this, index)}><i className="fa fa-times" aria-hidden="true"></i></button>

                        <div className="task-list" onDragOver={this.allowToDrop} onDrop={this.updateLists.bind(this, index)}>

                            {list.items.map((task) => (

                                <div className="task" key={task.id} id={task.id} draggable="true" onDragStart={this.getDraggedTaskDeatails.bind(this, index, task)}>

                                    <div className="taskName">
                                        <h5>{task.taskName}
                                            <button className="right-top icon-btn" onClick={this.removeTask.bind(this, index, task.id)}>
                                                <i className="fa fa-trash " aria-hidden="true"></i>
                                            </button>
                                        </h5>
                                        <p>
                                            {task.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <label className="fallbackUIMessage">
                                {!list.items.length ? ' List is empty, Add tasks using the button below ' : null}
                            </label>


                        </div>
                        <button className="btn btn-primary  floatbottom" data-target="#AddCard" data-toggle="modal" onClick={this.updateAdditiontype.bind(this, true, index)}>
                            <i className="fa fa-plus-circle addCard" aria-hidden="true"></i>
                        </button>

                    </div>
                ))

            ) :
            (
                <label className="fallbackUIMessage">No List Item to show</label>
            );


        return (
            <div className="App">

                <header className="App-header">
                    Trello Board
                </header>
                <div className="container" style={{width: '100%', margin: '0px'}}>
                    <div className="center" id="listContainer">
                        <button data-target="#AddCard" data-toggle="modal" className="btn btn-primary btn-md primaryActionButton" onClick={this.updateAdditiontype} >ADD LIST
                            <i className="fa fa-plus" title="Add" style={{ fontSize: '10px', paddingLeft: '5px' }}></i>
                        </button>
                        {uiToShow}
                    </div>
                </div>

                <Modal title={this.state.message} action={this.addItemGeneric.bind(this)} actionName="Save" id="AddCard" ref={this.modalRef} formIsValid={this.state.title.length ? true : false}>
                    <div id="form">

                        <form name="AddcardForm" >
                            <div className="row">
                                Enter Title :<input type="text" name="title" value={this.state.title} onChange={this.handleInputChange} className="form-control" placeholder="Enter here" required />
                            </div>


                            <div className="row" style={{ 'display': this.state.contextToAdd === 'TaskList' ? 'block' : 'none' }}>
                                Description :<input type="text" name="taskDescription" value={this.state.albumId} onChange={this.handleInputChange} className="form-control" placeholder="Enter breif description" required />
                            </div>

                        </form>
                    </div>
                </Modal>

            </div>
        );
    }
};

export default TrelloTaskBoard;

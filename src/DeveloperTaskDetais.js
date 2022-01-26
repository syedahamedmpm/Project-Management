import React from "react";
import axios from "axios";
import { Button, Table,Modal,ModalBody,ModalFooter,ModalHeader,FormGroup,Label,Input } from "reactstrap";
class DeveloperTaskDetails extends React.Component{
constructor(){
    super()
    this.state={
        tasks:[],
        editTask:{
            id:'',
            taskName:'',
            projectName:'',
            assignTo:'',
            reviewTask:'',
            status:'',
            devStatus:''
        },
        editTaskStatusModal:false
    }
}
componentWillMount(){
    this.refreshTasks()
}
refreshTasks = () =>{
    axios.get('http://localhost:8000/task/')
    .then((response)=>{
        console.log(response.data)
        this.setState({
            tasks:response.data
        })
    })
}
fillTaskStatus = (id,taskName,projectName,assignTo,reviewTask,status,devStatus) =>{
this.setState({
    editTask:{
        ...this.state.editTask,
            id,
            taskName,
            projectName,
            assignTo,
            reviewTask,
            status,
            devStatus
    },
    editTaskStatusModal:!this.state.editTaskStatusModal
})
}
toggleEditTaskStatusModal  = () =>{
    this.setState({
        editTaskStatusModal:!this.state.editTaskStatusModal
    })
    
}
handleOnChangeUpdated = (e) =>{
    let { editTask } = this.state;
    editTask.devStatus = e.target.value;
    this.setState({
        editTask
    })
    console.log(editTask);
}
updateTaskStatus = () =>{
    let {taskName,projectName,assignTo,reviewTask,status,devStatus,id} = this.state.editTask
    console.log(devStatus,id)
    axios.put('http://localhost:8000/task/' + id ,{taskName,projectName,assignTo,reviewTask,status,devStatus} )
    .then((response)=>{
        console.log(response)
        this.refreshTasks()
        this.setState({
            editTaskStatusModal:false,
            editTask:{
                devStatus:''
            }
        })
    })
}
render(){
    const {tasks} =this.state
        let tas = tasks.filter(task=>task.assignTo=="Developer 2").map(task=>{
            return(
                <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.taskName}</td>
                    <td>{task.projectName}</td>
                    <td>{task.assignTo}</td>
                    <td>{task.reviewTask}</td>
                    <td>{task.status}</td>
                    <td>{task.devStatus}</td>
                    <td><Button color="success" size="sm" className="mr-2" onClick={()=>this.fillTaskStatus(task.id,task.taskName,task.projectName,task.assignTo,task.reviewTask,task.status,task.devStatus)}>Edit</Button></td>
                    
                </tr>
            )})
    return(
        <div className="App container">
                <Button className="my-3" color="primary" size="md" onClick={this.toggleNewTaskModal}>Add</Button>
                <Table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Task Name</td>
                            <td>Project Name</td>
                            <td>Assign To</td>
                            <td>Review Task</td>
                            <td>Manager Status</td>
                            <td>My Status</td>
                            <td>Edit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tas}
                    </tbody>
                    <Modal isOpen={this.state.editTaskStatusModal} toggle={this.toggleEditTaskStatusModal}>
                        <ModalHeader toggle={this.toggleEditTaskStatusModal}>Edit Task Status</ModalHeader>
                        <ModalBody>
                            
                            <FormGroup>
                                <Label for="devStatus">Task Status</Label>
                                <Input type="select" id="devStatus" value={this.state.editTask.devStatus} name="devStatus" onChange={this.handleOnChangeUpdated}>
                                <option>Pending</option>
                                <option>Completed</option>
                                </Input>
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.updateTaskStatus}>Edit Project</Button>{' '}
                            <Button color="secondary" onClick={this.toggleEditTaskStatusModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    </Table>
                    </div>
    )
}
}
export default DeveloperTaskDetails;
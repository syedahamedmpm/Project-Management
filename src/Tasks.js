import React from "react";
import axios from "axios";
import { Button, Table,Modal,ModalBody,ModalFooter,ModalHeader,FormGroup,Label,Input } from "reactstrap";
class Task extends React.Component{
    constructor(){
        super()
        this.state={
            tasks:[],
            projects:[],
            users:[],
            newTask:{
                id:'',
                taskName:'',
                projectName:'',
                assignTo:'',
                reviewTask:'',
                status:''
            },
            newTaskModal:false
    }
}
toggleNewTaskModal = () =>{
    this.setState({
        newTaskModal:!this.state.newTaskModal
    })
}
componentWillMount(){
    this.refreshTasks()
    this.refreshProject()
    this.refreshUser()
}
refreshTasks = () =>{
    axios.get('http://localhost:3000/task/')
    .then((response)=>{
        console.log(response.data)
        this.setState({
            tasks:response.data
        })
    })
}
refreshProject = () =>{
    axios.get('http://localhost:3000/project/')
    .then((response)=>{
        console.log(response.data)
        this.setState({
            projects:response.data
        })
    })
}
refreshUser = () =>{
    axios.get('http://localhost:3000/User/')
    .then((response)=>{
        console.log(response.data)
        this.setState({
            users:response.data
        })
    })
}
addTask = ()=>{
    console.log(this.state.newTask)
    let {newTask,tasks} = this.state
    axios.post('http://localhost:3000/task/',newTask)
    .then((response) =>{
        tasks.push(response.data)
        this.setState({
            newTask:{
                id:'',
                taskName:'',
                projectName:'',
                assignTo:'',
                reviewTask:'',
                status:''
            },
            newTaskModal:false
        })
    })
}
handleOnChange = (e) =>{
    const target =e.target
    console.log(target)
    const name = target.name
    console.log(name)
    const value = target.value
    console.log(value)
    this.setState({
        newTask:{
            ...this.state.newTask,
            [name]:value
        }
        
    })
}
    render(){
        const {tasks} =this.state
        let tas = tasks.map(task=>{
            return(
                <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.taskName}</td>
                    <td>{task.projectName}</td>
                    <td>{task.assignTo}</td>
                    <td>{task.reviewTask}</td>
                    <td>{task.status}</td>
                    
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
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tas}
                    </tbody>
                    <Modal isOpen={this.state.newTaskModal} toggle={this.toggleNewTaskModal}>
                        <ModalHeader toggle={this.toggleNewTaskModal}>Add a new Task</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="id">Id</Label>
                                <Input id="id" value={this.state.newTask.id} name="id" onChange={this.handleOnChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="taskName">Task Name</Label>
                                <Input id="taskName" value={this.state.newTask.taskName} name="taskName" onChange={this.handleOnChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="projectName">Project Name</Label>
                                <Input type="select" id="projectName" value={this.state.newTask.projectName} name="projectName" onChange={this.handleOnChange}>
                                {
                                   this.state.projects.map(project=>(
                                    <option>{project.name}</option>
                                        ))
                                    
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="assignTo">Assign To</Label>
                                <Input id="assignTo" value={this.state.newTask.assignTo} name="assignTo" type="select" onChange={this.handleOnChange}>
                                {
                                   this.state.users.filter(user=>user.userType=="Developer").map(user=>(
                                    <option>{user.name}</option>
                                        ))
                                    
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="reviewTask">Review Task</Label>
                                <Input id="reviewTask" value={this.state.newTask.reviewTask} name="reviewTask" onChange={this.handleOnChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="status">Status</Label>
                                <Input id="status" value={this.state.newTask.status} name="status" type="select" onChange={this.handleOnChange}>
                                <option>Pending</option>
                                <option>Completed</option>
                                </Input>
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addTask}>Add Project</Button>{' '}
                            <Button color="secondary" onClick={this.toggleNewTaskModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    </Table>
                    </div>
        )
    }
}
export default Task;
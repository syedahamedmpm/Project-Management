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
            editTask:{
                id:'',
                taskName:'',
                projectName:'',
                assignTo:'',
                reviewTask:'',
                status:''
            },
            newTaskModal:false,
            editTaskModal:false
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
    axios.get('http://localhost:8000/task/')
    .then((response)=>{
        console.log(response.data)
        this.setState({
            tasks:response.data
        })
    })
}
refreshProject = () =>{
    axios.get('http://localhost:8000/project/')
    .then((response)=>{
        console.log(response.data)
        this.setState({
            projects:response.data
        })
    })
}
refreshUser = () =>{
    axios.get('http://localhost:8000/User/')
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
    axios.post('http://localhost:8000/task/',newTask)
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
            newTaskModal:false,
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
        },
        editTask:{
            ...this.state.editTask,
            [name]:value
        }
        
    })
}
fillTaskDetails = (task) =>{
this.setState({
    editTask:{
        id:task.id,
        taskName:task.taskName,
        projectName:task.projectName,
        assignTo:task.assignTo,
        reviewTask:task.reviewTask,
        status:task.status
    },
    editTaskModal:!this.state.editTaskModal
})

}
updateTask = () =>{
    let {id,taskName,projectName,assignTo,reviewTask,status} = this.state.editTask
    axios.put('http://localhost:8000/task/' + id,{id,taskName,projectName,assignTo,reviewTask,status})
    .then((response)=>{
        this.refreshTasks()
        this.setState({
            editTask:{
                id:'',
                taskName:'',
                projectName:'',
                assignTo:'',
                reviewTask:'',
                status:''
            },
            editTaskModal:false
        })
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
                    <td>{task.devStatus}</td>
                    <td>
                        <Button color="primary" size="sm" onClick={()=>this.fillTaskDetails(task)}>Edit</Button>
                    </td>
                    
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
                            <td>Developer's Task Status</td>
                            <td>Edit</td>
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
                    <Modal isOpen={this.state.editTaskModal} toggle={this.toggleEditTaskModal}>
                        <ModalHeader toggle={this.toggleEditTaskModal}>Edit Task</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="id">Id</Label>
                                <Input id="id" value={this.state.editTask.id} name="id" onChange={this.handleOnChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="taskName">Task Name</Label>
                                <Input id="taskName" value={this.state.editTask.taskName} name="taskName" onChange={this.handleOnChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="projectName">Project Name</Label>
                                <Input type="select" id="projectName" value={this.state.editTask.projectName} name="projectName" onChange={this.handleOnChange}>
                                {
                                   this.state.projects.map(project=>(
                                    <option>{project.name}</option>
                                        ))
                                    
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="assignTo">Assign To</Label>
                                <Input id="assignTo" value={this.state.editTask.assignTo} name="assignTo" type="select" onChange={this.handleOnChange}>
                                {
                                   this.state.users.filter(user=>user.userType=="Developer").map(user=>(
                                    <option>{user.name}</option>
                                        ))
                                    
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="reviewTask">Review Task</Label>
                                <Input id="reviewTask" value={this.state.editTask.reviewTask} name="reviewTask" onChange={this.handleOnChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="status">Status</Label>
                                <Input id="status" value={this.state.editTask.status} name="status" type="select" onChange={this.handleOnChange}>
                                <option>Pending</option>
                                <option>Completed</option>
                                </Input>
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.updateTask}>Edit Project</Button>{' '}
                            <Button color="secondary" onClick={this.toggleEditTaskModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    </Table>
                    </div>
        )
    }
}
export default Task;
import React from "react";
import axios from "axios";
import { Button, Table,Modal,ModalBody,ModalFooter,ModalHeader,FormGroup,Label,Input } from "reactstrap";
class DeveloperTaskDetails extends React.Component{
constructor(){
    super()
    this.state={
        tasks:[]
    }
}
componentWillMount(){
    this.refreshTasks()
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
                    
                    </Table>
                    </div>
    )
}
}
export default DeveloperTaskDetails;
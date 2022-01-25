import axios from "axios";
import React from "react";
import { Button, Table,Modal,ModalBody,ModalFooter,ModalHeader,FormGroup,Label,Input } from "reactstrap";

class Project extends React.Component{
    constructor(){
        super()
        this.state={
            projects:[],
            newProject:{
                id:'',
                name:''
            },
            editProject:{
                id:'',
                name:''
            },
            newProjectModal:false,
            editProjectModal:false
        }
    }
    componentWillMount(){
        this.refreshProject()
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
    addProject = () => {
        const { newProject, projects } = this.state
        axios.post('http://localhost:3000/project/', newProject)
            .then((response) => {
                console.log(response.data)
                projects.push(response.data)
                this.setState({
                    newProject: {
                        id: '',
                        name: ''
                    },
                    newProjectModal: false
                })
            })
    }
    deleteProject = (id) =>{
        console.log(id)
        axios.delete('http://localhost:3000/project/'+id)
        .then((response)=>{
            this.refreshProject()
        })
    }
    fillProjectData = (id,name) =>{
        this.setState({
            editProject:{
                id,
                name
            },
            editProjectModal:!this.state.editProjectModal

        })
    }
    updateProject = () =>{
        console.log("Working Up")
        let {id,name} = this.state.editProject
        console.log(id)
        console.log(name)
        axios.put('http://localhost:3000/project/' + id,{name} )
        .then((response)=>{
            this.refreshProject()
        })
    }
    toggleNewProjectModal = () =>{
        this.setState({
            newProjectModal:!this.state.newProjectModal
        })
    }
    toggleEditProjectModal = () =>{
        this.setState({
            editProjectModal:!this.state.editProjectModal
        })
        
    }
    handleOnChange = (e) =>{
        const target =e.target
        const name = target.name
        const value = target.value
        this.setState({
            newProject:{
                [name]:value
            },
            editProject:{
                [name]:value
            }
        })
    }
    
    render(){
        const {projects} =this.state
        let proj = projects.map(project=>{
            return(
                <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>{project.name}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2" onClick={()=>this.fillProjectData(project.id,project.name)}>Edit</Button>
                        <Button color="danger" size="sm" onClick={()=>this.deleteProject(project.id)}>Delete</Button>
                    </td>
                </tr>
            )})
        return(
            <div className="App container">
                <Button className="my-3" color="primary" size="md" onClick={this.toggleNewProjectModal}>Add</Button>
                <Table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>name</td>
                            <td>Edit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {proj}
                    </tbody>
                    <Modal isOpen={this.state.newProjectModal} toggle={this.toggleNewProjectModal}>
                        <ModalHeader toggle={this.toggleNewProjectModal}>Add a new Project</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="id">Id</Label>
                                <Input id="id" value={this.state.newProject.id} name="id" onChange={this.handleOnChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input id="name" value={this.state.newProject.name} name="name" onChange={this.handleOnChange} />
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addProject}>Add Project</Button>{' '}
                            <Button color="secondary" onClick={this.toggleNewProjectModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.editProjectModal} toggle={this.toggleEditProjectModal}>
                        <ModalHeader toggle={this.toggleEditProjectModal}>Edit Project</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="id">Id</Label>
                                <Input id="id" value={this.state.editProject.id} name="id" onChange={this.handleOnChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input id="name" value={this.state.editProject.name} name="name" onChange={this.handleOnChange} />
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={()=>this.updateProject()}>Edit Project</Button>{' '}
                            <Button color="secondary" onClick={this.toggleEditProjectModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Table>
            </div>
        )
    }
}
export default Project;
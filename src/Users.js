import axios from "axios";
import React from "react";
import { Button, Table,Modal,ModalBody,ModalFooter,ModalHeader,FormGroup,Label,Input } from "reactstrap";

class User extends React.Component{
    constructor(){
        super()
        this.state={
            users:[],
            newUser:{
                id:'',
                name:'',
                userType:''
            },
            editUser:{
                id:'',
                name:''
            },
            newUserModal:false,
            editUserModal:false
        }
    }
    componentWillMount(){
        this.refreshUser()
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
    addUser = () => {
        const { newUser, users } = this.state
        console.log(newUser)
        axios.post('http://localhost:3000/User/', newUser)
            .then((response) => {
                console.log(response.data)
                users.push(response.data)
                this.setState({
                    newUser: {
                        id: '',
                        name: '',
                        userType:''
                    },
                    newUserModal: false
                })
            })
    }
    deleteUser = (id) =>{
        console.log(id)
        axios.delete('http://localhost:3000/User/'+id)
        .then((response)=>{
            this.refreshUser()
        })
    }
    fillUserData = (id,name) =>{
        this.setState({
            editUser:{
                id,
                name
            },
            editUserModal:!this.state.editUserModal

        })
    }
    updateUser = () =>{
        console.log("Working Up")
        let {name} = this.state.editUser
        console.log(this.state.editUser.id)
        console.log(name)
        axios.put('http://localhost:3000/User/' + this.state.editUser.id,{name} )
        .then((response)=>{
            this.refreshUser()
            this.setState({
                editUserModal:false,
                editUser:{
                    id:'',
                    name:''
                }
            })
        })
        
    }
    toggleNewUserModal = () =>{
        this.setState({
            newUserModal:!this.state.newUserModal
        })
    }
    toggleEditUserModal = () =>{
        this.setState({
            editUserModal:!this.state.editUserModal
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
            newUser:{
                ...this.state.newUser,
                [name]:value
            }
        })
    }
    handleOnChangeUpdated = (e) =>{
        let { editUser } = this.state;
        editUser.name = e.target.value;
        this.setState({
            editUser
        })
    }
    render(){
        const {users} =this.state
        let proj = users.map(User=>{
            return(
                <tr key={User.id}>
                    <td>{User.id}</td>
                    <td>{User.name}</td>
                    <td>{User.userType}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2" onClick={()=>this.fillUserData(User.id,User.name)}>Edit</Button>
                        <Button color="danger" size="sm" onClick={()=>this.deleteUser(User.id)}>Delete</Button>
                    </td>
                </tr>
            )})
        return(
            <div className="App container">
                <Button className="my-3" color="primary" size="md" onClick={this.toggleNewUserModal}>Add</Button>
                <Table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>name</td>
                            <td>userType</td>
                            <td>Edit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {proj}
                    </tbody>
                    <Modal isOpen={this.state.newUserModal} toggle={this.toggleNewUserModal}>
                        <ModalHeader toggle={this.toggleNewUserModal}>Add a new User</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="id">Id</Label>
                                <Input id="id" value={this.state.newUser.id} name="id" onChange={this.handleOnChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input id="name" value={this.state.newUser.name} name="name" onChange={this.handleOnChange} />
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addUser}>Add User</Button>{' '}
                            <Button color="secondary" onClick={this.toggleNewUserModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal}>
                        <ModalHeader toggle={this.toggleEditUserModal}>Edit User</ModalHeader>
                        <ModalBody>
                            
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input id="name" value={this.state.editUser.name} name="name" onChange={this.handleOnChangeUpdated} />
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.updateUser}>Edit User</Button>{' '}
                            <Button color="secondary" onClick={this.toggleEditUserModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Table>
            </div>
        )
    }
}
export default User;
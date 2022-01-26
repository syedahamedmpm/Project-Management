import React from "react";
import axios from "axios";
import { Button, Input } from "reactstrap";

class Login extends React.Component{
    constructor(){
        super();
        this.state={
            users:[],
            loggedinUser:{
            name:'',
            password:'',
            userType:'admin'
            }
            
        }
    }
    handleOnChange =(e)=>{
        const target = e.target
        const name = target.name
        const value = target.value
        this.setState({
            loggedinUser: {
                ...this.state.loggedinUser,
                [name]: value
            }
           
        })
    }
    loggedIn = () =>{
        console.log(this.state.loggedinUser)
        axios.get('http://localhost:9000/users/' ,this.state.loggedinUser)
    .then((response)=>{
        console.log(response.data)
        let re = response.data
        let adm = re.filter(us=>us.userType==this.state.loggedinUser.userType)
        console.log(adm)
        this.setState({
            users:adm
        })
        
        console.log(this.state.users)
        const { match, location, history } = this.props
        if(this.state.users[0].userType=="admin"){
            console.log("success")
            history.push('/Projects')
        }
        else if(this.state.users[0].userType=="Developer"){
            history.push('/DeveloperTaskDetails')
        }
        else if(this.state.users[0].userType=="Manager"){
            history.push('/Tasks')
        }
    })
    
    }
    render(){
        return(
            <div className="App container">
                <Input
                type="text"
                name="name"
                value={this.state.loggedinUser.name}
                onChange={this.handleOnChange}
                />
                <Input
                type="password"
                name="password"
                value={this.state.loggedinUser.password}
                onChange={this.handleOnChange}
                />

                <Input
                type="select"
                name="userType"
                value={this.state.loggedinUser.userType}
                onChange={this.handleOnChange}
                >
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Developer</option>
                </Input>

                <Button color="primary" size="lg" onClick={this.loggedIn}>Login</Button>
            </div>
        )
    }
}
export default Login;
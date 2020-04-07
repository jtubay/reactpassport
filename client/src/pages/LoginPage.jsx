import React, { Component } from 'react';


class LoginPage extends Component {
    state = {
        email : "",
        password: ""
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    handleSubmit = e =>{
        e.preventDefault()
        const data = {
            email: this.state.email,
            password: this.state.password
        }

        fetch('/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    }

    render(){
        return (
            <div>
                <h1>Henlo pls log in</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="email" placeholder="Email" onChange={this.handleInputChange}/>
                    <input type="password" name="password" placeholder="Password" onChange={this.handleInputChange}/>
                    <button>Login</button>
                </form>
            </div>

        )
    }
}


export default LoginPage;
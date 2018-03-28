import React, { Component } from 'react';

import { AUTH_TOKEN } from '../constants';

class Login extends Component {
    state = {
        login: true,
        email: '',
        password: '',
        name: '',
    };

    render() {
        return(
            <div>
                <h4 className="mv3">{this.state.login ? 'Login' : 'Sign Up'}</h4>
                <div className="flex flex-column">
                    {!this.state.login && (
                        <input
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                            type="text"
                            placeholder="Your name"
                        />
                    )}
                    <input
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                        type="text"
                        placeholder="Your email"
                    />
                    <input
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                        type="text"
                        placeholder="Your password"
                    />
                </div>
                <div className="flex mt3">
                    <div className="pointer mr2 button" onClick={this._confirm()}>
                        {this.state.login ? 'login' : 'create account'}
                    </div>
                    <div
                        className="pointer button"
                        onClick={() => this.setState({ login: !this.state.login })}
                    >
                        {this.state.login
                            ? 'Need to create an account'
                            : 'Already have an account' }
                    </div>
                </div>
            </div>
        )
    }

    _confirm = async () => {
        //TODO implement
    };

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}

export default Login;
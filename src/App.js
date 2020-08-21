import React, { Component } from 'react'
import './App.css';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import AuthPage from './AuthPage';
import ListPage from './ListPage';
import Header from './Header';
import SearchPage from './SearchPage';

export default class App extends Component {

  state = {
    token: localStorage.getItem('token'),
  };

  handleToken = (token) => {
    this.setState({ token: token });

    localStorage.setItem('token', token)

    console.log(this.state.token)
  }

  clearToken = () => {
    this.setState({ token: '' });

    localStorage.setItem('token', '');
  }

  render() {
    return (
            <div className="App">
              <Router>
                  <Header />
                  {
                    !this.state.token ? <Redirect to='/login' /> : <button onClick={this.clearToken}>Logout</button>
                  }
                    <Switch>
                        <Route 
                            path="/" 
                            exact
                            render={(routerProps) => <SearchPage token={this.state.token}
                            handleToken={this.handleToken}
                             {...routerProps} />} 
                        />
                        <Route 
                            path="/list" 
                            exact
                            render={(routerProps) => <ListPage token={this.state.token}
                            handleToken={this.handleToken}
                             {...routerProps} />} 
                        />
                        <Route 
                            path="/login" 
                            exact
                            render={(routerProps) => <AuthPage 
                            token={this.state.token}
                            handleToken={this.handleToken}
                                {...routerProps} />} 
                        />
                    </Switch>
                  </Router>
            </div>
    )};
}

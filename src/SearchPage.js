import React, { Component } from 'react'
import { fetchMovies, searchMovies } from './favorites-api.js'

export default class SearchPage extends Component {

    state = {
        movies: [],
        searchQuery: ''
    }

    componentDidMount = async () => {
        if(!this.props.token) {
            this.props.history.push('/login');
        }
        else {
            const data = await fetchMovies();
            this.setState({
                movies: data.body
            });
            console.log(data.body)
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await searchMovies(this.state.searchQuery);
            this.setState({
                movies: data.body
            })
        }
        catch (e) { 
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <input placeholder="MOVIE" onChange={e => this.setState({searchQuery: e.target.value})} value={this.state.searchQuery} />
                        <br /> <br />
                        <button>SUBMIT</button>
                    </form>
                </div>
                {
                    this.state.movies.map(movie => { 
                    return <div onClick={this.handleClick}><div>{movie.title}</div>
                    <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500/` + movie.poster_path}></img>
                    </div>})
                }
            </div>
        )
    }
}

import React, { Component } from 'react';

import './feed.css'

import api from '../../services/api';

import Menu from '../../components/menu';
import Galery from '../../components/galery';
export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBeed: '',
      isLoading: false
    }
  }

  componentDidMount() {
    this.getDogs();
  }

  getDogs = async () => {
    try {
      this.setState({
        isLoading: true,
        errorText: ''
      });

      const token = await localStorage.getItem('token');
      const req = await api.get('/feed', { headers: {
          Authorization: token
        }
      });

      this.setState({
        data: req.data,
        isLoading: false
      });

    } catch (error) {
      this.setState({
        errorText: error.response.data.error.message,
        isLoading: false,
      });
    }
  }

  render() {
    return (
      <div className="feed-page">
        <h1 className="feed-page-title">IDog</h1>
        <Menu />
        {!this.state.data ? 'loading...' : <Galery list={this.state.data.list}/>}
      </div>
    )
  }
}

import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import TeamCard from '../TeamCard';

import './index.css';

const teamsApiUrl = 'https://apis.ccbp.in/ipl';

class Home extends Component {
  state = {
    isLoading: true,
    teamsData: [],
  };

  componentDidMount() {
    this.getTeams();
  }

  getTeams = async () => {
    try {
      const response = await fetch(teamsApiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch teams');
      }
      const fetchedData = await response.json();
      const formattedData = fetchedData.teams.map(team => ({
        name: team.name,
        id: team.id,
        teamImageURL: team.team_image_url,
      }));

      this.setState({
        teamsData: formattedData,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  renderTeamsList = () => {
    const { teamsData } = this.state;

    return (
      <ul className="teams-list">
        {teamsData.map(team => (
          <li key={team.id}>
            <Link to={`/team-matches/${team.id}`}>
              <TeamCard team={team} />
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  );

  render() {
    const { isLoading } = this.state;

    return (
      <div className="home-route-container">
        <div className="teams-list-container">
          <div className="ipl-dashboard-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    );
  }
}

export default Home;

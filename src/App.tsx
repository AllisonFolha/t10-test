import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddUser from "./components/add";
import UserList from "./components/list";
import { Chart } from "react-google-charts";

class App extends Component {
  render() {
    return (
      <div>
        <AddUser></AddUser>
        <div className="container mt-3">
          <h2>DATA</h2>
          <p> Desafio tecnico T10</p>
          <UserList></UserList>
          <Chart
            chartType="PieChart"
            data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
            width="100%"
            height="400px"
            legendToggle
          />
        </div>
      </div>
    );
  }
}

export default App;

import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddUser from "./components/add";
import UserList from "./components/list";
import GoogleChart from "./components/chart";


class App extends Component {
  render() {
    return (
      <div>
        <AddUser/>
        <div className="container mt-5">
          <div className="d-flex align-items-start flex-column">
            <h2>DATA</h2>
            <p> Desafio tecnico T10</p>
          </div>
          <div className="d-flex justify-content-between">
          <UserList />
          <GoogleChart />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

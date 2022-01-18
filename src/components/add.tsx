import { Component, ChangeEvent } from "react";
import UserDataService from "../services/service";
import IUserData from '../types/type';

type Props = {};

type State = IUserData & {
  submitted: boolean
};

export default class AddUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeParticipation = this.onChangeParticipation.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);
    this.state = {
      name: "",
      lastName: "",
      participation: "",

      submitted: false,
    };
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeLastName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      lastName: e.target.value,
    });
  }
  onChangeParticipation(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      participation: e.target.value,
    });
  }

  saveUser() {
    let data = {
      name: this.state.name,
      lastName: this.state.lastName,
      participation: this.state.participation,
    };

    UserDataService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      name: "",
      lastName: "",
      participation: "",

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>User create successfully!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Add more
            </button>
          </div>
        ) : (
          <div className="row align-items-start justify-content-between">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Description</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                required
                value={this.state.lastName}
                onChange={this.onChangeLastName}
                name="lastName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Participation</label>
              <input
                type="number"
                className="form-control"
                id="participation"
                required
                value={this.state.participation}
                onChange={this.onChangeParticipation}
                name="participation"
              />
            </div>

            <button onClick={this.saveUser} className="btn btn-success justify-content-end">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

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
      name: '',
      lastName: '',
      participation: '',

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
        setTimeout(() => {
          this.newUser()
        }, 600);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      name: '',
      lastName: '',
      participation: '',

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div className="alert alert-success" role="alert">
            User create successfully!
          </div>
        ) : (
          <div className="row">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Fist name"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                id="lastName"
                required
                value={this.state.lastName}
                onChange={this.onChangeLastName}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Participation"
                id="participation"
                required
                value={this.state.participation}
                onChange={this.onChangeParticipation}
              />
            </div>
            <button onClick={this.saveUser} className="btn btn-outline-light">
              SEND
            </button>
          </div>


        )}
      </div>
    );
  }
}

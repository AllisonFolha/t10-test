import { Component } from "react";
import UserDataService from "../services/service";
import IUserData from '../types/type';

type Props = {};

type State = {
  users: Array<IUserData>,
  currentUser: IUserData | null,
  currentIndex: number
};

export default class UsersList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    UserDataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    UserDataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items: any) {
    let users = new Array<IUserData>();

    items.forEach((item: any) => {
      let key = item.key;
      let data = item.val();
      users.push({
        key: key,
        name: data.name,
        lastName: data.lastName,
        participation: data.participation,
      });
    });

    this.setState({
      users: users,
    });
  }

  refreshList() {
    this.setState({
      currentUser: null,
      currentIndex: -1,
    });
  }

  render() {
    const { users, currentUser, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Participations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {users &&
                  users.map((user, index) => (
                    <td className="list-group-item ">
                      {user.name}
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li className="list-group-item ">
                  {user.name + user.lastName + user.participation}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

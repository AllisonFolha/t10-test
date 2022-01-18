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
    const { users} = this.state;

    return (
      <div className="col-md-7">
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
            {users &&
              users.map((user, index) => (
                  <tr key={user.key}>
                    <td>
                      {user.key}
                    </td>
                    <td >
                      {user.name}
                    </td>
                    <td >
                      {user.lastName}
                    </td>
                    <td >
                      {user.participation}
                    </td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

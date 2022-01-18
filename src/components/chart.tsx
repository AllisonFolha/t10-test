import { Component } from "react";
import UserDataService from "../services/service";
import IUserData from '../types/type';
import { Chart } from "react-google-charts";

type Props = {};

type State = {
  users: Array<IUserData>,
  currentUser: IUserData | null,
  currentIndex: number
};

export default class UserChart extends Component<Props, State> {
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

  data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7], // CSS-style declaration
  ];

  options = {
    title: "My Daily Activities",
    pieHole: 0.4,
    is3D: false,
  };

  render() {
    const { users, currentUser, currentIndex } = this.state;

    return (
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={this.data}
        options={this.options}
      />
    );
  }
}

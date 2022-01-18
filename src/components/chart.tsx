import { Component } from "react";
import Chart from "react-google-charts";
import UserDataService from "../services/service";
import IUserData from "../types/type";
type Props = {};

type State = {
  users: Array<IUserData>,
  chartData: any[][]
};

export default class GoogleChart extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.onDataChange = this.onDataChange.bind(this);
    this.state = {
      users: [],
      chartData: [],

    };
  }
 
  componentDidMount() {
    UserDataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    UserDataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items: any) {
    let chartData = [["name", "participation"]];

    items.forEach((item: any) => {
      let data = item.val();
      chartData.push([
       data.name,
       parseInt(data.participation, 10)
      ]);
    });

    this.setState({
      chartData: chartData,
    });
  }

  render() { 
    return (
      <div className="col-md-5">
        <Chart
          width={'600px'}
          height={'350px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={this.state.chartData}
          options={{
            pieHole: 0.4,
            is3D: false,
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    )
  }
}
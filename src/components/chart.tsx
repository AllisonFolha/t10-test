import { Component } from "react";
import Chart from "react-google-charts";
import IUserData from "../types/type";
type Props = {};

type State = {
  users: Array<IUserData>,
};

const data = [
  [
    'Month',
    'Bolivia',
    'Ecuador',
    'Madagascar',
    'Papua New Guinea',
    'Rwanda',
    'Average',
  ],
  ['2004/05', 165, 938, 522, 998, 450, 614.6],
  ['2005/06', 135, 1120, 599, 1268, 288, 682],
  ['2006/07', 157, 1167, 587, 807, 397, 623],
  ['2007/08', 139, 1110, 615, 968, 215, 609.4],
  ['2008/09', 136, 691, 629, 1026, 366, 569.6],
];

export default class GoogleChart extends Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      users: [],
    };
  }

  render() {
    return (
      <div className="col-md-6">
        <Chart
          width={'600px'}
          height={'350px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          // data={this.state.users}
          data={data}
          options={{
            title: 'Monthly Coffee Production by Country',
            pieHole: 0.4,
            is3D: false,
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    )
  }
}

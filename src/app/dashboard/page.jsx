import BarChart from "../../components/barChart";
import Header from "../../components/header";
import PieChart from "../../components/pieChart";
import DragFromOutsideLayout from "../../components/reactGridLayout";
import "./style.css";
import { FloatButton } from "antd";

export default function Dashboard() {
  return (
    <div>
      <Header child="true" />
      <div className="d-flex">
        <DragFromOutsideLayout />
      </div>
    </div>
  );
}

import { BrowserRouter } from "react-router-dom";
import DateRangePicker from "../component/DateRangePicker";

const [startDate, endDate] = [new Date("2024-01-01"), new Date("2024-01-07")];
export default {
  title: "Date Time Range Picker",
  component: (
    <DateRangePicker
      datePicker={[startDate, endDate]}
      setDatePicker={() => {}}
    />
  ),
};
export const Default = () => (
  <BrowserRouter>
    <DateRangePicker
      datePicker={[startDate, endDate]}
      setDatePicker={() => {}}
    />
  </BrowserRouter>
);

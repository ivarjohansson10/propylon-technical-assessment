import BillTable from "./components/BillTable.tsx";
import { Typography } from "@mui/material";

const App = () => {
  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <Typography variant="h4" align={"center"} gutterBottom>
        Propylon Technical Assessment
      </Typography>
      <BillTable />
    </div>
  );
};

export default App;

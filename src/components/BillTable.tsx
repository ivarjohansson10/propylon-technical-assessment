import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import BillList from "./BillList.tsx";
import BillStatusSelect from "./BillStatusSelect.tsx";
import { getBills } from "../store/legislation.ts";
import {
  Button,
  Fade,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Tab,
  Tabs,
} from "@mui/material";

/* -----------------------------------
 *
 * BillList
 *
 * -------------------------------- */

function BillTable() {
  const dispatch = useAppDispatch();

  const { bills, isLoading, favorites } = useAppSelector(
    (state) => state.legislation,
  );

  const [offset, setOffset] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [billStatus, setBillStatus] = React.useState("");
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  };

  function TabPanel({ children }) {
    return <div>{children}</div>;
  }

  useEffect(() => {
    dispatch(getBills(offset, billStatus));
  }, [offset, billStatus, dispatch]);

  function handlePrevClick() {
    setPage(page - 1);
    setOffset(offset - 20);
  }

  function handleNextClick() {
    setPage(page + 1);
    setOffset(offset + 20);
  }

  const onHandleChange = (type) => {
    setBillStatus(type);
  };

  return (
    <Card>
      <Card>
        <BillStatusSelect handleChange={(type) => onHandleChange(type)} />
      </Card>

      <Card sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        <Button disabled={page === 1} onClick={handlePrevClick}>
          Prev
        </Button>
        <Button disabled>{page}</Button>
        <TableCell>
          <Button onClick={handleNextClick} disabled={!bills.length}>Next</Button>
        </TableCell>
      </Card>

      <Card>
        <Tabs value={currentTabIndex} centered onChange={handleTabChange}>
          <Tab label="Bills" />
          <Tab label="Favourites" />
        </Tabs>
      </Card>

      <Fade in={!isLoading}>
        <Table sx={{ width: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>Bill number</TableCell>
              <TableCell>Bill type</TableCell>
              <TableCell>Bill status</TableCell>
              <TableCell>Bill Sponsor</TableCell>
            </TableRow>
          </TableHead>
          {!isLoading ? (
            <BillList bills={currentTabIndex === 0 ? bills : favorites} />
          ) : (
            <TabPanel>Loading...</TabPanel>
          )}
        </Table>
      </Fade>
    </Card>
  );
}

export default BillTable;

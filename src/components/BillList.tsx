import React, { useState } from "react";
import { useAppSelector } from "../store/hooks.ts";
import Bill from "./Bill.tsx";
import BillModal from "./BillModal.tsx";
import { TableBody } from "@mui/material";

/* -----------------------------------
 *
 * ISponsors
 *
 * -------------------------------- */

interface ISponsor {
  sponsor: {
    as: {
      showAs: string;
    };
    by: {
      showAs: string;
    };
  };
}

/* -----------------------------------
 *
 * IBillDetails
 *
 * -------------------------------- */

interface IBillDetails {
  billNo: number;
  billType: string;
  status: number;
  sponsors: ISponsor[];
  uri: string;
  longTitleEn: string;
  longTitleGa: string;
}

/* -----------------------------------
 *
 * IBill
 *
 * -------------------------------- */

interface IBill {
  bill: IBillDetails;
}

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
  bills: IBill[];
}

/* -----------------------------------
 *
 * BillList
 *
 * -------------------------------- */

const BillList = ({ bills }: IProps) => {
  const placeholder: IBillDetails = {
    billNo: 0,
    billType: "",
    status: 0,
    sponsors: [],
    uri: "",
    longTitleEn: "",
    longTitleGa: "",
  };

  const { favorites } = useAppSelector((state) => state.legislation);

  const [selectedBill, setSelectedBill] = useState(placeholder);
  const [open, setOpen] = useState(false);

  const handleShowModal = (bill) => {
    setSelectedBill(bill);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const isFavorite = (bill: IBillDetails) =>
    favorites.find((favorite) => favorite.bill.uri === bill.uri) ? true : false;

  return (
    <TableBody>
      {bills.map((bill, index) => (
        <Bill
          key={index}
          showModal={() => handleShowModal(bill.bill)}
          bill={bill.bill}
          isFavorite={isFavorite(bill.bill)}
        />
      ))}
      <BillModal
        bill={selectedBill}
        isOpen={open}
        closeModal={() => handleCloseModal()}
      />
    </TableBody>
  );
};

export default BillList;

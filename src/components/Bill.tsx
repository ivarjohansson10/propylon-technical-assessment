import React from "react";
import { useAppDispatch } from "../store/hooks.ts";
import {
  Tooltip,
  Button,
  TableRow,
  TableCell,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  addBillToFavorites,
  removeBillFromFavorites,
} from "../store/legislation.ts";
import { Favorite, Preview } from "@mui/icons-material";

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
 * IProps
 *
 * -------------------------------- */

interface IProps {
  bill: IBillDetails;
  isFavorite: boolean;
  showModal: () => void;
}

/* -----------------------------------
 *
 * Bill
 *
 * -------------------------------- */

const Bill = ({ bill, isFavorite, showModal }: IProps) => {
  const dispatch = useAppDispatch();

  const addToFavorites = () => {
    dispatch(addBillToFavorites(bill.uri));
  };

  const removeFromFavorites = (event) => {
    event.stopPropagation();
    dispatch(removeBillFromFavorites(bill.uri));
  };

  return (
    <TableRow>
      <TableCell>{bill.billNo}</TableCell>
      <TableCell>{bill.billType}</TableCell>
      <TableCell>{bill.status}</TableCell>
      <TableCell>
        <List>
          {bill.sponsors.map((sponsor, index) => (
            <ListItem key={index} disableGutters>
              <ListItemText primary={sponsor.sponsor.as.showAs} />
              <ListItemText primary={sponsor.sponsor.by.showAs} />
            </ListItem>
          ))}
        </List>
      </TableCell>
      <TableCell>
        {!isFavorite ? (
          <Tooltip title="Add to Favorites" arrow>
            <IconButton
              color="primary"
              aria-label="add to favorites"
              onClick={addToFavorites}
              size={"small"}
            >
              <Favorite />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Remove from Favorites" arrow>
            <IconButton
              aria-label="remove favorite"
              onClick={removeFromFavorites}
              size={"small"}
            >
              <Favorite />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
      <TableCell>
        <Tooltip title="Show Details" arrow>
          <IconButton
            color="primary"
            aria-label="Preview"
            onClick={showModal}
            size={"small"}
          >
            <Preview />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default Bill;

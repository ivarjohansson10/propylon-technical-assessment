import React, { useState } from "react";
import { Modal, Box, Fade, Typography, Tab, Tabs } from "@mui/material";
import parse from "html-react-parser";

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
  isOpen: boolean;
  closeModal: () => void;
}

/* -----------------------------------
 *
 * BillModal
 *
 * -------------------------------- */

const BillModal = ({ bill, isOpen, closeModal }: IProps) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  };

  const TabPanel = ({ children }) => (
    <Typography sx={{ p: 2 }}>{parse(children)}</Typography>
  );

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeModal}
        sx={{
          display: "block",
          m: "auto",
          justifyContent: "center",
          top: "25%",
          width: 600,
        }}
      >
        <Fade in={isOpen}>
          <Box sx={{ bgcolor: "whitesmoke" }}>
            <Tabs value={currentTabIndex} onChange={handleTabChange}>
              <Tab label="English" />
              <Tab label="Gaeilge" />
            </Tabs>
            <TabPanel
              children={
                currentTabIndex === 0 ? bill.longTitleEn : bill.longTitleGa
              }
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default BillModal;

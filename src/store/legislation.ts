import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LegislationApi } from "../service/Api.ts";

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
 * LegislationState
 *
 * -------------------------------- */

interface LegislationState {
  bills: IBill[];
  favorites: IBill[];
  isLoading: boolean;
  error: boolean;
}

const initialState = {
  bills: [],
  favorites: [],
  isLoading: false,
  error: false,
} as LegislationState;

const slice = createSlice({
  name: "legislation",
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    hasError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    billsSuccess: (state, action: PayloadAction<IBill[]>) => {
      state.bills = action.payload;
      state.isLoading = false;
    },
    addToFavorites: (state, action: PayloadAction<IBill[]>) => {
      state.favorites.push(action.payload[0]);
    },
    removeFromFavorites: (state, id: string) => {
      const index = state.favorites.findIndex((bill) => bill.bill.uri === id);
      state.favorites.splice(index, 1);
    },
  },
});

export default slice.reducer;

// Actions

const {
  billsSuccess,
  startLoading,
  addToFavorites,
  removeFromFavorites,
  hasError,
} = slice.actions;

export const getBills =
  (offset: number, status: string) => async (dispatch) => {
    dispatch(startLoading(true));
    const limit: number = 20;
    try {
      LegislationApi.getPaginated(limit, offset, status).then((response) =>
        dispatch(billsSuccess(response)),
      );
    } catch (e) {
      dispatch(hasError(e.message));
    }
  };

export const addBillToFavorites = (id: string) => async (dispatch) => {
  try {
    LegislationApi.getById(id).then((response) =>
      dispatch(addToFavorites(response)),
    );
  } catch (e) {
    dispatch(hasError(e.message));
  }
};

export const removeBillFromFavorites = (id: string) => (dispatch) => {
  dispatch(removeFromFavorites(id));
};

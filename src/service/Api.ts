/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const Api = axios.create({
  baseURL: "https://api.oireachtas.ie/v1/",
  timeout: 1000,
  headers: {
    Accept: "application/vnd.GitHub.v3+json",
  },
});

export const LegislationApi = {
  async getPaginated(limit: number, offset: number, status: string) {

    const params = {
      limit: limit,
      skip: offset,
    }

    if(status) params['bill_status'] = status;

    const response = await Api.get("legislation", {
      params: params,
    }).then((res) => {
      return res.data.results;
    });

    return response;
  },

  async getById(id: string) {
    const response = await Api.get("legislation", {
      params: {
        bill_id: id,
      },
    }).then((res) => {
      return res.data.results;
    });

    return response;
  },
};

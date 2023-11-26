import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import 'dotenv/config'

const API_URL = process.env.NX_BACKEND_URL
const REQ_TIMEOUT = process.env.NX_REQ_TIMEOUT;

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  if (!API_URL) {
    throw new Error(`Couldn't get api url from env file`)
  }

    if (!REQ_TIMEOUT) {
      throw new Error(`Couldn't get api url from env file`);
    }

  const api = axios.create({
    baseURL: API_URL,
    timeout: parseInt(REQ_TIMEOUT)});

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ error: string }>) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast.warn(error.response.data.error);
      }
      throw error;
    }
  );

  return api;
};

import axios, { AxiosError } from "axios";
import { showErrorToast } from "./validations";

type ApiErrorResponse = {
  msg?: string;
  error?: string;
  details?: string;
};

const isDev = process.env.NODE_ENV === "development";

export const handleServerError = (error: unknown): void => {
  let message = "An unexpected error occurred.";

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const status = axiosError.response?.status;
    const data = axiosError.response?.data;

    const serverMessage = data?.msg || data?.error || "Unknown error";

    if (isDev) {
      console.log("🔴 Axios Error:", {
        status,
        data,
        request: axiosError.request,
        config: axiosError.config,
      });
    }

    if (status) {
      if (status >= 500) {
        message = isDev
          ? `Server Error (${status}): ${serverMessage}`
          : "There was an error, try again later.";
      } else {
        switch (status) {
          case 400:
            message = isDev
              ? `400 Bad Request: ${serverMessage}`
              : "Invalid request.";
            break;
          case 401:
            message = isDev
              ? `401 Unauthorized: ${serverMessage}`
              : "Your session expired. Please login again.";
            break;
          case 403:
            message = isDev
              ? `403 Forbidden: ${serverMessage}`
              : "Access denied.";
            break;
          case 404:
            message = isDev
              ? `404 Not Found: ${serverMessage}`
              : "Resource not found.";
            break;
          default:
            message = isDev
              ? `Error ${status}: ${serverMessage}`
              : "Something went wrong, please try again.";
            break;
        }
      }
    } else if (axiosError.request) {
      message = isDev
        ? "No response received from server."
        : "Connection issue, please check your network.";
    } else {
      message = isDev
        ? `Axios setup error: ${axiosError.message}`
        : "Unexpected request error.";
    }
  } else {
    message = isDev
      ? `Unexpected error: ${String(error)}`
      : "Something went wrong. Please try again.";
  }

  showErrorToast(message);
};

import { string, z } from "zod";

export const ErrorResp = (code?: number, msg?: string | z.ZodError<any>) => {
  return {
    code: code || 500,
    msg:
      typeof msg === "string"
        ? msg
        : msg?.errors[0].message + " " + msg?.errors[0].path ||
          "internal server error",
  };
};

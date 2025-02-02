export const ErrorResp = (code?: number, msg?: string) => {
  return {
    code: code || 500,
    msg: msg || "internal server error",
  };
};

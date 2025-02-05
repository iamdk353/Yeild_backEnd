export const successResp = (msg: string, code?: number) => {
  return {
    code: code || 200,
    msg: msg,
  };
};

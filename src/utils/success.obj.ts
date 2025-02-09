interface products {
  productId: number;
  productName: string | null;
  price: number | null;
  quantity: number | null;
  buyerId: string | null;
  deliveryDate: string | null;
  buyerName: string | null;
}
export const successResp = (msg: string | products[], code?: number) => {
  return {
    code: code || 200,
    msg: msg,
  };
};

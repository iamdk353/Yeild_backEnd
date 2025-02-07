interface products {
  productId: number;
  farmerId: string | null;
  buyerId: string | null;
  quantity: number | null;
  productName: string | null;
  price: number | null;
  deliveryDate: string | null;
  farmerTerms: string | null;
  buyerTerms: string | null;
}
export const successResp = (msg: string | products[], code?: number) => {
  return {
    code: code || 200,
    msg: msg,
  };
};

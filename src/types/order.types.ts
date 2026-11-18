export interface CreateOrderDataDTO {
  userId: string;
  shippingAddress: string;
  phone: string;
  items: {
    suitcaseId: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
}

export interface UpdateOrderDataDTO extends Partial<CreateOrderDataDTO> {}

export interface CreateOrderDTO {
  shippingAddress: string;
  phone: string;
  items: {
    suitcaseId: string;
    quantity: number;
  }[];
}

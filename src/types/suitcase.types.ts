export interface CreateSuitcaseDTO {
  sku?: string,
  title: string;
  brand: string;
  price: number;
  color?: string | null;
  size?: string | null;
  inStock?: number;
  imageUrl?: string | null;
}

export interface UpdateSuitcaseDTO extends Partial<CreateSuitcaseDTO> {}
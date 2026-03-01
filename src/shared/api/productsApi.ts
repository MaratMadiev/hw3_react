import { baseApi } from "./baseApi";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      ProductsResponse,
      { limit: number; skip: number; search?: string }
    >({
      query: ({ limit = 10, skip = 0, search }) => {
        if (search) {
          return `/products/search?q=${search}&limit=${limit}&skip=${skip}`;
        }
        return `/products?limit=${limit}&skip=${skip}`;
      },
      providesTags: ["Products"],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productsApi;

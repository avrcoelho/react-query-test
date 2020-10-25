import { queryCache, useMutation } from "react-query"

import { IProduct } from "../types/product";
import api from '../services/api'

const createProduct = async ({url, product}: {url: string, product: Omit<IProduct, 'id'>}) => {
 const { data } =  await api.post<IProduct>(url, product);

 return data;
}

export const useMutatePost = (url: string) => {
  const [mutate] = useMutation<IProduct, any, any>(createProduct, {
    onSuccess: (data) => {

      queryCache.setQueryData<IProduct[]>(url, (prev) => prev ? [...prev, data] : [data])
    },
  });

  return [mutate]
}
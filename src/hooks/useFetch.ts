import { useQuery } from 'react-query';

import api from '../services/api'

export const useFetchPaginated = <Data = any, Error = any>(
  url: string,
  ) =>  {
    const {
      isLoading,
      isError,
      data,
      error,
    } = useQuery<Data, Error>(url, async () => {
       const { data } = await  api.get<Data>(`${url}`);

       return data;
    });

    return {
      isLoading,
      isError,
      data,
      error,
    };
}
import axios from 'axios';
import queryString from 'query-string';
import { SoftwareProductInterface, SoftwareProductGetQueryInterface } from 'interfaces/software-product';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSoftwareProducts = async (
  query?: SoftwareProductGetQueryInterface,
): Promise<PaginatedInterface<SoftwareProductInterface>> => {
  const response = await axios.get('/api/software-products', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSoftwareProduct = async (softwareProduct: SoftwareProductInterface) => {
  const response = await axios.post('/api/software-products', softwareProduct);
  return response.data;
};

export const updateSoftwareProductById = async (id: string, softwareProduct: SoftwareProductInterface) => {
  const response = await axios.put(`/api/software-products/${id}`, softwareProduct);
  return response.data;
};

export const getSoftwareProductById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/software-products/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSoftwareProductById = async (id: string) => {
  const response = await axios.delete(`/api/software-products/${id}`);
  return response.data;
};

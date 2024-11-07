import instance from '../instance';
export const http = {
  get: (url: string, params?: object, headers: object = { 'Content-Type': 'application/json' }) =>
    instance({
      method: 'GET',
      url,
      params,
      headers,
      transformResponse: [data => JSON.parse(data)],
    }),
  post: (url: string, params: any = {}, headers?: string) =>
    instance({
      method: 'POST',
      url,
      data: params,
      headers: {
        'Content-Type': headers || 'application/json',
      },
      transformResponse: [data => JSON.parse(data)],
    }),
  put: (url: string, params: any = {}, headers?: string) => {
    return instance({
      method: 'PUT',
      url,
      headers: {
        'Content-Type': headers || 'application/json',
      },
      data: params,
      transformResponse: [data => JSON.parse(data)],
    });
  },
  patch: (url: string, params: any = {}, headers?: string) =>
    instance({
      method: 'PATCH',
      url,
      data: params,
      headers: {
        'Content-Type': headers || 'application/json',
      },
      transformResponse: [
        data => {
          try {
            return JSON.parse(data);
          } catch (error) {
            console.error('Error parsing JSON:', error);
            return null; // or handle the error in a different way
          }
        },
      ],
    }),
  delete: (url: string, params: any = {}, headers?: string) =>
    instance({
      method: 'DELETE',
      url,
      data: params,
      headers: {
        'Content-Type': headers || 'application/json',
      },
      transformResponse: [data => JSON.parse(data)],
    }),
};

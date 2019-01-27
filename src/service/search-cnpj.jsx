import { http } from './http'

export const findCnpjCompany = cnpj => http.get(`quote/${cnpj}`, {
  validateStatus: (status) => {
    return status === 200 || status === 404;
  }
})

// http.get(cnpj => `quote/${cnpj}`).then(res => { return { status: res.status, statusText: res.statusText } })
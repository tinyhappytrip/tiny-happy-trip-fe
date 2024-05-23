import axios from 'axios'
import { getAccessToken } from './cookie'

const { VITE_VUE_API_URL } = import.meta.env

function noAuthAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  })
  return instance
}

function authAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${getAccessToken()}`
    }
  })
  return instance
}

const imagePath = (filePath) => {
  return `${VITE_VUE_API_URL}/image?path=${filePath}`
}

const proxyImagePath = (filePath) => {
  return `${VITE_VUE_API_URL}/proxy?url=${encodeURI(filePath)}`
}

export { noAuthAxios, authAxios, imagePath, proxyImagePath }

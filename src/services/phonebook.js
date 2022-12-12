/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
//create and save data to server
const baseUrl = 'http://localhost:3001/api/persons/'
const createAndSavePerson = async (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  const response = await request
  return response.data
}
const getAllPerson = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}
const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}${id}`)
  return request
}
const replaceNumber = async (id, newData) => {
  const request = axios.put(`${baseUrl}/${id}`, newData)
  const response = await request
  return response
}
export default {
  createAndSavePerson,
  getAllPerson,
  deletePerson,
  replaceNumber,
}

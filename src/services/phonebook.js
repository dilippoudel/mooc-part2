/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
//create and save data to server
const baseUrl = 'http://localhost:3001/api/persons'
const createAndSavePerson = async (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  const response = await request
  return response.data
}
const getAllPerson = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const deletePerson = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}
const replaceNumber = async (id, newData) => {
  const response = await axios.put(`${baseUrl}/${id}`, newData)

  return response.data
}
export default {
  createAndSavePerson,
  getAllPerson,
  deletePerson,
  replaceNumber,
}

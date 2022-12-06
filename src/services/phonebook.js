/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
//create and save data to server
const baseUrl = 'http://localhost:3001/persons'
const createAndSavePerson = async (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  const response = await request
  return response.data
}
const getAllPerson = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}
const deletePerson = (id) => {
  const request = axios.delete(`http://localhost:3001/persons/${id}`)
  return request
}
export default {
  createAndSavePerson,
  getAllPerson,
  deletePerson,
}

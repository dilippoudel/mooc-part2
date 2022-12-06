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

export default {
  createAndSavePerson,
  getAllPerson,
}

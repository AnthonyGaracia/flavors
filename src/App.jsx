import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [flavors, setFlavors] = useState([])

  useEffect(() => {
    const fetchFlavors = async () => {
      const {data} = await axios.get('http://localhost:3000/api/flavors')
      setFlavors(data)
    }
    fetchFlavors()
  },[])

  const deleteFlavor = async(flavorz) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/flavors/${flavorz.id}`)
      const newFlavors = flavors.filter((flavor) => {
        return flavor.id !== flavorz.id
      })
      setFlavors(newFlavors)
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div>
      <h1>Ice Cream FLavors - {flavors.length}</h1>
      {
        flavors.map((flavor) =>{
          return (
            <div key={flavor.id}>
              {flavor.name}
              <button onClick={() => {deleteFlavor(flavor)}}>X</button>
            </div>
          )
        })
      }
    </div>

  )
}

export default App

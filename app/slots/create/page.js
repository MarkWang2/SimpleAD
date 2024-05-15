import React  from 'react'
import Body from './Body'

async function getData() {
  const res = await fetch('http://localhost:3001/api/devices')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getData2() {
  const res = await fetch('http://localhost:3001/api/slots')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const App = async () => {
  const data = await getData()
   const data2 = await getData2()
  return (
     <main><Body data={data} /></main>
  )
}
export default App
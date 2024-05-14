import React  from 'react'
import Body from '@/app/device/Body'

async function getData() {
  const res = await fetch('http://localhost:3001/api/devices')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const App = async () => {
  const data = await getData()
  return (
     <main><Body data={data} /></main>
  )
}
export default App
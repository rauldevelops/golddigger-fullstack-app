const eventSource = new EventSource('http://127.0.0.1:8000/price/live')

const priceDisplay = document.getElementById('price-display')

const investForm = document.getElementById('invest-form')

investForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const formData = new FormData(investForm)
  const formDataObj = Object.fromEntries(formData.entries())
  try {
    const response = await fetch('http://127.0.0.1:8000/api', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formDataObj)
    })
    return response
  } catch(err) {
    console.log(err)
  }
  
})

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  const price = data.goldPrice

  priceDisplay.textContent = price
}

eventSource.onerror = () => {
  console.log('Connection failed...')
}
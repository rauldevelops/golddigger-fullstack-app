const eventSource = new EventSource('http://127.0.0.1:8000/price/live')

const priceDisplay = document.getElementById('price-display')
const investForm = document.getElementById('invest-form')
const dialog = document.querySelector('dialog')
const closeBtn = document.getElementById('close-btn')
const investmentSummary = document.getElementById('investment-summary')
const connectionStatus = document.getElementById('connection-status')

closeBtn.addEventListener('click', () => {
  dialog.close()
  investForm.reset()
})

investForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(investForm)
  const formDataObj = Object.fromEntries(formData.entries())
  investmentSummary.textContent = `You just bought ${(formDataObj.investmentamount/Number(priceDisplay.textContent)).toFixed(2)} oz for $${formDataObj.investmentamount}. \n You will receive documentation shortly`
  dialog.showModal()
  try {
    const response = await fetch('http://127.0.0.1:8000/api', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: `{
        "date": "${new Date()}",
        "currentgoldprice": "$${Number(priceDisplay.textContent)}",
        "investmentamount": "$${formDataObj.investmentamount}",
        "totalgoldpurchased": "${(formDataObj.investmentamount/Number(priceDisplay.textContent)).toFixed(2)} oz"
        }`
    })
    return response
  } catch(err) {
    console.log(err)
  }
})

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  const price = data.goldPrice

  connectionStatus.textContent = 'Live Price 🟢'
  priceDisplay.textContent = price
}

eventSource.onerror = () => {
  connectionStatus.textContent = 'Disconnected 🔴'
}
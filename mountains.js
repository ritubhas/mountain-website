//its a asynchronous functions with arguments for latitude and longitude
async function getSunsetForMountain(lat,lng){
    let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`)
    let data = await response.json() 
    //console.log(`The data, I am getting from the API is :${data.results}`)
    return data.results
}

function populateDropdown(){
    let mountainSelect = document.getElementById("mountain-select")
    
    const initialOption = document.createElement("option")
    initialOption.value = ""
    initialOption.text = "Select a Mountain"
    mountainSelect.appendChild(initialOption)
    initialOption.disabled = true

    for(let i=0; i<mountainData.length; i++){
        const mountainOption = document.createElement("option")
        mountainOption.value = i
        mountainOption.text = mountainData[i].name
        mountainSelect.appendChild(mountainOption)

    }
}

function displayMountainInfo(){
  const mountainIndex = document.getElementById("mountain-select").value
  const mountain = mountainData[mountainIndex]
  document.getElementById("mountain-name").innerHTML=`<p><strong>Name:</strong>${mountain.name}</p>`
  document.getElementById("mountain-description").innerHTML=`<p><strong>Desc:</strong>${mountain.desc}</p>`
  document.getElementById("mountain-elevation").innerHTML=`<p><strong>Elevtion:</strong>${mountain.elevation}</p>`
  document.getElementById("mountain-effort").innerHTML=`<p><strong>Effort:</strong>${mountain.effort}</p>`
  document.getElementById("mountain-image").setAttribute('src', mountain.img)

  getSunsetForMountain(mountain.lat,mountain.lng).then(
    data=>{
        document.getElementById("sunrise-time").innerHTML=`<p><strong>Sunrise:</strong>${data.sunrise}</p>`
        document.getElementById("sunset-time").innerHTML=`<p><strong>Sunset:</strong>${data.sunset}</p>`
    }
  )
}

document.getElementById('mountain-select').addEventListener('change',displayMountainInfo)// its inside the addEvent listener, thats why we didn't have () with fucntion
populateDropdown()
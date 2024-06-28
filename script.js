async function searchPet() {
    const petName = document.getElementById('pet-name').value;
    if (!petName) {
        alert('Please enter a pet name.');
        return;
    }

    try {
        // Fetch pet existence count
        const existsResponse = await fetch(`YOUR_API_BASE_URL_HERE/api/exists?name=${encodeURIComponent(petName)}`);
        if (!existsResponse.ok) {
            throw new Error('Failed to fetch existence data');
        }
        const existsData = await existsResponse.json();

        // Fetch pet RAP value
        const rapResponse = await fetch(`YOUR_API_BASE_URL_HERE/api/rap?name=${encodeURIComponent(petName)}`);
        if (!rapResponse.ok) {
            throw new Error('Failed to fetch RAP data');
        }
        const rapData = await rapResponse.json();

        // Fetch pet image
        const imageResponse = await fetch(`YOUR_API_BASE_URL_HERE/api/image?name=${encodeURIComponent(petName)}`);
        if (!imageResponse.ok) {
            throw new Error('Failed to fetch image data');
        }
        const imageData = await imageResponse.json();

        // Display the results
        displayResults({ name: petName, exists: existsData.exists, rap: rapData.rap, image: imageData.image });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data) {
        const petDiv = document.createElement('div');
        petDiv.classList.add('pet');

        const petImage = document.createElement('img');
        petImage.src = data.image;

        const petName = document.createElement('h2');
        petName.textContent = data.name;

        const petRap = document.createElement('p');
        petRap.textContent = `RAP: ${data.rap}`;

        const petExists = document.createElement('p');
        petExists.textContent = `Exists: ${data.exists}`;

        petDiv.appendChild(petImage);
        petDiv.appendChild(petName);
        petDiv.appendChild(petRap);
        petDiv.appendChild(petExists);

        resultsDiv.appendChild(petDiv);
    } else {
        resultsDiv.textContent = 'No results found';
    }
}

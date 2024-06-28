document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const petType = document.getElementById('petType').value;
    fetchPetValues(petType);
});

function fetchPetValues(petType) {
    const apiUrl = `https://biggamesapi.io/api/collection/Pets`; // Replace with your API endpoint

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => filterPetsByType(data, petType))
        .catch(error => console.error('Error fetching data:', error));
}

function filterPetsByType(data, petType) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const filteredPets = data.filter(pet => pet.type === petType);

    if (filteredPets.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    const list = document.createElement('ul');
    filteredPets.forEach(pet => {
        const listItem = document.createElement('li');
        listItem.textContent = `${pet.name}: ${pet.value}`;
        list.appendChild(listItem);
    });
    resultsDiv.appendChild(list);
}

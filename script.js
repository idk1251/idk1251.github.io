// Function to handle form submission
document.getElementById('server-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get form values
    var serverName = document.getElementById('server-name').value;
    var serverDescription = document.getElementById('server-description').value;
    var serverCategory = document.getElementById('server-category').value;
    var serverImage = document.getElementById('server-image').value;

    // Create a new server object
    var newServer = {
        name: serverName,
        description: serverDescription,
        category: serverCategory,
        image: serverImage
    };

    // Save the server object to local storage
    saveServer(newServer);

    // Clear form inputs
    document.getElementById('server-form').reset();

    // Display the newly added server in the list
    displayServers();
});

// Function to save server to local storage
function saveServer(server) {
    // Retrieve existing servers from local storage
    var servers = JSON.parse(localStorage.getItem('servers')) || [];

    // Add the new server to the array
    servers.push(server);

    // Store updated servers back in local storage
    localStorage.setItem('servers', JSON.stringify(servers));
}

// Function to display servers from local storage
function displayServers() {
    var serverListings = document.getElementById('server-listings');
    serverListings.innerHTML = ''; // Clear existing listings

    // Retrieve servers from local storage
    var servers = JSON.parse(localStorage.getItem('servers')) || [];

    // Loop through servers and create HTML elements
    servers.forEach(function(server) {
        var serverItem = document.createElement('div');
        serverItem.classList.add('server-item');

        // Create HTML structure for server listing
        serverItem.innerHTML = `
            <h3>${server.name}</h3>
            <p>${server.description}</p>
            <p>Category: ${server.category}</p>
            ${server.image ? `<img src="${server.image}" alt="${server.name} Image">` : ''}
        `;

        // Append server item to the server listings section
        serverListings.appendChild(serverItem);
    });
}

// Display existing servers on page load
displayServers();


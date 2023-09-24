// Function to fetch property data from the API
function fetchPropertyData() {
    fetch("http://localhost:3000/propertyData")
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if (Array.isArray(data.properties)) {
                const properties = data.properties;
                const propertiesContainer = document.querySelector(".properties");

                // Loop through each property and create HTML elements
                properties.forEach((property) => {
                    const propertyDiv = document.createElement("div");
                    propertyDiv.classList.add("property");

                    propertyDiv.innerHTML = `
                        <h3>${property.name}</h3>
                        <p><strong>Property ID:</strong> ${property.id}</p>
                        <p><strong>Property Name:</strong> ${property.name}</p>
                        <p><strong>Date of Creation :</strong> ${property.dateOfCreation}</p>
                        <p><strong>Location:</strong> ${property.location}</p>
                        <p><strong>Type:</strong> ${property.type}</p>
                        <p><strong>Rent:</strong> ${property.rent}</p>
                        <p><strong>Tenant ID:</strong> ${property.t_id}</p>
                        <p><strong>Tenant Name:</strong> ${property.t_name}</p>

                        <button class="edit-button">Edit</button>
                        <button class="delete-button">Delete</button>
                        <button class="history-button">History</button>
                    `;

                    // Add event listeners to buttons
                    const editButton = propertyDiv.querySelector(".edit-button");
                    const deleteButton = propertyDiv.querySelector(".delete-button");
                    const historyButton = propertyDiv.querySelector(".history-button");

                    editButton.addEventListener("click", () => editProperty(property));
                    deleteButton.addEventListener("click", () => deleteProperty(property));
                    historyButton.addEventListener("click", () => viewHistory(property));

                    propertiesContainer.appendChild(propertyDiv);
                });
            } else {
                console.error("API response does not contain 'properties' array.");
            }
        })
        .catch((error) => console.error("Error fetching data:", error));
}

// Function to open the property registration form
function openPropertyForm() {
    const propertyForm = document.getElementById("propertyForm");
    propertyForm.style.display = "block";
}

// Function to close the property registration form
function closePropertyForm() {
    const propertyForm = document.getElementById("propertyForm");
    propertyForm.style.display = "none";
}

function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add 1 to month since it's zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to submit the property registration form
function submitPropertyForm() {
        // Retrieve property details from the form
        const propertyName = document.getElementById("propertyName").value;
        const propertyLocation = document.getElementById("propertyLocation").value;
        const propertyType = document.getElementById("propertyType").value;
        const propertyRent = document.getElementById("propertyRent").value;
        const t_id = document.getElementById("t_id").value;
        const t_name = document.getElementById("t_name").value;
    
        // Create the property object
        const newProperty = {
            name: propertyName,
            dateOfCreation: getCurrentDate(), // You may need to define this function to get the current date
            location: propertyLocation,
            type: propertyType,
            rent: propertyRent,
            t_id: t_id,
            t_name: t_name
        };

        console.log(newProperty, "is my new property");

    // Call the API to register the property (you can use fetch or any other method here)
    // Replace 'yourApiUrl' with the actual URL of your registerProperty API
    fetch('registerProperty', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProperty),
        
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        // Property registration successful, you can update the UI or perform any other actions
        console.log('Property registered successfully:', data);

        // Close the property registration form
        closePropertyForm();

        // You may also update the properties list by calling fetchPropertyData or other relevant functions
    })
    .catch((error) => {
        console.error('Error registering property:', error);
    });
}


// Function to edit a property
function editProperty(property) {
    // Display the modal
    const modal = document.getElementById("editModal");
    modal.style.display = "block";

    // Populate form fields with property details
    document.getElementById("editName").value = property.name;
    document.getElementById("editLocation").value = property.location;
    document.getElementById("editRent").value = property.rent;

    console.log("Editing property:", property.name);
}

// Function to delete a property
function deleteProperty(property) {
    // Implement your delete logic here
    // You can remove the property from the JSON data and update the display
    console.log("Deleting property:", property.name);
}

// Function to view property history
function viewHistory(property) {
    // Implement your history view logic here
    // You can display a history log or information about the property
    alert("Fetching history for property: " + property.name);
}

// Function to close the edit modal
function closeModal() {
    // Hide the modal
    const modal = document.getElementById("editModal");
    modal.style.display = "none";
}

// Function to save changes when editing a property
function saveChanges() {
    // Retrieve edited values from the form
    const editedName = document.getElementById("editName").value;
    const editedLocation = document.getElementById("editLocation").value;
    const editedRent = document.getElementById("editRent").value;

    // Update the property object with edited values (you can save it to JSON data here)
    // For now, just log the edited values
    console.log("Edited Name:", editedName);
    console.log("Edited Location:", editedLocation);
    console.log("Edited Rent:", editedRent);

    // Close the modal
    closeModal();
}

// Call the function to fetch property data when the page loads
document.addEventListener("DOMContentLoaded", fetchPropertyData);

const api = 'https://reqres.in/api/users/';
const userList = document.getElementById('user-list');
const modal = document.getElementById('user-modal');
const modalContent = document.getElementById('modal-content');

// Hämta användardata från API:et 
async function fetchData() {
    const response = await fetch(api);
    const data = await response.json();

    if (response.ok) {

        // Loopa igenom användarna och visa information på sidan
        data.data.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('user-card');
            userDiv.innerHTML = `
                <h2>${user.first_name} ${user.last_name}</h2>
                <p>Email: ${user.email}</p>
                <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}">
            `;

            // Klickhändelse för att öppna modal
            userDiv.addEventListener('click', () => {
                openModal(user);
            });

            userList.appendChild(userDiv);
        });
        
        // Klickhändelse för att stänga modal
        const closeModal = document.querySelector('.close');
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    } else {
            // Loggar eventuella fel till konsolen
        console.error('data kunde inte hämtas.')
    }
}

// Visar användarinformation i modalen vid klickhändelse.
function openModal(user) {

    //Visa modalen
    modal.style.display = 'block'; 

    // Gör ett API-anrop med användarens id
    const userApi = `https://reqres.in/api/users/${user.id}`;

    // Hämtar data från API:et
    fetch(userApi)
        .then(response => response.json())
        .then(userData => {
            // Uppdaterar användarinformation i modalen
            modalContent.innerHTML = `
                <h2>${userData.data.first_name} ${userData.data.last_name}</h2>
                <p>Email: ${userData.data.email}</p>
                <img src="${userData.data.avatar}" alt="${userData.data.first_name} ${userData.data.last_name}">
            `;
        })

        .catch(error => {
            // Loggar eventuella fel till konsolen
            console.error('Ett fel inträffade', error);
        });
}

fetchData();
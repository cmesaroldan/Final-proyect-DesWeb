// public/script.js

// Registro de nuevo usuario
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('registerNombre').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, password })
        });
        const data = await response.json();
        alert(data.message || 'Registro exitoso');
    } catch (error) {
        console.error('Error:', error);
    }
});

// Inicio de sesión
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            alert('Inicio de sesión exitoso');
            // Cargar sitios turísticos tras iniciar sesión
            loadSitiosTuristicos();
        } else {
            alert(data.message || 'Error en inicio de sesión');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Cargar sitios turísticos
async function loadSitiosTuristicos() {
    try {
        const response = await fetch('/api/sitios', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const sitios = await response.json();
        const gridContainer = document.querySelector('.grid-container');
        gridContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar sitios
        sitios.forEach(sitio => {
            const sitioDiv = document.createElement('div');
            sitioDiv.classList.add('sitio');
            sitioDiv.innerHTML = `
                <img src="${sitio.imagen}" alt="${sitio.nombre}">
                <h4>${sitio.nombre}</h4>
                <p>${sitio.descripcion}</p>
                <a href="#" class="btn">Ver más</a>
            `;
            gridContainer.appendChild(sitioDiv);
        });
    } catch (error) {
        console.error('Error al cargar sitios turísticos:', error);
    }
}

// Verificar si el usuario ya ha iniciado sesión
if (localStorage.getItem('token')) {
    loadSitiosTuristicos();
}

// Manejo de formularios de autenticación
function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
}

// URL por defecto para imágenes placeholder
const DEFAULT_IMAGE = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        localStorage.setItem('token', data.token);
        showMainContent();
        loadPlaces();
    } catch (error) {
        alert(error.message);
    }
}

async function handleRegister(event) {
    event.preventDefault();
    const nombre = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, password })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error);

        localStorage.setItem('token', data.token);
        showMainContent();
        loadPlaces();
    } catch (error) {
        alert(error.message);
    }
}

async function handleLogout() {
    try {
        await fetch('/api/auth/logout', { method: 'POST' });
        localStorage.removeItem('token');
        showAuthForms();
    } catch (error) {
        console.error('Error en logout:', error);
    }
}

// Funciones de utilidad
function showMainContent() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}

function showAuthForms() {
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

// Cargar lugares turísticos
async function loadPlaces() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/places', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                showAuthForms();
                return;
            }
            throw new Error('Error en la red');
        }

        const places = await response.json();
        const placesDiv = document.getElementById('places');
        placesDiv.innerHTML = '';

        places.forEach(place => {
            const div = document.createElement('div');
            div.classList.add('place');
            div.innerHTML = `
                <h2>${place.name}</h2>
                <img src="${place.image_url || DEFAULT_IMAGE}" 
                     alt="${place.name}"
                     onerror="this.src='${DEFAULT_IMAGE}'">
                <p><strong>Descripción:</strong> ${place.description}</p>
                <p><strong>Dirección:</strong> ${place.address}</p>
            `;
            placesDiv.appendChild(div);
        });
    } catch (error) {
        console.error('Error al cargar los lugares turísticos:', error);
    }
}

// Agregar nuevo lugar
async function handleAddPlace(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const formData = {
        name: document.getElementById('name').value,
        image_url: document.getElementById('image_url').value || DEFAULT_IMAGE,
        description: document.getElementById('description').value,
        address: document.getElementById('address').value
    };

    try {
        const response = await fetch('/api/places', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            if (response.status === 401) {
                showAuthForms();
                return;
            }
            throw new Error('Error al agregar el lugar');
        }

        await loadPlaces();
        event.target.reset();
    } catch (error) {
        console.error('Error al agregar el lugar turístico:', error);
        alert('Error al agregar el lugar turístico');
    }
}

// Verificar token al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        fetch('/api/places', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                showMainContent();
                loadPlaces();
            } else {
                localStorage.removeItem('token');
                showAuthForms();
            }
        })
        .catch(error => {
            console.error('Error al verificar token:', error);
            localStorage.removeItem('token');
            showAuthForms();
        });
    } else {
        showAuthForms();
    }
});
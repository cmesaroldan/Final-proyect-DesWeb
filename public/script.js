document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/places');
        if (!response.ok) throw new Error('Error en la red');

        const places = await response.json();
        const placesDiv = document.getElementById('places');

        places.forEach(place => {
            const div = document.createElement('div');
            div.classList.add('place');
            div.innerHTML = `
                <h2>${place.name}</h2>
                <img src="${place.image_url}" alt="${place.name}" style="width:100%; height:auto;">
                <p><strong>Descripción:</strong> ${place.description}</p>
                <p><strong>Dirección:</strong> ${place.address}</p>
            `;
            placesDiv.appendChild(div);
        });
    } catch (error) {
        console.error('Error al cargar los lugares turísticos:', error);
    }
});

// Manejo del formulario de creación de nuevos lugares turísticos
document.getElementById('placeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const image_url = document.getElementById('image_url').value;
    const description = document.getElementById('description').value;
    const address = document.getElementById('address').value;

    try {
        const response = await fetch('/api/places', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, image_url, description, address })
        });

        if (!response.ok) throw new Error('Error al agregar el lugar');

        // Recargar la página para mostrar el nuevo lugar
        location.reload();
    } catch (error) {
        console.error('Error al agregar el lugar turístico:', error);
    }
});

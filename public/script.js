// Cargar sitios turísticos
async function loadSitiosTuristicos() {
    try {
        const response = await fetch('/api/sitios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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

// Llamar la función para cargar los sitios turísticos al iniciar la página
loadSitiosTuristicos();

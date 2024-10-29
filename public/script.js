document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Hacer una solicitud GET a la API para obtener los sitios turísticos
        const response = await fetch('/api/sitios');
        
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        
        // Convertir la respuesta a JSON
        const sitios = await response.json();
        
        // Seleccionar el elemento donde se mostrarán los sitios
        const sitiosDiv = document.getElementById('sitios');
        
        // Iterar sobre los sitios y crear elementos para mostrarlos
        sitios.forEach(sitio => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h2>${sitio.nombre}</h2>
                <p>${sitio.descripcion}</p>
            `;
            sitiosDiv.appendChild(div);
        });
    } catch (error) {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error('Error al cargar sitios:', error);
    }
});

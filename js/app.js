document.getElementById("peliculas").addEventListener("click", function () {
    const contenido = document.getElementById("contenido");
    contenido.style.display = "block";
    document.getElementById("form_new_actor").style.display = "none";

    // Limpiamos el contenido antes de cargar nuevas películas
    contenido.innerHTML = "<h2>Cargando películas...</h2>";

    fetch("http://localhost/apisakila/peliculas/all", { // ✅ Corrección aquí
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0dS1hcGkuY29tIiwiYXVkIjoidHUtYXBpLmNvbSIsImlhdCI6MTczOTQ3MzAyNSwiZXhwIjoxNzM5NDc2NjI1LCJ1c2VyX2lkIjoxfQ.NxH2FCPBCKUSn9eP7bG6YHLSyT7pLwVHxb6uGXG8NIY"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
            contenido.innerHTML = "<h2>No hay películas disponibles.</h2>";
            return;
        }

        let output = "<h2>Películas</h2><div class='peliculas-container'>";
        data.forEach(pelicula => {
            output += `
            <div class="pelicula">
                <h3>${pelicula.title}</h3>
                <p>${pelicula.description || "Sin descripción"}</p>
            </div>`;
        });
        output += "</div>";

        contenido.innerHTML = output;
        contenido.scrollTop = 0; // Desplaza al inicio tras actualizar
    })
    .catch(error => {
        contenido.innerHTML = `<h2>Error al cargar películas: ${error.message}</h2>`;
        console.error(error);
    });
});

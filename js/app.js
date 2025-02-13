// Evento para cargar películas
document.getElementById("peliculas").addEventListener("click", function () {
    const contenido = document.getElementById("contenido");
    contenido.style.display = "block";
    document.getElementById("form_new_actor").style.display = "none";

    // Mostrar mensaje de carga
    contenido.innerHTML = "<h2>Cargando películas...</h2>";

    fetch("http://localhost/apisakila/peliculas/all", {
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

// Evento para mostrar formulario de nuevo actor
document.getElementById("new_actor").addEventListener("click", function () {
    document.getElementById("contenido").style.display = "none";
    document.getElementById("form_new_actor").style.display = "flex";
});

// Evento para guardar un nuevo actor
document.getElementById("save_actor").addEventListener("click", function () {
    let firstName = document.getElementById("name").value.trim();
    let lastName = document.getElementById("last_name").value.trim();

    if (firstName === "" || lastName === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let actorData = {
        first_name: firstName,
        last_name: lastName
    };

    fetch("http://localhost/apisakila/actores/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(actorData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Actor guardado:", data);
        alert("Actor agregado con éxito.");
        document.getElementById("name").value = "";
        document.getElementById("last_name").value = "";
    })
    .catch(error => {
        console.error("Error al guardar actor:", error);
        alert("Hubo un error al guardar el actor.");
    });
});


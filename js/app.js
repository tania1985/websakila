document.getElementById("peliculas").addEventListener("click", function () {
    document.getElementById("contenido").hidden = false;
    document.getElementById("form_new_actor").hidden = true;
    fetch("http://192.168.100.166/apisakila/peliculas/all")
        .then(response => response.json())
        .then(data => {
            let output = "<h2>Peliculas</h2>";
            data.forEach(function (pelicula) {
                output += `
                <div>
                    <h3>${pelicula.title}</h3>
                    <p>${pelicula.description}</p>
                </div>
            `;
            });
            document.getElementById("contenido").innerHTML = output;
        });
});

document.getElementById("new_actor").addEventListener("click", function () {
    document.getElementById("contenido").hidden = true;
    document.getElementById("form_new_actor").hidden = false;
});

document.getElementById("save_actor").addEventListener("click", function () {
    let name = document.getElementById("name").value;
    let last_name = document.getElementById("last_name").value;
    let data = {
        name: name,
        last_name: last_name
    };
    fetch("http://192.168.100.166/apisakila/actores/new", {method: "POST", body: JSON.stringify(data)})
    .then (response => response.json())
    .then (data => {
        console.log(data);
    });
});

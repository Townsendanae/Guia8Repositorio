let cargarDatos = () => {
    
    fetch('https://dataserverdaw.herokuapp.com/escritores/xml')
        .then(response => response.text())
        .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        
        // nos interesa sacar el nombre y el id de cada escritor

        let escritoresArerglo = xml.getElementsByTagName('escritor')

        for (let escritor of escritoresArerglo){
              let id = escritor.getElementsByTagName('id')[0].textContent; 
              let nombre = escritor.getElementsByTagName('nombre')[0].textContent; 

              // hay que crear el option y pegarlo en el HTML
              //la plantilla es como si estuviera haciendo una etiqueta en HTML 
              let plantilla = `<option value="${id}">${nombre}</option>`

              // acceder al elemento donde se pone para buscar con queryselector

                // quuerySelector hace que mediante una consulta, se busque los selectores 
              document.querySelector('div.input-group > select').innerHTML += plantilla;
            }
        })
        .catch(console.error);


}


window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos();
})
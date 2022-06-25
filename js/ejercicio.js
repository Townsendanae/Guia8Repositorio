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


const elemento = document.querySelector('select');
elemento.addEventListener('change', (event) => {
    let select = document.querySelector('div.input-group > select')
    let index = select.options[select.selectedIndex].value;
    let texto = select.options[select.selectedIndex].text;
    DatosEscritores(index,texto);
    document.getElementById('frases').innerHTML = '' ;
});

//Se carga con fetch y se trabaja como si fuera JSON
let DatosEscritores = (index,text) => {
  fetch("https://dataserverdaw.herokuapp.com/escritores/frases").then(response =>  response.json())
      .then(data => {
          for (let datos in data['frases']){
              if ( datos['id_autor'] == Number(index) ) {
                  let plantilla = 
                  `<div class="col-lg-3">
                      <div class="test-inner">
                          <div class="test-author-thumb d-flex">
                              <div class="test-author-info">
                                  <h4>${text}</h4>
                              </div>
                          </div>
                          <span>${datos['texto']}</span>
                          <i class="fa fa-quote-right"></i>
                      </div>
                  </div>`
                  document.getElementById('frases').innerHTML += plantilla 
              }
          }
      })
      .catch(console.error);
}


window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos();
})




let input=document.querySelector(".input")
//botón del input
let boton=document.querySelector(".boton-agregar")
//contenedor de los botones
let container=document.querySelector(".container")

class Item {
  constructor(nombreTarea) {
    this.crearDiv(nombreTarea);
  }

  crearDiv(nombreTarea) {
    const inputItem = document.createElement("input");
    inputItem.setAttribute("type", "text");
    inputItem.disabled = true;
    inputItem.classList.add("item-input")
    inputItem.value = nombreTarea;
    let div=document.createElement("div")
    div.classList.add("item")
    div.style.display = "flex";
    div.style.justifyContent = "center";
  
    //botones
    let botonEditar=document.createElement("button")
    botonEditar.innerHTML= "<i class='fas fa-lock'></i>"
    botonEditar.classList.add("boton-editar")
    botonEditar.addEventListener("click", function() {
      if (inputItem.disabled) {
        inputItem.disabled = false;
        botonEditar.innerHTML = "<i class='fas fa-lock-open'></i>";
      } else {
        inputItem.disabled = true;
        botonEditar.innerHTML = "<i class='fas fa-lock'></i>";
      }
      // Guardar en el localStorage
      guardarEnLocalStorage();
    });

    let botonRemover=document.createElement("button")
    botonRemover.innerHTML= "<i class='fas fa-trash-alt text-white'></i>"

    botonRemover.classList.add("boton-remover")
    botonRemover.addEventListener("click", function() {
      div.remove();
      // Guardar en el localStorage
      guardarEnLocalStorage();
    });

    // Agregar elementos al contenedor
    div.appendChild(inputItem);
    div.appendChild(botonEditar);
    div.appendChild(botonRemover);
    container.appendChild(div); 
  }
}

// Cargar elementos del localStorage al cargar la página
cargarDesdeLocalStorage();

boton.addEventListener("click", function chequearInput() {
  if (input.value !== "") {
    const nuevaTarea = input.value;
    input.value = "";
    new Item(nuevaTarea);
    // Guardar en el localStorage
    guardarEnLocalStorage();
  }
})

function guardarEnLocalStorage() {
  const items = document.querySelectorAll('.item-input');
  let itemsArray = [];
  for (let i = 0; i < items.length; i++) {
    itemsArray.push(items[i].value);
  }
  localStorage.setItem('items', JSON.stringify(itemsArray));
}

function cargarDesdeLocalStorage() {
  if (localStorage.getItem('items')) {
    const itemsArray = JSON.parse(localStorage.getItem('items'));
    for (let i = 0; i < itemsArray.length; i++) {
      new Item(itemsArray[i]);
    }
  }
}


let tareas = [
  { id: 1, descripcion: "Llamar a papá", realizada: false },
  { id: 2, descripcion: "Comprar los regalos", realizada: false },
  { id: 3, descripcion: "Preparar la diapositiva", realizada: false },
  { id: 4, descripcion: "Hacer el informe", realizada: false },
];

const listadoTareas = document.getElementById("listado-tareas");
const totalTareas = document.getElementById("tareas-totales");
const tareasRealizadas = document.getElementById("tareas-completadas");
const inputTarea = document.getElementById("input-tarea");
const botonAgregar = document.getElementById("add");

function mostrarTareas() {
  listadoTareas.innerHTML = "";

  tareas.forEach((tarea) => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-id", tarea.id);

    const tdId = document.createElement("td");
    tdId.textContent = tarea.id;
    tr.appendChild(tdId);

    const tdDesc = document.createElement("td");
    tdDesc.textContent = tarea.descripcion;

    if (tarea.realizada) {
      tdDesc.classList.add("completed");
    }
    tr.appendChild(tdDesc);

    const tdEstado = document.createElement("td");
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = tarea.realizada;
    check.addEventListener("change", () => {
      toggleTarea(tarea.id);
    });
    tdEstado.appendChild(check);
    tr.appendChild(tdEstado);

    const tdEliminar = document.createElement("td");
    const btnDelete = document.createElement("button");
    btnDelete.textContent = "X";

    btnDelete.style.color = "red";
    btnDelete.style.background = "none";
    btnDelete.style.border = "none";
    btnDelete.style.cursor = "pointer";
    btnDelete.style.fontWeight = "bold";

    btnDelete.addEventListener("click", () => {
      eliminarTarea(tarea.id);
    });
    tdEliminar.appendChild(btnDelete);
    tr.appendChild(tdEliminar);

    listadoTareas.appendChild(tr);
  });

  actualizarResumen();
}

function actualizarResumen() {
  totalTareas.textContent = tareas.length;
  const completadas = tareas.filter((t) => t.realizada).length;
  tareasRealizadas.textContent = completadas;
}

function agregarTarea() {
  const descripcion = inputTarea.value.trim();
  if (descripcion !== "") {
    const nuevaTarea = {
      id: tareas.length
        ? tareas[tareas.length - 1].id + 1
        : 1,
      descripcion,
      realizada: false,
    };
    tareas.push(nuevaTarea);
    inputTarea.value = ""; //
    mostrarTareas();
  }
}

function eliminarTarea(id) {
  tareas = tareas.filter((t) => t.id !== id);
  mostrarTareas();
}

function toggleTarea(id) {
  tareas = tareas.map((t) => {
    if (t.id === id) {
      return { ...t, realizada: !t.realizada };
    }
    return t;
  });
  mostrarTareas();
}

botonAgregar.addEventListener("click", agregarTarea);

mostrarTareas();

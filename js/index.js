import { Futbolista } from "./models/Futbolista.js";
import { Profecional } from "./models/Profecional.js";

let data = '[{"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "titulo":"Ingeniero", "facultad":"UTN","anioGraduacion":2002},{"id":2, "nombre":"Ramiro", "apellido":"Escobar", "edad":35, "titulo":"Medico","facultad":"UBA", "anioGraduacion":20012},{"id":3, "nombre":"Facundo", "apellido":"Cairo", "edad":30,"titulo":"Abogado", "facultad":"UCA", "anioGraduacion":2017},{"id":4, "nombre":"Fernando", "apellido":"Nieto","edad":18, "equipo":"Independiente", "posicion":"Delantero", "cantidadGoles":7},{"id":5, "nombre":"Manuel","apellido":"Loza", "edad":20, "equipo":"Racing", "posicion":"Volante", "cantidadGoles":2},{"id":6, "nombre":"Nicolas","apellido":"Serrano", "edad":23, "equipo":"Boca", "posicion":"Arquero", "cantidadGoles":0}]';
const pJson = JSON.parse(data);

let personas = pJson.map(p => {
    if('equipo' in p && 'posicion' in p && 'cantidadGoles' in p) {
        console.log(p);
        return new Futbolista(p.id, p.nombre, p.apellido, p.edad, p.equipo, p.posicion, p.cantGoles);
    } else if('titulo' in p && 'facultad' in p && 'anioGraduacion' in p) {
        console.log(p);
        return new Profecional(p.id, p.nombre, p.apellido, p.edad, p.titulo, p.facultad, p.anioGraduacion);
    }
});

document.addEventListener("DOMContentLoaded", () => { 
    const tablaPersona = document.getElementById('tabla-persona');
    const filtro = document.getElementById('filtrar');
    const formAbm = document.getElementById('form-abm');
    const formDatos = document.getElementById('form-datos');
    const abmForm = document.getElementById('abm-form');
    const volverBtn = document.getElementById('btn-volver');
    const agregarBtn = document.getElementById('btn-guardar');
    const cancelarBtn = document.getElementById('btn-cancelar');
    const promedioPersona = document.getElementById('promedio-persona');
    const calcularPromedio = document.getElementById('btn-calcular');

    let editandoPersona = null;

    const MostrarDatos = () => {
        tablaPersona.innerHTML = '';
        const filtradas = personas.filter(p => {
            return filtro.value === 'todos' || 
                (filtro.value === 'futbolista' && p instanceof Futbolista) || 
                (filtro.value === 'profecional' && p instanceof Profecional);
        });

        filtradas.forEach(p => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="col-id">${p.id}</td>
                <td class="col-nombre">${p.nombre}</td>
                <td class="col-apellido">${p.apellido}</td>
                <td class="col-edad">${p.edad}</td>
                <td class="col-equipo">${p.equipo || 'N/A'}</td>
                <td class="col-posicion">${p.posicion || 'N/A'}</td>
                <td class="col-cant-goles">${p.cantGoles || 'N/A'}</td>
                <td class="col-titulo">${p.titulo || 'N/A'}</td>
                <td class="col-facultad">${p.facultad || 'N/A'}</td>
                <td class="col-facultad">${p.anioGraduacion || 'N/A'}</td>

                <td class="col-acciones">
                    <button onclick="eliminar(${p.id})">Eliminar</button>
                    <button onclick="editar(${p.id})">Editar</button>
                </td>
            `;
            tablaPersona.appendChild(row);
        });
    };

    const actualizarJsonData = () => { 
        data = JSON.stringify(personas);
    };

    window.eliminar = function(id) {
        personas = personas.filter(p => p.id !== id);
        actualizarJsonData();
        MostrarDatos();
    };

    filtro.addEventListener('change', MostrarDatos);

    calcularPromedio.addEventListener('click', () => {
        const filtradas = personas.filter(p => {
            return filtro.value === 'todos' || 
                (filtro.value === 'futbolista' && p instanceof Futbolista) || 
                (filtro.value === 'profecional' && p instanceof Profecional);
        });

        const promedio = filtradas.reduce((acc, p) => acc + p.edad, 0) / filtradas.length;
        promedioPersona.textContent = `Promedio de edad: ${promedio.toFixed(2)}`;
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', e => {
            const colClass = e.target.id.replace('col-', '');
            document.querySelectorAll(`.col-${colClass}`).forEach(td => {
                td.style.display = e.target.checked ? '' : 'none';
            });
        });
    });

    document.getElementById('btn-agregar').addEventListener('click', () => {
        formDatos.style.display = 'none';
        formAbm.style.display = 'block';
        abmForm.reset();
        editandoPersona = null;
    });

    volverBtn.addEventListener('click', () => {
        formAbm.style.display = 'none';
        formDatos.style.display = 'block';
    });

    cancelarBtn.addEventListener('click', () => {
        formAbm.style.display = 'none';
        formDatos.style.display = 'block';
        abmForm.reset();
        editandoPersona = null;
    });

    abmForm.addEventListener('submit', e => {
        e.preventDefault();

        const nombre = document.getElementById('txtNombre').value;
        const apellido = document.getElementById('txtApellido').value;
        const edad = document.getElementById('txtEdad').value ? parseInt(document.getElementById('txtEdad').value) : null;
        const equipo = document.getElementById('txtEquipo').value;
        const cantGoles = document.getElementById('txtCantGoles').value ? parseInt(document.getElementById('txtCantGoles').value) : null;
        const posicion = document.getElementById('txtPosicion').value;
        const titulo = document.getElementById('txtTitulo').value;
        const facultad = document.getElementById('txtFacultad').value;
        const anioGraduacion = document.getElementById('txtAnioGraduacion').value ? parseInt(document.getElementById('txtAnioGraduacion').value) : null;
        const tipo = document.getElementById('tipo').value;

        if(!nombre || !apellido || !edad || !equipo || !titulo || !posicion || !facultad || !cantGoles || !anioGraduacion) {
            alert('Todos los campos son obligatorios');
            return;
        }

        if(editandoPersona) {
            editandoPersona.nombre = nombre;
            editandoPersona.apellido = apellido;
            editandoPersona.edad = edad;

            if(editandoPersona instanceof Futbolista) { 
                editandoPersona.equipo = equipo;
                editandoPersona.posicion = posicion;
                editandoPersona.cantGoles = cantGoles;
            }else if(editandoPersona instanceof Profecional) {
                editandoPersona.titulo = titulo;
                editandoPersona.facultad = facultad;
                editandoPersona.anioGraduacion = anioGraduacion;
            }
        }
        else {
            const id = personas.length > 0 ? personas[personas.length - 1].id + 1 : 1;
            let nuevaPersona = null;

            if(tipo === 'futbolista') {
                nuevaPersona = new Futbolista(id, nombre, apellido, edad, equipo, posicion, cantGoles);
            }else if(tipo === 'profecional') {
                nuevaPersona = new Profecional(id, nombre, apellido, edad, titulo, facultad, anioGraduacion);
            }

            personas.push(nuevaPersona);
        }

        actualizarJsonData();
        formAbm.style.display = 'none';
        formDatos.style.display = 'block';
        MostrarDatos();
    });

    window.editar = function(id) {
        const persona = personas.find(p => p.id === id);

        if(!persona) return;

        editandoPersona = persona;
        formAbm.style.display = 'block';
        formDatum.style.display = 'none';

        document.getElementById('txtNombre').value = persona.nombre;
        document.getElementById('txtApellido').value = persona.apellido;
        document.getElementById('txtEdad').value = persona.edad;

        if(persona instanceof Futbolista) {
            document.getElementById('tipo').value = 'futbolista';
            document.getElementById('txtEquipo').value = persona.equipo;
            document.getElementById('txtPosicion').value = persona.posicion;
            document.getElementById('txtCantGoles').value = persona.cantGoles;
        }else if(persona instanceof Profecional) {
            document.getElementById('tipo').value = 'profecional';
            document.getElementById('txtTitulo').value = persona.titulo;
            document.getElementById('txtFacultad').value = persona.facultad;
            document.getElementById('txtCantGoles').value = persona.anioGraduacion;
        }

        document.getElementById('tipo').disable = true;
    };

    MostrarDatos();
});
import { Persona } from "./Persona.js";

export class Profecional extends Persona {

    titulo;
    facultad;
    anioGraduacion;
    constructor(id, nombre, apellido, edad, titulo, facultad, anioGraduacion) {
        super(id, nombre, apellido, edad);
        this.titulo = titulo;
        this.facultad = facultad;
        this.anioGraduacion = anioGraduacion;
    }

    getTitulo() {
        return this.titulo;
    }

    getFacultad() {
        return this.facultad;
    }

    getAnioGraduacion() {
        return this.anioGraduacion;
    }

    setTitulo(titulo) {
        if (titulo.length > 0) {
            this.titulo = titulo;
        }
    }   

    setFacultad(facultad) {
        if (facultad.length > 0) {
            this.facultad = facultad;
        }
    }

    setAnioGraduacion(anioGraduacion) {
        if (anioGraduacion > 1950) {
            this.anioGraduacion = anioGraduacion;
        }
    }

    toString() {
        return super.toString() + `${this.titulo} ${this.facultad} ${this.anioGraduacion}`
    }

    toJson() {
        return JSON.stringify(this);
    }

}
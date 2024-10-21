import { Persona } from "./Persona.js";

export class Futbolista extends Persona {
    equipo;
    posicion;
    cantidadGoles;
    
    constructor(id, nombre, apellido, edad, equipo, posicion, cantGoles) {
        super(id, nombre, apellido, edad);
        this.posicion = posicion;
        this.equipo = equipo;
        this.cantidadGoles =  cantGoles;
    }

    getEquipo() {
        return this.equipo;
    }

    getPosicion() {
        return this.posicion;
    }

    getGoles() {
        return this.cantidadGoles;
    }

    setEquipo(equipo) {
        if (equipo.length > 0) {
            this.equipo = equipo;
        }
    }

    setPosicion(posicion) {
        if (posicion.length > 0) {
            this.posicion = posicion;
        }
    }

    setGoles(cantidadGoles) {
        if (cantidadGoles > -1) {
            this.cantidadGoles = cantidadGoles;
        }
    }

    toString() {
        return super.toString() + `${this.getEquipo()} ${this.getPosicion()} ${this.getGoles()}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
}
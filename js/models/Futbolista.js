import { Persona } from "./Persona.js";

export class Futbolista extends Persona {
    equipo;
    posicion;
    cantGoles;
    
    constructor(id, nombre, apellido, edad, equipo, posicion,  cantGoles) {
        super(id, nombre, apellido, edad);
        this.posicion = posicion;
        this.equipo = equipo;
        this.cantGoles =  cantGoles;
    }

    getEquipo() {
        return this.equipo;
    }

    getPosicion() {
        return this.posicion;
    }

    getGoles() {
        return this.cantGoles;
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

    setGoles(cantGoles) {
        if (cantGoles > -1) {
            this.cantGoles = cantGoles;
        }
    }

    toString() {
        return super.toString() + `${this.equipo} ${this.posicion} ${this.cantGoles}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
}
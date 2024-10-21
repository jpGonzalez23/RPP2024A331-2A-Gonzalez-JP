export class Persona {
    id;
    nombre;
    apellido;
    edad;
    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    getID() {
        return this.id
    }

    getNombre() {
        return this.nombre
    }

    getApellido() {
        return this.apellido
    }

    getEdad() {
        return this.edad
    }

    setID(id) {
        if (id > 0) {
            this.id = id
        }
    }

    setNombre(nombre) {
        if (nombre.length > 0) {
            this.nombre = nombre
        }
    }

    setApellido(apellido) {
        if (apellido.length > 0) {
            this.apellido = apellido
        }   
    }

    setEdad(edad) {
        if (edad > 15) {
            this.edad = edad
        }
    }

    toString() {
        return `${this.id} ${this.nombre} ${this.apellido} ${this.edad}`
    }

    toJson() {
        return JSON.stringify(this);
    }
}
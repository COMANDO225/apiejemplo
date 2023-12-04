import { z } from "zod";

export const PropiedadSchema = z.object({
	nombre: z.string().min(3).max(255),
	direccion: z.string().min(3).max(255),
	ciudad: z.string().min(3).max(255),
	pais: z.string().min(3).max(255),
	precio: z.number().min(1),
	moneda: z.string().min(3).max(255),
	calificacion: z.number(),
	imagen: z.string().min(3).max(255),
	date: z.string().min(3).max(255),
});

// ahora que valide muchas propiedades
export const PropiedadesSchema = z.array(PropiedadSchema);

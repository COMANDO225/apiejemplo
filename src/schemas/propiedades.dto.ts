import { z } from "zod";

export const PropiedadSchema = z.object({
	nombre: z.string().min(3).max(255),
	direccion: z.string().min(3).max(255),
	ciudad: z.string().min(3).max(255),
	pais: z.string().min(3).max(255),
	precioPorNoche: z.number().min(1),
	moneda: z.string().min(3).max(255),
	capacidad: z.number().min(1).optional(),
	habitaciones: z.string().min(1).max(255).optional(),
	banos: z.string().min(1).max(255).optional(),
	amenidades: z.array(z.string()).optional(),
	calificacion: z.number().optional(),
	numeroDeCalificaciones: z.number().optional(),
	imagenes: z.array(z.string()).optional(),
	descripcion: z.string().min(3).max(255).optional(),
	anfitrion: z.string().min(3).max(255),
});

// ahora que valide muchas propiedades
export const PropiedadesSchema = z.array(PropiedadSchema);

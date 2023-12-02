import { z as validator } from "zod";

export const TaskSchema = validator.object({
	title: validator
		.string({
			required_error: "El título es requerido mi king",
			invalid_type_error: "El título debe ser un texto papi",
		})
		.min(3, "El título debe tener al menos 3 caracteres")
		.max(255, "El título debe tener máximo 255 caracteres")
		.trim(),

	description: validator
		.string({
			required_error: "La descripción es requerida mi king",
			invalid_type_error: "La descripción debe ser un texto papi",
		})
		.min(3, "La descripción debe tener al menos 3 caracteres")
		.max(255, "La descripción debe tener máximo 255 caracteres")
		.trim(),
	isCompleted: validator
		.boolean({
			required_error: "El estado es requerido.",
			invalid_type_error: "Estadio no válido",
		})
		.optional(),
});

export const TaskWithIdSchema = TaskSchema.extend({
	id: validator
		.string()
		.min(24, "El id debe tener al menos 24 caracteres")
		.max(24, "El id debe tener máximo 24 caracteres"),
});

export const TaskOnlyIdSchema = validator.object({
	id: validator
		.string()
		.min(24, "El id debe tener al menos 24 caracteres")
		.max(24, "El id debe tener máximo 24 caracteres"),
});

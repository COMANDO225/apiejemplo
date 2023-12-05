import { z as validator } from "zod";

// model Product {
//     id            String   @id @default(auto()) @map("_id") @db.ObjectId
//     title         String
//     description   String?
//     price         Float
//     discount      Float
//     image         String[]
//     averageRating Float
//   }

export const ProductSchema = validator.object({
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
	price: validator
		.number({
			required_error: "El precio es requerido mi king",
			invalid_type_error: "El precio debe ser un número papi",
		})
		.min(0, "El precio debe ser mayor o igual a 0"),
	discount: validator
		.number({
			required_error: "El descuento es requerido mi king",
			invalid_type_error: "El descuento debe ser un número papi",
		})
		.min(0, "El descuento debe ser mayor o igual a 0"),
	image: validator
		.array(
			validator
				.string({
					required_error: "La imagen es requerida mi king",
					invalid_type_error: "La imagen debe ser un texto papi",
				})
				.trim()
		)
		.min(1, "Debe tener al menos una imagen"),
	averageRating: validator
		.number({
			required_error: "El rating es requerido mi king",
			invalid_type_error: "El rating debe ser un número papi",
		})
		.min(0, "El rating debe ser mayor o igual a 0"),
});

export const ProductsSchema = validator.array(ProductSchema);

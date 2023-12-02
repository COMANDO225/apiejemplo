import { ZodError } from "zod";

type FormattedErrors = {
	[key: string]: string[];
};

export const transformZodError = (error: ZodError): FormattedErrors => {
	return error.issues.reduce((acc: FormattedErrors, issue) => {
		// Asigna el nombre del campo (último elemento del path)
		const fieldName = issue.path[issue.path.length - 1] as string;
		// Inicializa el arreglo para ese campo si aún no existe
		if (!acc[fieldName]) {
			acc[fieldName] = [];
		}
		// Añade el mensaje de error al arreglo correspondiente
		acc[fieldName].push(issue.message);
		return acc;
	}, {});
};

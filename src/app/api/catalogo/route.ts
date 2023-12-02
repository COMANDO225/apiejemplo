import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Propiedad } from "@prisma/client";
import { PropiedadSchema } from "@/schemas/propiedades.dto";
import { ZodError } from "zod";
const prisma = new PrismaClient();

export async function GET(request: NextRequest, response: NextResponse) {
	try {
		const propiedades = await prisma.propiedad.findMany();
		return NextResponse.json(propiedades);
	} catch (error) {
		console.log(error);
		return NextResponse.json("Error");
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
};

export async function POST(request: NextRequest, response: NextResponse) {
	try {
		const body = await request.json();
		const propiedad = PropiedadSchema.parse(body);

		const propiedadCreada = await prisma.propiedad.create({
			data: propiedad,
		});

		return NextResponse.json(
			{
				message: "Propiedad creada",
				data: propiedadCreada,
			},
			{
				status: 201,
			}
		);
	} catch (error) {
		if (error instanceof ZodError) {
			return NextResponse.json(error.issues);
		}
		return NextResponse.json(error);
	}
}

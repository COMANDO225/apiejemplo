import { PropiedadesSchema } from "@/schemas/propiedades.dto";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const propiedades = PropiedadesSchema.parse(body);

		const res = await prisma.propiedad.createMany({
			data: propiedades,
		});

		return NextResponse.json(
			{
				message: "Propiedades creadas",
				data: res,
			},
			{ status: 201 }
		);
	} catch (error) {
		if (error instanceof ZodError) {
			return NextResponse.json(error.issues);
		}
		return NextResponse.json(error);
	}
}

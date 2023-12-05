import { ProductsSchema } from "@/schemas/product.dto";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const productos = ProductsSchema.parse(body);

		const res = await prisma.product.createMany({
			data: productos,
		});

		return NextResponse.json(
			{
				message: "productos creadas",
				data: res,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log(error);
		if (error instanceof ZodError) {
			return NextResponse.json(error.issues);
		}
		return NextResponse.json(error);
	}
}

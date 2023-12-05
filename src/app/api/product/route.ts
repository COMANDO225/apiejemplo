import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { ZodError } from "zod";
import { transformZodError } from "@/utils/tranformError";
import { ProductSchema } from "@/schemas/product.dto";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, response: NextResponse) {
	try {
		const products = await prisma.product.findMany();
		return NextResponse.json(products);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}
}

export async function POST(request: NextRequest, response: NextResponse) {
	try {
		const body = await request.json();
		const product = ProductSchema.parse(body);

		const productCreated = await prisma.product.create({
			data: product,
		});

		return NextResponse.json(
			{
				message: "Producto creado",
				data: productCreated,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log(error);
		if (error instanceof ZodError) {
			return NextResponse.json(transformZodError(error), { status: 400 });
		}
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}
}

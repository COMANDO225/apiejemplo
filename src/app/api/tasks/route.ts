import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Task } from "@prisma/client";
import {
	TaskOnlyIdSchema,
	TaskSchema,
	TaskWithIdSchema,
} from "@/schemas/tasks.dto";
import { ZodError } from "zod";
import { transformZodError } from "@/utils/tranformError";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, response: NextResponse) {
	try {
		const tasks = await prisma.task.findMany();
		if (tasks.length == 0)
			return NextResponse.json({ message: "No hay tareas", data: tasks });
		return NextResponse.json(tasks);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}
}

export async function POST(request: NextRequest, response: NextResponse) {
	try {
		const body = await request.json();
		const task = TaskSchema.parse(body);

		const taskCreated = await prisma.task.create({
			data: task,
		});

		return NextResponse.json(
			{
				message: "Tarea creada",
				data: taskCreated,
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

export async function PUT(request: NextRequest, response: NextResponse) {
	try {
		const body = await request.json();
		const task = TaskWithIdSchema.parse(body);

		const newTask = {
			title: task.title,
			description: task.description,
			isCompleted: task.isCompleted,
		};

		const taskUpdated = await prisma.task.update({
			where: { id: task.id },
			data: newTask,
		});

		return NextResponse.json(
			{
				message: "Tarea actualizada",
				data: taskUpdated,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		if (error instanceof ZodError) {
			return NextResponse.json(transformZodError(error), { status: 400 });
		}
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest, response: NextResponse) {
	try {
		const body = await request.json();
		const task = TaskOnlyIdSchema.parse(body);

		const matchTask = await prisma.task.findUnique({
			where: { id: task.id },
		});

		if (!matchTask)
			return NextResponse.json(
				{ message: "No existe la tarea" },
				{ status: 404 }
			);

		await prisma.task.delete({
			where: { id: task.id },
		});

		return NextResponse.json(
			{ message: "Tarea eliminada" },
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		if (error instanceof ZodError) {
			return NextResponse.json(transformZodError(error), { status: 400 });
		}
		return NextResponse.json({ message: "Error D:" }, { status: 500 });
	}
}

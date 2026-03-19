import { NextResponse } from "next/server";
import Task from "@/models/task.model";

export const getAllTasks = async () => {
	const allTasks = await Task.find();

	return NextResponse.json({
		message: "Task fetched successfully",
		data: allTasks,
	});
};

export const createTask = async (req) => {
	const body = await req.json();

	const { title, description_md, difficulty, tags, review } = body;

	if (!title) {
		return NextResponse.json(
			{ success: false, message: "Title is required" },
			{ status: 400 },
		);
	}

	const newTask = await Task.create({
		title,
		description_md,
		difficulty,
		tags,
		review,
	});

	return NextResponse.json(
		{
			success: true,
			message: "Task created successfully",
			data: newTask,
		},
		{ status: 201 },
	);
};

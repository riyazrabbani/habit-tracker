import { NextResponse } from "next/server";
import connectToDB from "@/app/lib/connectToDB";
import HabitsCollection from "@/app/Models/HabitSchema";

import { Error } from "mongoose"

export async function POST(req: Request) {
    try {
        const {
            name,
            icon,
            clerkUserId,
            frequency,
            areas,
            completedDays
        } = await req.json();

        await connectToDB();

        const habit = new HabitsCollection({
            name,
            icon,
            clerkUserId,
            frequency,
            areas,
            completedDays
        });

        const savedHabit = await habit.save();

        return NextResponse.json({habit: savedHabit});
    } catch (error) {
        console.log(error);

        return NextResponse.json({error: error}, {status: 400});
    }
}

export async function GET(req: any) {
    try {
        const clerkId = req.nextUrl.searchParams.get("clerkId");
        await connectToDB();
        const habits = await HabitsCollection.find({clerkUserId: clerkId});
        return NextResponse.json({habits: habits});
    } catch (error) {
        return NextResponse.json({error: error}, {status: 400});
    }
}
import PrayerTimesModel from "@/models/prayerTimes";
import { connectToDB } from "@/utils/database";
import { NextRequest } from 'next/server'




export const GET = async (request:NextRequest) => {
    try {
        await connectToDB()

        const prayerTimes = await PrayerTimesModel.find({})
console.log(prayerTimes);
        return new Response(JSON.stringify(prayerTimes), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prayerTimes", { status: 500 })
    }
} 
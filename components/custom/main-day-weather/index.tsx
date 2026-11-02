import { connection } from 'next/server'

export default async function MainDayWeather() {

    await connection()
    const date = new Date()

    return <>{date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</>
}
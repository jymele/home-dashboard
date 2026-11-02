import DayWeather from "./DayWeather"

export default function WeeklyWeather() {

    const days = [0,1,2,3,4,5,6]

    return <div>
        {
            days.map((day, index) => <DayWeather key={index} />)
        }
    </div>
}
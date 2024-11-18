import dayjs from "dayjs";


function getDateRangeArray(startDate: Date, endDate: Date): string[] {
    const datesArray: string[] = [];
    let currentDate = dayjs(startDate);

    while (currentDate.toDate() <= endDate) {
        datesArray.push(currentDate.format('YYYY-MM-DD'));
        currentDate = currentDate.add(1, 'day');
    }
    return datesArray;
}
export default getDateRangeArray;
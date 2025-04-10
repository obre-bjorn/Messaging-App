import {format, isToday, isYesterday, isThisWeek} from "date-fns"

export function formatChatDate(dateString : string){

    const date = new Date(dateString)


    if(isToday(date)){

        return format(date,'h:mm a')
    }

    if(isYesterday(date)){

        return 'Yesterday'
    }

    return format(date, 'd/M/yyyy')

}
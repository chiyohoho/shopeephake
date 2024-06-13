import { parseISO } from 'date-fns'

export default function convertUTCtoGMT7(dateString) {
    if (!dateString) {
        return ''
    }

    const parsedDate = parseISO(dateString)

    return parsedDate
}

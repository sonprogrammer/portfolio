import { differenceInMonths, differenceInYears, parseISO } from "date-fns";

export function getDogAge(birthDate?: string | Date): string{
    if(!birthDate) return ''
    const birth = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate

    const now = new Date()

    const diffYear = differenceInYears(now, birth)

    if(diffYear > 0){
        return `${diffYear}살`
    }

    const diffMonth = differenceInMonths(now, birth)

    return `${diffMonth}개월`
}
import dayjs from 'dayjs'

class DateService{

  public handelDate(sumDate:Date): string {
    const newDate = dayjs(sumDate).format('DD-MM-YYYY')
    return newDate
  } 
}



const dateService = new DateService();
export default dateService
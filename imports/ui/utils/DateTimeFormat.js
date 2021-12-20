import moment from "moment";
moment.locale('id');

export default DateTimeFormat = (waktu) => {
    return moment(waktu).format('LLL');
}
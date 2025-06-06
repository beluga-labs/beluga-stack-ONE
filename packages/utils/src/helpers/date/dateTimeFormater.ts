import moment from 'moment';
import 'moment/locale/de';

export const dateTimeFormater = (props: {
    value?: string | null | Date;
    format?: string;
    lang?: string;
    preffix?: string;
    suffix?: string;
}) => {
    let formatedDate;
    moment.locale(props.lang);

    switch (props.format) {
        // Day
        case 'd':
            formatedDate = moment(props.value).format('DD');
            break;
        // Day as short word
        case 'd-s':
            formatedDate = moment(props.value).format('ddd');
            break;
        // Day as long word
        case 'd-l':
            formatedDate = moment(props.value).format('dddd');
            break;
        // Weeknumber
        case 'w':
            formatedDate = moment(props.value).format('ww');
            break;
        // Month
        case 'm':
            formatedDate = moment(props.value).format('MM');
            break;
        // Month as short word
        case 'm-s':
            formatedDate = moment(props.value).format('MMM');
            break;
        // Month as long word
        case 'm-l':
            formatedDate = moment(props.value).format('MMMM');
            break;
        // Year
        case 'y':
            formatedDate = moment(props.value).format('YYYY');
            break;
        // Day, Month, Year, seperated by dots
        case 'dmy':
            formatedDate = moment(props.value).format('DD.MM.YYYY');
            break;
        // Month, Day, Year, seperated by dots
        case 'mdy':
            formatedDate = moment(props.value).format('MM.DD.YYYY');
            break;
        // Day, Month, Year, seperated by slashes
        case 'dmy_/':
            formatedDate = moment(props.value).format('DD/MM/YYYY');
            break;
        // Month, Day, Year, seperated by slashes
        case 'mdy_/':
            formatedDate = moment(props.value).format('MM/DD/YYYY');
            break;
        default:
            formatedDate = moment(props.value).format('DD.MM.YYYY');
    }

    return `${props.preffix || ''}${formatedDate}${props.suffix || ''}`;
};

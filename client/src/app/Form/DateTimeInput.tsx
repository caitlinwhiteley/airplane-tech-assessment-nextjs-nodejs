import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

interface IDateTimeInput {
    setTime: Function;
    time: Date | null;
    label: string;
}

export const DateTimeInput = ({ setTime, time, label }: IDateTimeInput) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                    onChange={(dateTime) => setTime(dayjs(dateTime).format())}
                    value={time}
                    label={label}
                    format="DD/MM/YYYY hh:mm a"
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

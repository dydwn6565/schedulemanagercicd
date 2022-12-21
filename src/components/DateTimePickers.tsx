import React, { useState, Dispatch, SetStateAction, FC } from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface ChildPropsType {
  setStartDate: Dispatch<SetStateAction<string | undefined>>;
}

const DateTimePickers: FC<ChildPropsType> = ({ setStartDate }) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs());

  return (
    <div>
      <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              setStartDate(newValue?.toISOString());
            }}
          />
        </LocalizationProvider>
      </>
    </div>
  );
};

export default DateTimePickers;

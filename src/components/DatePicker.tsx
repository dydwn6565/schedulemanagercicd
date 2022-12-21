import React, { useState, Dispatch, SetStateAction, FC } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import {
  DateRangePicker,
  DateRange,
} from "@mui/x-date-pickers-pro/DateRangePicker";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface ChildPropsType {
  setStartDate: Dispatch<SetStateAction<string | undefined>>;
  setEndDate: Dispatch<SetStateAction<string | undefined>>;
}

const DatePicker: FC<ChildPropsType> = ({ setStartDate, setEndDate }) => {
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null]);
  return (
    <div>
      <>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={{ start: "Check-in", end: "Check-out" }}
        >
          <DateRangePicker
            value={value}
            onChange={(newValue: any) => {
              setValue(newValue);

              setStartDate(newValue[0]?.toISOString().slice(0, 10));
              setEndDate(newValue[1]?.toISOString().slice(0, 10));
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </>
            )}
          />
        </LocalizationProvider>
      </>
    </div>
  );
};

export default DatePicker;

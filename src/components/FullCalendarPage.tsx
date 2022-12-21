import React, { useEffect, useState } from "react";
import FullCalendar, {
  CalendarOptions,
  EventClickArg,
  EventHoveringArg,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import ScheduleModal from "./Modals/ScheduleModal";
import DescriptionEvent from "./Modals/DescriptionEvent";

interface ChildPropsType {
  scheduleList: object | undefined;
}
function FullCalendarPage({ scheduleList }: ChildPropsType) {
  const [modalEvent, setModalEvent] = useState<boolean | undefined>(false);
  const [selectedNumber, setSelectedNumber] = useState<string | undefined>();
  const [popupEvent, setPopupEvent] = useState<boolean | undefined>(false);
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [selectedX, SetSelectedX] = useState<number | undefined>();
  const [selectedY, SetSelectedY] = useState<number | undefined>();
  const [description, SetDescription] = useState<string | undefined>();
  useEffect(() => {
    const update = (e: any) => {
      setX(e.x);
      setY(e.y);
    };
    window.addEventListener("mousemove", update);
    window.addEventListener("touchmove", update);
    return () => {
      window.removeEventListener("mousemove", update);
      window.removeEventListener("touchmove", update);
    };
  }, [setX, setY]);

  const events = [
    {
      title: "All Day Event",
      start: getDate("YEAR-MONTH-01"),
      scheduleid: "1",
    },
    {
      title: "Long Event",
      start: getDate("YEAR-MONTH-07"),
      end: getDate("YEAR-MONTH-10"),
      description: "This is a cool event",
      scheduleid: "2",
    },
    {
      groupId: "999",
      title: "Repeating Event",

      scheduleid: "3",
      start: getDate("YEAR-MONTH-09T16:31:19.000"),
    },
    {
      groupId: "999",
      title: "Repeating Event",
      start: getDate("YEAR-MONTH-16T16:00:00+00:00"),
      scheduleid: "4",
    },
    {
      title: "Conference",
      start: "YEAR-MONTH-17",
      end: getDate("YEAR-MONTH-19"),
      scheduleid: "5",
    },
    {
      title: "Meeting",
      start: getDate("YEAR-MONTH-18T10:30:00+00:00"),
      end: getDate("YEAR-MONTH-18T12:30:00+00:00"),
      scheduleid: "6",
    },
    {
      title: "Lunch",
      start: getDate("YEAR-MONTH-18T12:00:00+00:00"),
      scheduleid: "7",
    },
    {
      title: "Birthday Party",
      start: getDate("YEAR-MONTH-19T07:00:00+00:00"),
      scheduleid: "8",
    },
    {
      title: "Meeting",
      start: getDate("YEAR-MONTH-18T14:30:00+00:00"),
      scheduleid: "9",
    },
    {
      title: "Happy Hour",
      start: getDate("YEAR-MONTH-18T17:30:00+00:00"),
      scheduleid: "10",
    },
    {
      title: "Dinner",
      start: getDate("YEAR-MONTH-18T20:00:00+00:00"),
      scheduleid: "11",
    },
  ];
  function getDate(dayString: string) {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();

    if (month.length === 1) {
      month = "0" + month;
    }

    return dayString.replace("YEAR", year).replace("MONTH", month);
  }

  const deleteSchedule = (arg: any) => {
    setPopupEvent(false);
    setSelectedNumber(arg.event._def.extendedProps.scheduleid);
    setModalEvent((prev) => !prev);
  };
  const hoverDescription = (arg: EventHoveringArg) => {
    SetSelectedX(arg.jsEvent.x);
    SetSelectedY(arg.jsEvent.y);
    SetDescription(arg.event._def.extendedProps.description);
    setPopupEvent(true);
  };
  const leaveDescription = (arg: EventHoveringArg) => {
    setPopupEvent(false);
  };

  return (
    <div>
      <>
        <FullCalendar
          initialView="dayGridMonth"
          headerToolbar={{
            center: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventClick={(e) => deleteSchedule(e)}
          contentHeight="700px"
          
          eventMouseEnter={(e) => hoverDescription(e)}
          eventMouseLeave={(e) => leaveDescription(e)}
          plugins={[dayGridPlugin, timeGridPlugin]}
          events={
            localStorage.getItem("accessToken") !== null &&
            localStorage.getItem("refreshToken") !== null
              ? scheduleList
              : events
          }
        />

        {modalEvent && (
          <ScheduleModal
            setModalEvent={setModalEvent}
            selectedNumber={selectedNumber}
          />
        )}

        {console.log("current x " + x + "current y" + y)}
      </>
      {popupEvent && description !== undefined && (
        <DescriptionEvent
          x={selectedX}
          y={selectedY}
          description={description}
        />
      )}
    </div>
  );
}

export default FullCalendarPage;

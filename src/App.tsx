import "./App.css";
import { useEffect, useState } from "react";
import FullCalendarPage from "./components/FullCalendarPage";
import Header from "./components/Header";

function App() {
  const [scheduleList, setScheduleList] = useState<Array<any> | undefined>();

  useEffect(() => {
    const usertableid: string | null = localStorage?.getItem("usertableid");

    const getScheduleData = async () => {
      const scheduleData = await fetch(
        "https://schedulemanagerserver.herokuapp.com",
        {
          method: "Post",
          headers: {
            "Content-Type": "application/json;  charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
          },

          body: JSON.stringify({
            query: `mutation{
            getSchedule(usertableid:"${usertableid}"){
              schedule{
                  scheduleid
                  title
                  userId
                  description
                  end
                  start
                  color
                }
              }     
          }`,
          }),
        }
      );
      if (scheduleData.status === 200) {
        const jsonData = await scheduleData.json();

        setScheduleList(jsonData.data.getSchedule.schedule);
      }
    };
    getScheduleData();
  }, []);

  return (
    <div className="App">
      <>
        <Header />

        <FullCalendarPage scheduleList={scheduleList} />
      </>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from "react";
import {
  HeadTitle,
  ItemCenter,
  DatePickerHeader,
  TitleInput,
  DescriptionTextarea,
  AddButton,
} from "../src/components/CssComponent";

import DateTimePickers from "./components/DateTimePickers";
import ColorPicker from "./components/ColorPicker";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import { CheckLogin } from "./components/CheckLogin";
function TimeScheduleManangement() {
  const linkToLogin = useRef<HTMLAnchorElement | null>(null);
  const linkToMain = useRef<HTMLAnchorElement | null>(null);
  const [title, setTitle] = useState<string | undefined>();
  const [startDate, setStartDate] = useState<string | undefined>();

  const [description, setDescripton] = useState<string | undefined>();
  const [color, setColor] = useState<string | undefined>("tomato");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [noTitle, setNoTitle] = useState(false);
  const [noStart, setNoStart] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    setDescripton(e.target.value);
  };

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const targetTitle = event.target.value;

    setTitle(targetTitle.trim());
  };

  const checkValidation = () => {
    setNoTitle(false);
    setNoStart(false);

    if (title === undefined || title === "") {
      setNoTitle(true);
    }
    if (startDate === undefined || startDate === "") {
      setNoStart(true);
    }
  };
  const AddTimeSchedule = async () => {
    checkValidation();
    const loginStatue = CheckLogin();
    if (!loginStatue) {
      if (null !== linkToLogin.current) {
        linkToLogin.current.click();
      }
    }
    if (
      title !== undefined &&
      title !== "" &&
      startDate !== undefined &&
      startDate !== "" &&
      loginStatue
    ) {
      const userTableId = localStorage.getItem("usertableid");
      const data = await fetch("https://schedulemanagerserver.herokuapp.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;  charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
        },
        body: JSON.stringify({
          query: `mutation {
            createSchedule(title:"${title}",description:"${description}",start:"${startDate}",end:"",color:"${color}",userId:${userTableId}){schedule{id}}}`,
        }),
      });

      if (data.status === 200) {
        const jsonData = await data.json();
        if (null !== linkToMain.current) {
          linkToMain.current.click();
        }
      }
    }
  };
  useEffect(() => {
    if (null !== textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div>
      <>
        <Header />
        <HeadTitle>Time Schdule Management </HeadTitle>
        <ItemCenter>
          <DatePickerHeader>Time Schedule</DatePickerHeader>

          <DateTimePickers setStartDate={setStartDate} />
          {noStart && <div>Please select time</div>}
          <h2>Title</h2>
          <TitleInput type="text" placeholder="title" onChange={titleHandler} />
          {noTitle && <div>Please type the title</div>}
          <h3>Description</h3>
          <DescriptionTextarea
            className="textarea"
            // defaultValue="Lorem ipsum dolor sit amet, ..."
            id="my-textarea"
            maxLength={3000}
            name="pet[notes]"
            onChange={(e) => handleChange(e)}
            placeholder="Enter additional notes..."
            ref={textareaRef}
          />
          <h2>Choose one color</h2>
          <ColorPicker setColor={setColor} />
          <AddButton onClick={AddTimeSchedule}>Add</AddButton>
          <Link ref={linkToLogin} to="/login" />
          <Link ref={linkToMain} to="/" />
        </ItemCenter>
      </>
    </div>
  );
}

export default TimeScheduleManangement;

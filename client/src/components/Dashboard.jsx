import React, { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './Navigation/NavBar';

const Dashboard = () => {
  const toastId = React.useRef(null);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState([])
  const [projectnames, setProject] = useState()
  var testing = [];

  const notify = (iserror, projectname) => {
    var message;
    if (iserror == true) {
      message = "ERROR updating: " + projectname
      toastId.current =toast(message, { autoClose: 5000 });
    }
    else{
      message = "Successfully updated: " + projectname
      toast(message,{ autoClose: 2000 });
    }
  };

  const GetEmpId = () => {
    const location = useLocation();
    console.log("Location is ",location);
    //console.log("Location id is ",location.search);
    const empid = parseInt(location.state.empid);
    return empid;
  };

  const empid = GetEmpId();
  console.log("Empid is ",empid);
  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "http://localhost:8089/mapping/" + empid
        ).then((response) => response.json());

        // update the state
        console.log("project response is", response)
        setProject(response);
        //console.log("Projects are: ", projectnames)
        return response;
      } catch (err) {}
      
    };
    const fetchData = async (res) => {
      try{
        var enddate = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate() - startDate.getDay() +5);
        enddate = enddate.toLocaleDateString('de-DE');
        //var empid = employeeid.empid;
        for (let i = 0; i < res.length; i++){
          var proid =res[i].Id;
          const response = await fetch(
            "http://localhost:8089/hours/getByProjectAndWeek/"+empid+"/"+proid+"/"+enddate
          ).then((response) => response.json());
          //console.log("Response is ",response);
          var count = response.length;
          //console.log('count is: ', count);
          if (count > 0){
            testing.push({ project: res[i].ProjectName, hours: ['', response[0].mondayTime, response[0].tuesdayTime, response[0].wednesdayTime, response[0].thursdayTime, response[0].fridayTime, ''], total: response[0].totalWeekHours, id: response[0].id}); //ASSIGN ID HERE, IN COUNT = 0, ASSIGN ID TO 0. THEN IN SUBMIT, CHECK ID, IF 0, THEN CHANGE THE POST
            console.log("testing is: ", testing) 
          }
          else {
            testing.push({ project: res[i].ProjectName, hours: ['', '', '', '', '', '', ''], total: 0, id: 0});
            console.log("testing is: ", testing)
          }
        }
        setData(data => data.concat(testing))
        //return response;
        } catch (err) {}
    }
    const fetchBoth = async () => {
      const tempLoadedContent = await fetchProjects();
      const tempLoadedSectors = await fetchData(tempLoadedContent);
      //setLoadedContent(tempLoadedContent);
      //setLoadedSectors(tempLoadedSectors);
    };

    fetchBoth()
    //fetchData()
    // make sure to catch any error
      .catch(console.error);    
    }, []) 

  const dateOffset = (date, offset) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + offset)
    return newDate;
  }

  const handlePreviousWeek = async() => {
    testing = [];
    setData([]);
    setStartDate((currDate) => dateOffset(currDate, -7));
    //var empid = employeeid.empid;
    var enddate = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate() - startDate.getDay() -2);
    enddate = enddate.toLocaleDateString('de-DE');
    //console.log("Previous week enddate: ", enddate);
    for (let i = 0; i < projectnames.length; i++){
      var proid =projectnames[i].Id;
      try{
        const response = await fetch(
          "http://localhost:8089/hours/getByProjectAndWeek/"+empid+"/"+proid+"/"+enddate
        ).then((response) => response.json());
        //console.log("Response is ",response);
        var count = response.length;
        //console.log('count is: ', count);
        if (count > 0){
          testing.push({ project: projectnames[i].ProjectName, hours: ['', response[0].mondayTime, response[0].tuesdayTime, response[0].wednesdayTime, response[0].thursdayTime, response[0].fridayTime, ''], total: response[0].totalWeekHours,id: response[0].id });
          //console.log("testing is: ", testing) 
        }
        else {
          testing.push({ project: projectnames[i].ProjectName, hours: ['', '', '', '', '', '', ''], total: 0, id: 0});
          //console.log("testing is: ", testing)
        }
      } catch (err) {}
    }
    setData(data => data.concat(testing))
    //console.log('result is: ', JSON.stringify(response, null, 4));
  };

  const handleNextWeek = async() => {
    testing = [];
    setData([]);
    setStartDate((currDate) => dateOffset(currDate, 7));
    //var empid = employeeid.empid;
    var enddate = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate() - startDate.getDay() +12);
    enddate = enddate.toLocaleDateString('de-DE');
    //console.log(enddate);
    for (let i = 0; i < projectnames.length; i++){
      var proid =projectnames[i].Id;
      try{
        const response = await fetch(
          "http://localhost:8089/hours/getByProjectAndWeek/"+empid+"/"+proid+"/"+enddate
        ).then((response) => response.json());
        //console.log("Response is ",response);
        var count = response.length;
        //console.log('count is: ', count);
        if (count > 0){
          testing.push({ project: projectnames[i].ProjectName, hours: ['', response[0].mondayTime, response[0].tuesdayTime, response[0].wednesdayTime, response[0].thursdayTime, response[0].fridayTime, ''], total: response[0].totalWeekHours,id: response[0].id  });
          //console.log("testing is: ", testing) 
        }
        else {
          testing.push({ project: projectnames[i].ProjectName, hours: ['', '', '', '', '', '', ''], total: 0, id: 0 });
          //console.log("testing is: ", testing)
        }
      } catch (err) {}
    }
    setData(data => data.concat(testing))
  };

  const handleHoursChange = (projectIndex, dayIndex, value) => {
    const updatedData = [...data];
    updatedData[projectIndex].hours[dayIndex] = value;
    var array = updatedData[projectIndex].hours;
    var numberArray = array.map(Number);
    var total = numberArray.reduce((acc,cur) => acc + cur,0);
    updatedData[projectIndex].total = total;
    setData(updatedData);
  };

  const handleSubmit = async() => {
    var iserror;
    var currdate = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate());
    var enddate = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate() - startDate.getDay() +5);
    enddate = enddate.toLocaleDateString('de-DE');
    var employeeid = String(empid);
    for (let i = 0; i < projectnames.length; i++){
      var requestOptions = {};
      var proid = String(projectnames[i].Id);
      var times = [data[i].hours[1],data[i].hours[2],data[i].hours[3],data[i].hours[4],data[i].hours[5]]
      if (times[0] == ''){
        times[0] = '0';
      }
      else {times[0] = parseFloat(times[0]);}
      if (times[1] == ''){
        times[1] = '0';
      }
      else {times[1] = parseFloat(times[1]);}
      if (times[2] == ''){
        times[2] = '0';
      }
      else {times[2] = parseFloat(times[2]);}
      if (times[3] == ''){
        times[3] = '0';
      }
      else {times[3] = parseFloat(times[3]);}
      if (times[4] == ''){
        times[4] = '0';
      }
      else {times[4] = parseFloat(times[4]);}
      if (data[i].id > 0) {
        requestOptions = {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            "id": data[i].id,
            "empID": employeeid,
            "projectID": proid,
            "mondayTime": times[0],
            "tuesdayTime": times[1],
            "wednesdayTime": times[2],
            "thursdayTime": times[3],
            "fridayTime": times[4],
            "weekEndDate": enddate,
            "updatedAt": currdate
          })
        };
      }
      else {
        requestOptions = {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            "empID": employeeid,
            "projectID": proid,
            "mondayTime": times[0],
            "tuesdayTime": times[1],
            "wednesdayTime": times[2],
            "thursdayTime": times[3],
            "fridayTime": times[4],
            "weekEndDate": enddate,
            "createdAt": currdate,
            "updatedAt": currdate
          })
        };
      }
      console.log("request options is ", requestOptions)
      fetch('http://localhost:8089/hours', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        iserror=false;
        notify(iserror, projectnames[i].ProjectName);
      })
      .catch(error => {
        //console.log("HELLO IAM HERE")
        iserror=true;
        notify(iserror, projectnames[i].ProjectName);
        console.log("ERROR INSIDE", iserror)
        console.error('There is an error!', error);
      });
      //if (iserror != undefined){
        //notify(iserror, projectnames[i].ProjectName);
      //}
    }
    //iserror=true;
    console.log("ERROR OUTSIDE ", iserror);
  };
  
  return (
    <div class="full_bg">
    <NavBar />
    <h1 class="center1">Project Time Sheet</h1>
      <div class="center1">
        <button class="buttons" onClick={handlePreviousWeek}>Previous Week</button>
        <span>{`${dateOffset(startDate, -startDate.getDay()).toLocaleDateString('de-DE')} - ${dateOffset(startDate, 6-startDate.getDay()).toLocaleDateString('de-DE')}`}</span>
        <button class="buttons" onClick={handleNextWeek}>Next Week</button>
      </div>
      <table class="table_al">
        <thead>
          <tr>
            <th class="hourfield">Project</th>
          {days.map((day) => (
                  <th class="hourfield" key={day}>
                    {day}
                    <br />
                    {new Date(
                      startDate.getFullYear(),
                      startDate.getMonth(),
                      startDate.getDate() - startDate.getDay() + days.indexOf(day)
                    ).toLocaleDateString('de-DE')}
                  </th>
                ))}
            <th class="hourfield week">Weekly Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td class="hourfield pad bold">{item.project}</td>
              {item.hours.map((hour, dayIndex) => (
                <td key={dayIndex} class="hourfield">
                  <input type="number" class="hours1" value={hour} onChange={(e) => handleHoursChange(index, dayIndex,e.target.value)} />
                </td>
              ))}
              <td class="hours1 hourfield bold" >
                {item.total}
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            {Array.from({ length: 7 }).map((_, index) => <td key={index}></td>)}
            <td></td>
            <td></td>
          </tr>

        </tbody>
      </table>
      <div class="center1">
      <button  class="buttons but1" onClick={handleSubmit}>Submit</button>
      <ToastContainer/>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
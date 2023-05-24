import React, { Component, useState, useEffect } from 'react';
	import CanvasJSReact from './canvasjs.react';
	import NavBar from './Navigation/NavBar';
	import moment from 'moment';
	import {useLocation} from 'react-router-dom';
	var CanvasJS = CanvasJSReact.CanvasJS;
	var CanvasJSChart = CanvasJSReact.CanvasJSChart;

	//const Datetime = require('react-datetime');

	const Summary = (props) =>{
		
		const [data, setData] = useState([]);
		const [currentWeek, setCurrentWeek] = useState(moment().week());
		const [endDate, setEndDate] = useState(moment().week(currentWeek).endOf('week').isoWeekday(5).format('D.M.YYYY'));

		const handleNextWeek = () => {
			setCurrentWeek(currentWeek + 1);
			setEndDate(moment().week(currentWeek+1).endOf('week').isoWeekday(5).format('D.M.YYYY'));
		}
		
		const handlePrevWeek = () => {
			setCurrentWeek(currentWeek - 1);
			setEndDate(moment().week(currentWeek-1).endOf('week').isoWeekday(5).format('D.M.YYYY'));
		}
		const displayCurrentWeek = () => {
			const startDate = moment().week(currentWeek).startOf('week');
			const endDate = moment().week(currentWeek).endOf('week');
			return `${startDate.format('MMMM Do')} - ${endDate.format('MMMM Do')}`;
		}
		const urlParams = new URLSearchParams(window.location.search);
  const empid = urlParams.get('id');
		

		useEffect(() => {
			fetch(`http://localhost:8089/summary/${endDate}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(response => response.json())
			.then(data => setData(data));
		}, [currentWeek, empid, endDate]);

		const options = {
			theme: "dark2",
			animationEnabled: true,
			exportFileName: "Project Hours",
			exportEnabled: true,
			title:{
				text: "Projects Summary"
			},
			data: [{
				type: "pie",
				showInLegend: true,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>{y}%</strong>",
				indexLabel: "{y}%",
				indexLabelPlacement: "inside",
				dataPoints: data.map(item => ({ label: item.projectName, y: item.percentage*100 }))
			}]
		
			// const options = {
			// 	theme: "dark2",
			// 	animationEnabled: true,
			// 	exportFileName: "ProjectHours",
			// 	exportEnabled: true,
			// 	title:{
			// 		text: "Weekly Efforts Per Project"
			// 	},
			// 	data: [{
			// 		type: "pie",
			// 		showInLegend: true,
			// 		legendText: "{label}",
			// 		toolTipContent: "{label}: <strong>{y}%</strong>",
			// 		indexLabel: "{y}%",
			// 		indexLabelPlacement: "inside",
			// 		dataPoints: [
			// 			{ y: 32, label: "Project 1" },
			// 			{ y: 22, label: "Project 2" },
			// 			{ y: 15, label: "Project 3" },
			// 			{ y: 19, label: "Project 4" },
			// 			{ y: 5, label: "Project 5" },
			// 			{ y: 7, label: "Project 6" }
			// 		]
			// 	}]

			}

			return (
				<>
				<div>
				<NavBar empid={empid}/>
			</div>
			
			<div>

			
		</div>
		<div style={{ display: 'flex', alignItems: 'center', marginTop: '60px'  }}>

			<button style={{ marginRight: 'auto', backgroundColor: 'black', border: 'none',
			padding: '10px 20px', borderRadius: '5px', color: 'white', fontWeight: 'bold' }} 
			onClick={handlePrevWeek}>Previous Week</button>

			<div style={{ color: 'black', fontSize: '20px', fontWeight: 'bold', margin: '0 20px' }}>
			{displayCurrentWeek()}</div>

			<button style={{ marginLeft: 'auto', backgroundColor: 'black', border: 'none', padding: '10px 20px',
			borderRadius: '5px', color: 'white', fontWeight: 'bold' }} onClick={handleNextWeek}>Next Week</button>

	</div>
			<div className='center-screen'>

				<CanvasJSChart options = {options}
					/* onRef={ref => this.chart = ref} */
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
			</>
			);

	}

	export default Summary

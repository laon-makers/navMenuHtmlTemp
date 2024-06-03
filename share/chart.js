/*  Copyright (C) 2024 Gi Tae Cho laon.makers@yahoo.com
    This file is a part of the Smart Home WiFi Web Server project.
    This project can not be copied and/or distributed without the express permission of Gi Tae Cho laon.makers@yahoo.com.

    Author: G.T. Cho (a Laon maker/artist in Laon Creators' Group)
    Version: 1.0
    Last update: Dec. 27, 2021
*/
//let xPrjNames = [];
//let yPrjProgress = [];
//let yPrjHours = [];


let xWorkTypeNames = ["Design", "Development", "Test & Debug", "Change Request", "Customer Service"];
let yWorkTypeHours = [];
let wTypebarColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"
];
let prjPercentChart;
let eachPrjPercentChart;

// const prj_IDs = ['Dev_h', 'Med_h', 'Edu_h', 'StdAi_h', 'LrnJs_h', 'LrnEng_h', 'Ytb_h', 'Bs_h', 'Job_h', 'MiscL_h', 'Misc_h'];
// const prjName = ['발명', '명상', '교육(Tr)', '학습(AI)', '학습(JS)', '학습(Eng)', 'Youtube', '창업', 'Job','Misc (Lrn)', 'Misc']
// let prjHoursSubTotal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // the number of elements must be equal to the number of element of 'prj_IDs'.

const dfTime_forDeferredCmdMsg = 1000;
const minTime_forDeferredCmdMsg = 100;
const timeStep_forDeferredCmdMsg = 100; // by this amount, 'time_forDeferredCmdMsg' is decremented each time the deferred message is sent within one session.
let time_forDeferredCmdMsg = dfTime_forDeferredCmdMsg;
// following variable may gets a function name to be invoked, especially
// the function defined within a HTML file to be invoked to get charts initialized.
var funcInHtmlToBeUsedInChartInit = [];
var timeOutId_chart = null;

// let list_DashboardFile = [];
var list_DashboardFile4Hours = [];


function cmdGetProjectHour(htm, prj) {
    if( timeOutId_chart !== null ) clearTimeout(timeOutId_chart);

    let ifr = document.getElementById("if4Chart");
    // if( ifr.src !== htm ) ifr.src = htm;
    // let url = 'file:///P:/prj/doc/plan/lifeByChoice/dash_bd/db_2024/dashb_2404.htm'
    // let ifr = window.open(url)
    if( Array.isArray(prj) === true ) {
        ifr.contentWindow.postMessage({msg:"allPrjHour_req", req: true, val: prj}, "*");
        //ifr.postMessage({msg:"allPrjHour_req", val: prj}, url);
        // window.parent.postMessage({msg: 'dashboardFile_req', req: true}, "*");
    } else {
        ifr.contentWindow.postMessage({msg:"prjHour_req", req: true, val: prj}, "*");
    }

    if( list_DashboardFile4Hours.length > 0 ) {
        htm = list_DashboardFile4Hours.pop();
        postMsgCmd_deferred(htm, prj);
    }
}



function postMsgCmd_deferred(htm, prj) {

    let ifr = document.getElementById("if4Chart");
    if( ifr.src !== htm ) ifr.src = htm;

    
    timeOutId_chart = setTimeout(function () {
        cmdGetProjectHour(htm, prj);
    }, time_forDeferredCmdMsg);

    // set the timeout for the next deferred command within a command post session.
    if( time_forDeferredCmdMsg > minTime_forDeferredCmdMsg) {
        time_forDeferredCmdMsg -= timeStep_forDeferredCmdMsg;
        if( time_forDeferredCmdMsg < minTime_forDeferredCmdMsg) {
            time_forDeferredCmdMsg = minTime_forDeferredCmdMsg;
        }
    }
}

// function clearHourSubTotal_n_PostMsgCmd_deferred(htm, prj) {
//     resetProjectHours(prj);
//     postMsgCmd_deferred(htm, prj);
// }

function resetProjectHours(prj) {

    if( Array.isArray(prj) === true ) { // prj is an array.
        for(let i = 0; i < prj.length; i++ ) {
            bar = document.getElementById(prj[i]);
            if( bar != undefined ) {
                bar.innerHTML = 0; // for hour without fraction.
                bar.style.height = "0";
            }

            prjHoursSubTotal[prj_IDs.indexOf(prj[i])] = 0;
        }
    } else {    // prj isn't an array.
        bar = document.getElementById(prj);
        if( bar != undefined ) {
            bar.innerHTML = 0; // for hour without fraction.
        }

        prjHoursSubTotal[prj_IDs.indexOf(prj)] = 0;

    }
    
    document.getElementById('totHours').innerHTML = '0';    // Reset the total hours to zero.
    document.getElementById('totDays').innerHTML = '0';      // Reset the total days to zero.
}






function onChangeOfYear(src) {
    // To get 'All' is selected for both Year and Month Selection.
    switch( src ) {
    //case 'init':
    case 'bar':
        if(document.getElementById('selYr4Hours').selectedIndex === 1) { // 'All' was selected.
            document.getElementById('selMon4Hours').selectedIndex = 1;
        }
        document.getElementById('setThisMon4Bar').checked = false;
        break;
    
    case 'doughnut':
        if( document.getElementById('selYr4Percent').selectedIndex === 1 ) {
            document.getElementById('selMon4Percent').selectedIndex = 1;
        }
        document.getElementById('setThisMon4Dn').checked = false;
        break;
    }
}

function onChangeOfMonth(src) {
    switch( src ) {
        //case 'init':
    case 'bar':
        document.getElementById('setThisMon4Bar').checked = false;
        break;
    
    case 'doughnut':
        document.getElementById('setThisMon4Dn').checked = false;
        break;
    }
}

// function selectThisMonth(src) {
//     // To get 'All' is selected for both Year and Month Selection.
//     switch( src ) {
//         case 'init':
//     case 'bar':
//         if(document.getElementById('selYr4Hours').selectedIndex === 1) { // 'All' was selected.
//             document.getElementById('selMon4Hours').selectedIndex = 1;
//             document.getElementById('setThisMon4Bar').checked = true;
//         }
//         break;
    
//     case 'doughnut':
//         if( document.getElementById('selYr4Percent').selectedIndex === 1 ) {
//             document.getElementById('selMon4Percent').selectedIndex = 1;
//             document.getElementById('setThisMon4Dn').checked = true;
//         }
//         break;
//     }
// }


function setSel2ThisMonth(src) {

    let selYr4Hours;  //= document.getElementById('selYr4Hours');
    let selMon4Hours; //= document.getElementById('selMon4Hours');
    const today = new Date();
    // const firstDayIx = today.getDay();   // 0 ~ 6
    // const lastDayIx = today.getDate();    // 1 ~ 31
    const year = today.getFullYear().toString();
    let month = today.getMonth();   // 0 ~ 11
    month++;

    if( month < 10 ) month = '0' + month;
    else month = month.toString();

    switch( src ) {
    case 'doughnut':
        selYr4Hours = document.getElementById('selYr4Percent');
        selMon4Hours = document.getElementById('selMon4Percent');
        break;
    
    default:
    // case 'init':
    // case 'bar':
        selYr4Hours = document.getElementById('selYr4Hours');
        selMon4Hours = document.getElementById('selMon4Hours');
        break;
    
    }


    for(let i = 0; i < selYr4Hours.options.length; i++ ) {
        if( selYr4Hours.options[i].text == year) {
            // selYr4Hours.options[i].selected = true;
            selYr4Hours.selectedIndex = i;
            break;
        }
    }
    
    for(let i = 0; i < selMon4Hours.options.length; i++ ) {
        if( selMon4Hours.options[i].text == month) {
            //selMon4Hours.options[i].selected = true;
            selMon4Hours.selectedIndex = i;
            break;
        }
    }
}




function setThisMon_ifChecked(evt, src) {

    if(evt.target.checked === true) {
        setSel2ThisMonth(src);
    }
}






function updateProjectHours_Req(src) {
    let yrOpt = document.getElementById('selYr4Hours');
    let monOpt = document.getElementById('selMon4Hours');
    let htm = '';
    let yrIx = 0;
    let monIx = 0;

    // This switch statement is to get both year selections and month selections synced.
    switch( src ) {
    case 'bar':
        // clear all check boxes, which are for setting both year and month to this month, as soon as the Update Hour button is clicked.
        document.getElementById('setThisMon4Bar').checked = false;
        document.getElementById('setThisMon4Dn').checked = false;
    case 'init':
        document.getElementById('selYr4Percent').selectedIndex = yrOpt.selectedIndex;
        document.getElementById('selMon4Percent').selectedIndex = monOpt.selectedIndex;
        break;
    
    case 'doughnut':
        // clear all check boxes, which are for setting both year and month to this month, as soon as the Update Percentage button is clicked.
        document.getElementById('setThisMon4Bar').checked = false;
        document.getElementById('setThisMon4Dn').checked = false;
        
        yrOpt.selectedIndex = document.getElementById('selYr4Percent').selectedIndex;
        monOpt.selectedIndex = document.getElementById('selMon4Percent').selectedIndex;
        break;
    }

    if( yrOpt.selectedIndex === 0 || monOpt.selectedIndex == 0) {
        window.alert("One or all of 'Year' and 'Month' were not selected !");
    } else {
        let year = yrOpt[yrOpt.selectedIndex];
        let month = monOpt[monOpt.selectedIndex];

        // empty the array of which elements are dashboard files from which project hours are collected.
        let ln = list_DashboardFile4Hours.length;
        for( let i = 0; i < ln; i++ ) {
            list_DashboardFile4Hours.pop();
        }

        // Clear 'innerHTML' which is used as a sub-total buffer for each hours.
        resetProjectHours(prj_IDs);
        // Reset the timeout for the deferred command message as soon as one of update buttons clicked.            
        time_forDeferredCmdMsg = dfTime_forDeferredCmdMsg;

        if( year.value === 'All') {
            //list_DashboardFile4Hours = list_DashboardFile;
            list_DashboardFile4Hours = list_DashboardFile.map((x) => x); // This is a way to clone, not shallow copy which copies reference rather than value.
        }

        if( month.value === 'All') {

            if( list_DashboardFile4Hours.length == 0 ) { // it means user selected a specific year to get hours.
                for( let i = 0; i < list_DashboardFile.length; i++ ) {
                    let yr = list_DashboardFile[i].split(".htm");
                    let ln = yr[0].length;
                    let val = yr[0].substring(ln-4, ln-2);
                    if( val === year.value ) {
                        list_DashboardFile4Hours.push(list_DashboardFile[i]);
                    }
                }

            } //else {    // user selected 'All' for the year option. So all files in list_DashboardFile4Hours since the month option is also 'All' }
             
            //htm = list_DashboardFile4Hours.pop();
        } else if( list_DashboardFile4Hours.length == 0 ) { // it means user selected a specific year to get hours. so both year and month options are specific number rather than 'All'.

            if( list_DashboardFile.length > 0 ) {
                let tst = year.value + month.value + ".htm";    // to include test files, e.g. tstDashb_2505.htm

                for( let i = 0; i < list_DashboardFile.length; i++ ) {
                    let ym = list_DashboardFile[i].split("_");
                    let ln = ym.length;
                    if( ln > 0 ) {
                        let val = ym[ln-1].substring(ln-4, ln-2);
                        
                        if( ym[ln-1] === tst ) {
                            list_DashboardFile4Hours.push(list_DashboardFile[i]);
                        }
                    }
                }
            }

            if( list_DashboardFile4Hours.length === 0 ) {

                // If the _chat.htm is invoked directly rather than via dashboard.htm and 'All' is selected for the year,
                // then it can be reached. So following is checking if it isn't that situation.   
                if( year.value !== 'All') {
                    htm = 'db_' + yrOpt.options[yrOpt.selectedIndex].text + '/dashb_' + year.value;
                    htm += month.value;
                    htm += '.htm';

                    list_DashboardFile4Hours.push(htm);
                }
            }

        } else {  // user selected 'All' for the year option and a specific number for the month option.
            for( let i = 0; i < list_DashboardFile4Hours.length; i++ ) {
                let mn = list_DashboardFile4Hours[i].split(".htm");
                let ln = mn[0].length;
                let val = mn[0].substring(ln-2, ln);
                if( val != month.value ) {
                    list_DashboardFile4Hours.splice(i, 1);
                    i--; // need to compensate it because the next element which follows the deleted one 
                         // is now indexed current 'i' value (the value before subtraction on this line) and it will be increased by one by the 3rd section of 'for' loop above.
                         // Therefore it must be decreased by 1 here to compensate it.
                }
            }

            //htm = list_DashboardFile4Hours.pop();
        }

        if( list_DashboardFile4Hours.length > 0 ) {
            htm = list_DashboardFile4Hours.pop();

            postMsgCmd_deferred(htm, prj_IDs);
            document.getElementById('dbgMsg').innerHTML = "&nbsp;";
        } else {    // 
            document.getElementById('dbgMsg').innerHTML = "No file to get hours since the dashboard file list is empty ! <br>The chart htm file seems to be brought up directly rather than through the dashboard htm file."; // list_DashboardFile4Hours is empty and list_DashboardFile is most likely empty as well.
        }
    }
}






function updateToTalHours(index = 0) {
    let th = 0;
    for( let i = 0; i < prjHoursSubTotal.length; i++) {
        th += prjHoursSubTotal[i];
    }

    for( let i = 0; i < prjName.length; i++ ) {
        let v = (prjHoursSubTotal[i] * 100)/th;
        prjPercentChart.config.data.datasets[0].data[i] = Number.parseInt(v);
    }
    prjPercentChart.update();

    document.getElementById('totHours').innerHTML = th.toFixed(0);
    th /= 8; //24;   // Convert hours to 8 hour work days.
    document.getElementById('totDays').innerHTML = th.toFixed(1);

    //console.log("updateToTalHours " + index + ":", prjHoursSubTotal);
}

///////////////////////////////////////////////// EVENT HANDLERS /////////////////////////////////////////////////

function chartEventHandler(e) {
    //var v;
    let bar;
    //let prjTr;
    //let hour;
    //if( Array.isArray(e.data.msg) === true ) {  // for the host htm which posts event to dashboard htms to get information such as hours.
    if( e.data.req === false ) {  // for the host htm which posts event to dashboard htms to get information such as hours.
        let mg;
        if( Array.isArray(e.data.msg) === false) {  // msg isn't array.
            mg = e.data.msg;
        } else {
            mg = e.data.msg[0];
        }

        switch(mg) {        
        case "prjHour_rsp":
            // switch(e.data.msg[1]) {
            //     case "Dev_h":                    
            //         break;
            //     case "Dev/Med/Edu/Ytb/Job/LrnJs_h":
            //         break;
            // }
            bar = document.getElementById(e.data.msg[1]);
            if( bar != undefined ) {
                let hour = Number(e.data.val)/60;
                let ix = prj_IDs.indexOf(e.data.msg[1]);
                prjHoursSubTotal[ix] += hour;

                hour = prjHoursSubTotal[ix].toFixed(0);

                bar.style.height = hour + "px";
                bar.innerHTML = hour; // for hour without fraction.
                updateToTalHours(1);
            } //else updateToTalHours(2);
            break;

        case "allPrjHour_rsp":
            for(let i = 0; i < e.data.val.length; i++ ) {
                bar = document.getElementById(e.data.val[i][0]);
                if( bar != undefined ) {
                    //let hour = (Number(e.data.val[i][1])/60).toFixed(0);
                    let hour = Number(e.data.val[i][1])/60;
                    let ix = prj_IDs.indexOf(e.data.val[i][0]);
                    prjHoursSubTotal[ix] += hour;

                    hour = prjHoursSubTotal[ix].toFixed(0);

                    
                    bar.style.height = hour + "px";
                    bar.innerHTML = hour; // for hour without fraction.
                }
            }
            updateToTalHours(3);
            break;

        case "dashboardFile_rsp":
            if(e.data.val.length > 0) {
                list_DashboardFile = e.data.val;
            }
            break;
        }

        
    } else {    // for the embedded htm which receives post message and serve the command included in the message. This embedded htm responses with corresponding data, e.g. hours.

        chart_dashboard_eventHandler(e);
    }
}




function initPrjStatusOnChart() {

    document.getElementById('if4Chart').src = '#';  // reset to its default. if you done reset it, 
                                                    // then the src is used when you refresh the screen by hitting 'F5' key, 
                                                    // especially when you set the month to '04' and refresh it in May, 
                                                    // then you get the graph for April even though the dropdown menu for the month shows '05'.
    setSel2ThisMonth('bar');

    let nClass = document.getElementsByClassName('bar');            
    let ln = nClass.length;

    // set background color of the bar chart.
    for(let i = 0; i < prj_IDs.length; i++) {
        if( i >= ln){   // the number of span tags is smaller than the number of project name.
            var x = document.getElementById("bar-container");
            var div = document.createElement("div");
            div.setAttribute('id', prj_IDs[i]);
            div.setAttribute('class', "bar");
            div.setAttribute('style', "height: 1px");
            div.setAttribute('style', "background-color:" + prjChartColors[i]);
            x.appendChild(div); 
        } else {
            let bar = document.getElementById(prj_IDs[i]);
            bar.style.backgroundColor = prjChartColors[i];
        }
    }

    // set the project name for the bar chart.
    nClass = document.getElementsByClassName('prj_name');            
    ln = nClass.length;
    // for( let i = 0; i < nClass.length; i++) {
    for( let i = 0; i < prjName.length; i++) {
        if( i >= ln){   // the number of span tags is smaller than the number of project name.
            
            var x = document.getElementById("prj-label");
            var span = document.createElement("span");
            span.innerHTML = prjName[i];
            span.setAttribute('class', "prj_name");
            x.appendChild(span); 
        } else nClass[i].innerHTML = prjName[i];
    }

    updateProjectHours_Req("init");
}




function initChart() {
    // document.getElementById('selPrj').selectedIndex = 0;
    // document.getElementById('selPrj4Hour').selectedIndex = 0;
    // document.getElementById('selPrj4WT').selectedIndex = 0;
    // //document.getElementById('selWType').selectedIndex = 0;
    
    window.addEventListener("message", chartEventHandler);
    // initPrjPercentChart();
    // eachPrjPercentChart();
    for( let i = 0; i < funcInHtmlToBeUsedInChartInit.length; i++ ) {
        funcInHtmlToBeUsedInChartInit[i]();
    }
    
    let ln = funcInHtmlToBeUsedInChartInit.length;
    for( let i = 0; i < ln; i++ ) {
        funcInHtmlToBeUsedInChartInit.pop();
    }
}


function dumy_ref() {

}
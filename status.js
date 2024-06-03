// import * as myEvt from "./share/event_htm.js";
// If you need to call the function, assign a reference to a function to 
// this variable in the HTML file which includes this script file.
// take a look at an example in tdb_na.htm.
let funcRef_status = [];
let funcRefIframe_status = [];
let bInit = false;

// following variable may gets a function name to be invoked, especially
// the function defined within a HTML file to be part of the onload function.
var funcInHtmlToBePartOfOnLoad_statusJs = [];

let yearMonIx = [0, 0]; // default value for 2 digit year and month is 0 to indicate invalid values.

function fDummy_statusJs() {;}

// function openCloseDetails(bOpen) {
//     let dt = document.getElementsByTagName('details');
//     for( let i = 0; i < dt.length; i++ ) {
//         dt[i].open = bOpen;
//     }
// }

// function openCloseTopDetails(bOpen) {
//     let dt = document.getElementsByTagName('details');
//     for( let i = 0; i < dt.length; i++ ) {

//         if( dt[i].parentElement.parentElement.tagName === "BODY" ) {
//             dt[i].open = bOpen;
//         }
//     }
// }
// function buttonEventHandler(e) {
//     var rsp=[];
//     var v, len;
//     let wIx = 0;

//     if( e.data.msg !== undefined) {
//         // button click event handler
//         switch(e.data.msg) {
//         case "openAll":
//             // if( Array.isArray(e.data.val) === true ) {

//             //     if ( e.data.val.length > 0 ) {

//             //         v = Number(e.data.val[0]);

//             //         if( v === 1 ) {
//             //             openCloseDetails(true);
//             //         } else {
//             //             openCloseDetails(false);
//             //         }

//             //     } else {
//             //         v = Number(e.data.val);

//             //         if( v === 1 ) {
//             //             openCloseDetails(true);
//             //         } else {
//             //             openCloseDetails(false);
//             //         }
//             //     }
//             // }

//             openCloseDetails(true);
//             break;
//         case "closeAll":
//             openCloseDetails(false);
//             break;

//         case "openAllTop":
//             openCloseTopDetails(true);
//             break;
//         case "closeAllTop":
//             openCloseTopDetails(false);
//             break;

//         // case "getSrcTbl":
//         //     v = Number(e.data.val);
//         //     rsp[0] = ["vcList", "", totWords.toString(), nofWordsPerTbl.toString()];
//         //     window.parent.postMessage(rsp, "*");
//         //     break;
//         }
//     } else {
//         // iframe event handler
//         if( Array.isArray(e.data) === true ) { // responses
//             switch(e.data[0]) {
//                 case "winSize_rsp":                
//                     console.log("rsp: " + e.data);

//                     if( iframeElement !== undefined ) {
//                         if( e.data[1] < iframeElement.length ) {

//                             if( e.data[2] > 0 ) {
//                                 iframeElement[e.data[1]].style.width = e.data[2] + "px";
//                             } else {
//                                 console.log( "Warning: " + "ID " +e.data[1] + " received width is '0'")
//                             }

//                             if( e.data[3] > 0 ) {
//                                 iframeElement[e.data[1]].style.height = e.data[3] + "px";
//                             } else {
//                                 console.log( "Warning: " + "ID " +e.data[1] + " received height is '0'")
//                             }
//                         }
//                     }
//                     break;

//                 case "winSize_req":
//                     console.log("req: " + e.data);
//                     //window.parent.postMessage(["winSize_rsp", e.data[1], document.documentElement.scrollWidth, document.documentElement.scrollHeight], '*');
//                     window.parent.postMessage(["winSize_rsp", e.data[1], document.body.clientWidth, document.body.clientHeight, window.screen.width, window.screen.height], '*');
//                     //window.parent.postMessage(["winSize_rsp", e.data[1], document.scrollingElement.scrollWidth, document.scrollingElement.scrollHeight, window.screen.width, window.screen.height], '*');                
//                     break;
//             }

//         } else {
//             console.log('The event is not an array');
//         }
//     }
// }

// function iframeEventHandler(e) {
//     // if (e.origin === '../masterPlan.htm') {
//     //     // Handle the message from the parent
//     //     console.log(e.data);
//     // } else {
//     //     console.log("origin: " + e.data + " " + e.origin);
//     // }

//     if( Array.isArray(e.data) === true ) { // responses
//         switch(e.data[0]) {
//             case "winSize_rsp":                
//                 console.log("rsp: " + e.data);

//                 if( iframeElement !== undefined ) {
//                     if( e.data[1] < iframeElement.length ) {

//                         if( e.data[2] > 0 ) {
//                             iframeElement[e.data[1]].style.width = e.data[2] + "px";
//                         } else {
//                             console.log( "Warning: " + "ID " +e.data[1] + " received width is '0'")
//                         }

//                         if( e.data[3] > 0 ) {
//                             iframeElement[e.data[1]].style.height = e.data[3] + "px";
//                         } else {
//                             console.log( "Warning: " + "ID " +e.data[1] + " received height is '0'")
//                         }
//                     }
//                 }
//                 break;

//             case "winSize_req":
//                 console.log("req: " + e.data);
//                 //window.parent.postMessage(["winSize_rsp", e.data[1], document.documentElement.scrollWidth, document.documentElement.scrollHeight], '*');
//                 window.parent.postMessage(["winSize_rsp", e.data[1], document.body.clientWidth, document.body.clientHeight, window.screen.width, window.screen.height], '*');
//                 //window.parent.postMessage(["winSize_rsp", e.data[1], document.scrollingElement.scrollWidth, document.scrollingElement.scrollHeight, window.screen.width, window.screen.height], '*');                
//                 break;
//         }

//     } else {
//         console.log('The event is not an array');
//     }
// }


function getHtmlParamValue(paramName)
{
    var url = window.location.search.substring(1); //get rid of "?" in querystring
    var qArray = url.split('&'); //get key-value pairs
    for (var i = 0; i < qArray.length; i++) 
    {
        var pArr = qArray[i].split('='); //split key and value
        if (pArr[0] == paramName) 
            return pArr[1]; //return value
    }
}

function resizeIframe(obj) {
    var dbg = document.getElementById("dbg").innerHTML;        
    document.getElementById("dbg").innerText = "Called";

    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';    // org statement.
    //obj.style.height = '800px';

    dbg += " height:" + obj.style.height + ". ";
}

function autoFitIframe() {
    if( iframeElement !== undefined ) {
        if( iframeElement.length > 0 ) {
            for( let i = 0; i < iframeElement.length; i++) {
                ////iframeElement[i].onload = () => resizeIframe(iframeElement[i]);   // org statements.
                iframeElement[i].contentWindow.postMessage({msg:'winSize_req', req: true, val: i}, '*');
                //resizeIframe(iframeElement[i]);
            }
        }

        // const iframes = document.querySelectorAll('iframe');
        // iframes.forEach((iframe) => {
        //     //iframe.onload = () => resizeIframe(iframe);   // org statements.
        //     resizeIframe(iframe);
        // });
    }
}

// function autoFitIframeOnOpen(event) {
//     // const detailsElement = this;
//     // // Access child elements within detailsElement
//     // //const iframeElements = detailsElement.querySelectorAll('iframe');
//     // //const iframeElements = detailsElement.getElementsByClassName('sizeAutoFit');
//     // const iframeElements = detailsElement.getElementsByTagName('iframe');

//     // if( event.currentTarget.open === true ) {
//     if( event.target.open === true ) {
//             if( iframeElement !== undefined ) {
//             //const iframe = event.getElementsByTagName('iframe');
//             var iframe = event.target.querySelectorAll('iframe');

//             if( iframe.length > 0 ) {
//                 //const iframeElement = this.document.getElementsByTagName('iframe');
                
//                 if( iframeElement.length > 0 ) {
//                     // iframeElements.foreach(iframe) {
//                     for( let i = 0; i < iframe.length; i++) {                        
//                         //if( iframe.open === true) {
//                             for( let j = 0; j < iframeElement.length; j++) {
//                                 if(iframeElement[j].src === iframe[i].src) {
//                                     iframeElement[j].contentWindow.postMessage({msg: 'winSize_req', req: false, val: j}, '*');
//                                     break;
//                                 }
//                             }
//                         //}
//                     }
//                 }
//             }
//         }
//     }
// }


function validateTimeLog() {
    let msg = document.getElementById('dbgMsg');
    msg.innerHTML = "";

    for( let i = 0; i< prj_IDs.length; i++ ) {
        // collect all classes with the same name which is presented in the parenthesis such as as 'Dev_h', 'StdAi_h', etc.. 
        let tsk = document.getElementsByClassName( prj_IDs[i] );
        for( let j = 0; j < tsk.length; j++) {
            // collect all 'td' tags under specified hour class name such as 'Dev_h', 'StdAi_h', etc..
            let t = tsk[j].querySelectorAll('td');
            if( t.length > 4) {
                // collect logged hours.
                let mfr = t[1].innerHTML.split('<br>');   // minutes from xx
                let mto = t[2].innerHTML.split('<br>');   // minutes to yy
                let totM = 0;

                for( let k = 0; k < mfr.length; k++) {
                    // split hours to both hour and minute.
                    let tfr = mfr[k].split(':');
                    let tto = mto[k].split(':');
                    totM += (Number( tto[0] ) - Number( tfr[0]) ) * 60;
                    totM += (Number( tto[1] ) - Number( tfr[1]) )
                }

                if( totM !== Number(t[3].innerHTML) ) {
                    // If error found, print all of the date, task class name, and correct minutes. Otherwise print a check box. 
                    //msg.innerHTML += (tsk[j].parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.firstChild.innerText + "-" + prj_IDs[i] + ": " + totM.toFixed(0) + ", "); 
                    msg.innerHTML += (tsk[j].parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('summary').querySelector('span').innerText + "-" + prj_IDs[i] + ": " + totM.toFixed(0) + ", "); 
                }
            }
        }
    }

    if(msg.innerText === "") msg.innerHTML = '&#x2705;'; //'&#x1F7E2; &#x2705;'; //'&#x1F44C;';
}


function populateCalendar() {

    if( yearMonIx[1] > 0 ) { // the array was initialized with a valid value.
        const firstDay = new Date(2000 + yearMonIx[0], yearMonIx[1] - 1, 1);
        const lastDay = new Date(2000 + yearMonIx[0], yearMonIx[1], 0);
        const days = document.getElementsByClassName("day");

        const firstDayIx = firstDay.getDay();   // 0 ~ 6
        const lastDayIx = lastDay.getDate();    // 1 ~ 31

        if( days.length > 0) {
            let ix = 0;
            let dayIx = 1;

            if( (firstDayIx + lastDayIx) > 34) {
                let ltr = document.getElementById("tblLastRow");
                if(ltr !== null ) {
                    ltr.hidden = false;   
                }
            }

            for(; ix < days.length; ix++) {
                // set hidden to true for inner 'div' with 'table' if there no valid timestamp. 
                // If it has a '-' in the 'tag' with the class name 'day', it means that there is a invalid default timestamp.
                if( days[ix].innerHTML.search('-') > 0) { // the day is represented with a default value with '-', so it means there is no valid timestamp for the day.
                    for( let i = 0; i < days[ix].parentElement.parentElement.children.length; i ++) {
                        if( days[ix].parentElement.parentElement.children[i].tagName.toLocaleLowerCase() === 'div' ) { // a candidate of 'div' for the expected siblilng of 'summary' tag under 'details'.
                            let div = days[ix].parentElement.parentElement.children[i];
                            let hour = div.getElementsByClassName('hour');
                            for( let j = 0; j < hour.length; j++ ) {
                                hour[j].hidden = true;
                            }
                            break;
                        }
                    }
                }

                // Clear the default date number text if it is not belong to the month.
                if( ix < firstDayIx) {
                    days[ix].innerHTML = "&nbsp;";
                } else if( ix === firstDayIx) {
                    days[ix].innerHTML = dayIx++;
                } else if( dayIx <= lastDayIx) {
                    days[ix].innerHTML = dayIx++;                    
                } else {
                    days[ix].innerHTML = "&nbsp;";
                }
            }
        }
    }
}


window.onload = function () {
    var rgb, rgbTxt, rlt, s, v;
    let ix = 0, ln = 0;
    let color = ["<span class='r'>", "<span class='g'>", "<span class='b'>"];
    //window.addEventListener("message", buttonEventHandler);
    //window.addEventListener("message", iframeEventHandler);

    for( let i = 0; i < funcInHtmlToBePartOfOnLoad_statusJs.length; i++ ) {
        funcInHtmlToBePartOfOnLoad_statusJs[i]();    
    }

    rgb = document.getElementsByClassName("rgb");
    for( let i = 0; i < rgb.length; i++ ) {
        rgbTxt = rgb[i].innerHTML.split("-&gt;");
        rlt = '';
        for( let j = 0; j < rgbTxt.length; j++ ) {
            s = '';
            for( let k = 0, ix = 0; k < rgbTxt[j].length; k++ ) {
                v = rgbTxt[j].at(k);
                if( v == "1" ) {
                    //s += '<span class="r">O</span>';
                    s += color[ix] + "&nbsp;O&nbsp;</span>";
                    ix++;
                } else if( v == "0" ) {
                    s += "<span class='flg'>&nbsp;O&nbsp;</span>";
                    ix++;
                }
            }

            //if((j+1) < rgbTxt.length ) s += "<br> "; //" =&gt;<br> ";
            ////else if ( j > 0 ) s += "&emsp;&ensp;";
            
            // if( rgbTxt.length == 1) {
            //     rlt += "&emsp;" + s;
            // } else {
            //     rlt += "<span class='fgS'>" + (j+1).toString() + ".</span>&nbsp;" + s;
            // }

            // if((j+1) < rgbTxt.length ) rlt += "<br>";
            rlt += s;
            if((j+1) < rgbTxt.length ) rlt += "<br>";
        }
        rgb[i].innerHTML = rlt;
    }

    for( let i = 0; i < funcRef_status.length; i++) { // a reference to a function has been assigned by the script in the HTML file which includes this script file.
        funcRef_status[i]();
    }

    ln = funcRef_status.length;
    for( let i = 0; i < ln; i++) funcRef_status.pop();


    if( bInit === false ) {
        for( let i = 0; i < funcRefIframe_status.length; i++ ) funcRefIframe_status[i]();            
            
        bInit = true;
        ln = funcRefIframe_status.length;
        for( let i = 0; i < ln; i++ ) funcRefIframe_status.pop();
    }

    
    // for( let i = 0; i < funcInHtmlToBePartOfOnLoad_statusJs.length; i++ ) {
    //     funcInHtmlToBePartOfOnLoad_statusJs[i]();    
    // }

    ln = funcInHtmlToBePartOfOnLoad_statusJs.length;
    for( let i = 0; i < ln; i++ ) {
        funcInHtmlToBePartOfOnLoad_statusJs.pop();
    }

    populateCalendar();
}
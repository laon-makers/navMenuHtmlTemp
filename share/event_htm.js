// Assign class name to this array, especially at your HTML file.
// Horizontal list will show corresponding iframe content when one of list item is clicked.
// The horizontal list is 'li' elements each of which has one 'a' element.
// The class name of the parent of these 'li' element is the name to be added to following array.
// The class name of each list, either 'ul' or 'ol', has corresponding iframe of which id is the 
// same name as the list's class name.
var navList4iframe = [];    // Do not populate the array here. Do that in a HTML file. 
                            // Therefore this javascript file must be loaded before the script file in the html,
                            // especially one that populates this array. refers to comScience.html.

var timeOutId_eventHtm = null;

function sendDeferredPostMsgCmd_eventHtm(id, _msg, _req, _val) {
    if( timeOutId_eventHtm !== null ) clearTimeout(timeOutId_eventHtm);

    let ifr = document.getElementById(id);
    
    // document.getElementById(id).contentWindow.postMessage({msg: e.data.msg.replace('_req', '_rsp'), req: false, val: dbFile}, "*");
    ifr.contentWindow.postMessage({msg: _msg, req: _req, val: _val}, "*");

}

function deferPostMsgCmd_eventHtm(id, _msg, _req, _val) {

    // let ifr = document.getElementById(id);
    //  if( ifr.src !== htm ) ifr.src = htm;

    timeOutId_eventHtm = setTimeout(function () {
        sendDeferredPostMsgCmd_eventHtm(id, _msg, _req, _val);
    }, 1000);
}

function setDefaultSourceValue4NavigationList () {

    if( navList4iframe.length > 0 ) {
        
        for( let i = 0; i < navList4iframe.length; i++ ) {       
          let navLst = document.getElementsByClassName(navList4iframe[i]); // a list of either 'ul' or 'ol'
          
            for( let j = 0; j < navLst.length; j++ ) {  // one or more tab menu pages.
                let chLi = navLst[j].children;  // navLst[j].getElementsByClassName('li');
                if( chLi.length > 0) {          // one or more 'li' tags
                    let ix = -1;
                    for( let k = 0; k < chLi.length; k++) {
                        if( chLi[k].nodeName.toLocaleLowerCase() == 'li') {
                            // get rid of all the class name 'active' from 'li' tag if there is any.
                            for( let l = 0; l < chLi[k].classList.length; l++ ) {
                                if( chLi[k].classList[l] === 'active') {    // found 'li' tag with the class name 'active'.
                                    chLi[k].classList.remove('active'); // Clean if any for the first element.
                                    ix = k;
                                }
                            }
                        }
                    }


                    if( ix < 0 ) ix = 0;    // no class name 'active' found earlier, so set it to zero to get the first tab menu highlighted as a default down the load.

                    chLi[ix].classList.add('active');
                    for( let m = 0; m < chLi[ix].children.length; m++ ) {
                        if( chLi[ix].children[m].tagName.toLocaleLowerCase() === 'a' ) { // the first 'a' tag
                            //chLi[ix].children[m].onclick();
                            let func = chLi[ix].children[m].getAttribute('onclick'); // e.g. "showTabContents(event, 'dashbdIf', './db_2024/dashb_2405.htm')"
                            //let url = func.split(',')[2].split(')')[0].split("'")[1];
                            let url = func.split("'");

                            if( url.length >= 3 ) {
                                //chLi[ix].children[m].onclick(func);

                                let elIf = document.getElementById(navList4iframe[i]);
                                //let att = elIf.getAttribute('src');

                                // ==> Following 2 statements must be present in Firefox browser, especially the first one. 
                                //     Otherwise, the iframe won't be updated with default content of 'src' when 'F5' key was hit, 
                                //     especially refreshing after selecting none default element.
                                //elIf.src = elIf.src;
                                elIf.src = url[3];
                                elIf.setAttribute('src', elIf.src); // set the 'src' content to its default, so that earlier modification is set to default when 'F5' key was pressed.
                            }

                            break; // break at the first 'a' tag.
                        }
                    }

                    //chLi[ix].classList.add('active');
                    //   //console.debug(document.getElementById(navList4iframe[i]));
                    //   let elIf = document.getElementById(navList4iframe[i]);
                    //   //let att = elIf.getAttribute('src');

                    //   // ==> Following 2 statements must be present in Firefox browser, especially the first one. 
                    //   //     Otherwise, the iframe won't be updated with default content of 'src' when 'F5' key was hit, 
                    //   //     especially refreshing after selecting none default element.
                    //   elIf.src = elIf.src;
                    //   elIf.setAttribute('src', elIf.src); // set the 'src' content to its default, so that earlier modification is set to default when 'F5' key was pressed.
                    //   // <==

                    //   //elIf.setAttribute('src', att); // set the 'src' content to its default, so that earlier modification is set to default when 'F5' key was pressed.
                    //   break;
                    //}
                    
                }
            }         
        }
    }
}

// When a 'a' element in one of 'li' elements is clicked,
// 1. Replace the htm file and name in 'src' property with given one in 'htm.
// 2. Get rid of the class name 'active' from one of 'li' elements from 'a' element's parent's parent which is 'ul' or 'ol' element. 
// 3. Add the class name 'active' to the 'li' element which is the clicked 'a' element's parent element.
function showTabContents(evt, id, htm) {
    let htmId = document.getElementById(id);
    //htmId.hidden = true;
    htmId.src = htm;
    //htmId.hidden = false;
    let selList = evt.target;
    // console.log(selList);

    // ==> 24.4.29: from event_htm.js in comScience.git. It doesn't work for this project because the depth to get 'li' element is different from each other.
    // let liList = selList.parentElement.parentElement.children;
    // if( liList.length > 0) {
    //     for(let i = 0; i < liList.length; i++) {
    //         if( liList[i].classList.length > 0 ) {
    //             // for( let j = 0; j < liList[i].classList.length; j++ ) {
    //             // }

    //             liList[i].classList.remove('active');
    //         }            
    //     }

    //     selList.parentElement.classList.add('active');   // set clicked list to 'active' class.
    // }
    // <==

    let liList = selList.parentElement.parentElement.parentElement.children;
    if( liList.length > 0) {
        for(let i = 0; i < liList.length; i++) {
            if( liList[i].classList.length > 0 ) {
                liList[i].classList.remove('active');
            }
        }

        selList.parentElement.parentElement.classList.add('active');   // set clicked list element's class to 'active' class.
    }
  }



  

// onclick event of a button
function openCloseDetails(bOpen) {
    let dt = document.getElementsByTagName('details');
    for( let i = 0; i < dt.length; i++ ) {
        dt[i].open = bOpen;
    }
}

// onclick event of a button
function openCloseTopDetails(bOpen) {
    let dt = document.getElementsByTagName('details');
    for( let i = 0; i < dt.length; i++ ) {

        if( dt[i].parentElement.parentElement.tagName === "BODY" ) {
            dt[i].open = bOpen;
        }
    }
}

// onclick event of a button
function viewAreaOfImg(id, clipPath, margin) {

    let img = document.getElementById(id);
    img.style.clipPath = clipPath;
    img.style.margin = margin;
}

// onclick event of a button
function viewPolygonAreaOfImg(id, area, margin) {

    let img = document.getElementById(id);
    img.style.clipPath = 'polygon(' + area + ')';
    img.style.margin = margin;
}




// ontoggle event handler which is invoked whenever the 'details' tag is open or closed.
function autoFitIframeOnOpen(event) {
    // const detailsElement = this;
    // // Access child elements within detailsElement
    // //const iframeElements = detailsElement.querySelectorAll('iframe');
    // //const iframeElements = detailsElement.getElementsByClassName('sizeAutoFit');
    // const iframeElements = detailsElement.getElementsByTagName('iframe');

    // if( event.currentTarget.open === true ) {
    if( event.target.open === true ) {
        if( iframeElement !== undefined ) {
            // //const iframe = event.getElementsByTagName('iframe');
            // var iframe = event.target.querySelectorAll('iframe');
            var iframe = event.target.getElementsByClassName('iframeAutoFit');

            if( iframe.length > 0 ) {
                //const iframeElement = this.document.getElementsByTagName('iframe');
                
                if( iframeElement.length > 0 ) {
                    // iframeElements.foreach(iframe) {
                    for( let i = 0; i < iframe.length; i++) {                        
                        //if( iframe.open === true) {
                            for( let j = 0; j < iframeElement.length; j++) {
                                if(iframeElement[j].src === iframe[i].src) {
                                    iframeElement[j].contentWindow.postMessage({msg: 'winSize_req', req: true, val: j}, '*');
                                    break;
                                }
                            }
                        //}
                    }
                }
            }
        }
    }
}






///////////////////////////////////////////////// EVENT HANDLERS /////////////////////////////////////////////////
function buttonEventHandler(e) {
    var rsp=[];
    var v, len;
    let wIx = 0;

    if(e.data.req === true) {
        // button click event handler
        switch(e.data.msg) {
        case "openAll":
            // if( Array.isArray(e.data.val) === true ) {

            //     if ( e.data.val.length > 0 ) {

            //         v = Number(e.data.val[0]);

            //         if( v === 1 ) {
            //             openCloseDetails(true);
            //         } else {
            //             openCloseDetails(false);
            //         }

            //     } else {
            //         v = Number(e.data.val);

            //         if( v === 1 ) {
            //             openCloseDetails(true);
            //         } else {
            //             openCloseDetails(false);
            //         }
            //     }
            // }

            openCloseDetails(true);
            break;
        case "closeAll":
            openCloseDetails(false);
            break;

        case "openAllTop":
            openCloseTopDetails(true);
            break;
        case "closeAllTop":
            openCloseTopDetails(false);
            break;

        // case "getSrcTbl":
        //     v = Number(e.data.val);
        //     rsp[0] = ["vcList", "", totWords.toString(), nofWordsPerTbl.toString()];
        //     window.parent.postMessage(rsp, "*");
        //     break;
        }
    }
}




function iframeEventHandler(e) {
    // if (e.origin === '../masterPlan.htm') {
    //     // Handle the message from the parent
    //     console.log(e.data);
    // } else {
    //     console.log("origin: " + e.data + " " + e.origin);
    // }

    //if( Array.isArray(e.data) === true ) { // responses
    if( e.data.req === false ) { // responses
        switch(e.data.msg) {
        case "winSize_rsp":                
            console.log("rsp: " + e.data.msg + ", " + e.data.val);

            if( iframeElement !== undefined ) {
                if( e.data.val[0] < iframeElement.length ) {

                    if( e.data.val[1] > 0 ) {
                        iframeElement[e.data.val[0]].style.width = e.data.val[1] + "px";
                    } else {
                        console.log( "Warning: " + "ID " + e.data.val[0] + " received width is '0'")
                    }

                    if( e.data.val[2] > 0 ) {
                        iframeElement[e.data.val[0]].style.height = e.data.val[2] + "px";
                    } else {
                        console.log( "Warning: " + "ID " +e.data.val[0] + " received height is '0'")
                    }
                }
            }
            break;
        }

    } else  { // request
        switch(e.data.msg) {
        case "winSize_req":
            console.log("req: " + e.data.msg + ", " + e.data.val);
            //window.parent.postMessage(["winSize_rsp", e.data[1], document.documentElement.scrollWidth, document.documentElement.scrollHeight], '*');
            window.parent.postMessage({msg: "winSize_rsp", req: false, val: [e.data.val, document.body.clientWidth, document.body.clientHeight, window.screen.width, window.screen.height]}, '*');
            //window.parent.postMessage(["winSize_rsp", e.data[1], document.scrollingElement.scrollWidth, document.scrollingElement.scrollHeight, window.screen.width, window.screen.height], '*');                
            break;

        case "dashboardFile_req":
            let dbFile = [];
            let navLst = document.getElementsByClassName('dashbdIf'); // a list of either 'ul' or 'ol'
            
            for( let i = 0; i < navLst.length; i++ ) {  // one or more tab menu pages.
                let chLi = navLst[i].children;  // navLst[i].getElementsByClassName('li');
                for( let j = 0; j < chLi.length; j++ ) { // one or more 'li' tags
                    for( let k = 0; k < chLi[j].children.length; k++ ) {
                        if( chLi[j].children[k].tagName.toLocaleLowerCase() === 'a' ) { // the first 'a' tag
                            //chLi[j].children[k].onclick();
                            let func = chLi[j].children[k].getAttribute('onclick'); // e.g. "showTabContents(event, 'dashbdIf', './db_2024/dashb_2405.htm')"
                            //let url = func.split(',')[2].split(')')[0].split("'")[1];
                            let url = func.split("'");    
                            if( url.length >= 3 ) {
                                dbFile.push(url[3]);
                            }

                            break; // break at the first 'a' tag.
                        }
                    }

                }
            }   

            // THe command must be sent as a deferred command, otherwise it may not get dashboard files from the dashboard.htm.
            deferPostMsgCmd_eventHtm("dashbd_chart", e.data.msg.replace('_req', '_rsp'), false, dbFile);   // this function will defers the postMessage invocation.
            //document.getElementById("dashbd_chart").contentWindow.postMessage({msg: e.data.msg.replace('_req', '_rsp'), req: false, val: dbFile}, "*");
            break;
        }
    }
}



function chart_dashboard_eventHandler(e) {

    let prjTr;
    let hour;

    switch(e.data.msg) {
        
        case "prjHour_req":
        //let sel = document.getElementById("vocaSel").selectedIndex.toString();
        prjTr = document.getElementsByClassName(e.data.val);
        hour = 0;
        for(let i = 0; i < prjTr.length; i++) {
            // let tdLst = prjTr[i].getElementsByTagName('td');
            let tdLst = prjTr[i].querySelectorAll('td');
            for(let j = 0; j < tdLst.length; j++) {
                if( isNaN(tdLst[j].innerHTML) === false ) {
                    hour += Number(tdLst[j].innerHTML);
                    break;
                }
            }
        }
        window.parent.postMessage({msg: [e.data.msg.replace('_req', '_rsp'), e.data.val], req: false, val: hour}, "*");
        break;

        case "allPrjHour_req":
        //let sel = document.getElementById("vocaSel").selectedIndex.toString();
        let rlt = [];
        for( let x = 0; x < e.data.val.length; x++ ) {
            prjTr = document.getElementsByClassName(e.data.val[x]);
            hour = 0;
            for(let i = 0; i < prjTr.length; i++) {
                // let tdLst = prjTr[i].getElementsByTagName('td');
                let tdLst = prjTr[i].querySelectorAll('td');
                for(let j = 0; j < tdLst.length; j++) {
                    if( isNaN(tdLst[j].innerHTML) === false ) {
                        hour += Number(tdLst[j].innerHTML);
                        break;
                    }
                }                    
            }
            rlt.push([e.data.val[x], hour])
        }

        window.parent.postMessage({msg: [e.data.msg.replace('_req', '_rsp'), e.data.val.length], req: false, val: rlt}, "*");
        //window.source.postMessage({msg: [e.data.msg, e.data.val.length], val: rlt}, e.origin);
        break;

    // case "enAdmin":
    //     bAdmin = true; 
    //     v = getNextReviewDateHumanReadable();

    //     if( menuItemIdx === "1" ) {    // '단어 암기'
    //         document.getElementById('nxtRvDay2').innerText = v;
    //         document.getElementById('nxtRvDay').hidden = false;

    //         let tbl = document.getElementById('revWdIxTbl');
    //         if( tbl.rows.length > 1 ) {
    //             tbl.hidden = false;
    //         }

    //     } else if( parentMenu === menuSettings ) {
    //         let ix = localStorage.getItem('rvDyIx');
    //         if( isNaN(ix) === false ) {
    //             reviewDay = Number(ix);
    //         }
            
    //         window.parent.postMessage({msg: ["dbg_rsp", "enAdmin"], req: false, val: [v, ix]}, "*");
    //     }
    //     break;

    // case "setExtraTDely":
    //     try {
    //             v = localStorage.getItem("pmExtTD");

    //             if( (isNaN(v) === true) || (v === null) ) {
    //                 v = e.data.val;
    //             } else {
    //                 v = Number(v);
    //                 if( v !== e.data.val ) v = e.data.val;
    //             }
                
    //             v += dftPostMsgTimeout;

    //             if( ( v < 0 ) || (v === null) ) {
    //                 v = dftPostMsgTimeout + dftExtPostMsgTimeout;
    //             }

    //             if( parentMenu == menuSettings ) {
    //                 if( v !== postMsgTDly ) {
    //                     localStorage.setItem("pmExtTD", e.data.val.toString());
    //                 }
    //             }
                
    //             postMsgTDly = v;
    //     } catch (err) {
    //         alert("Error in accessing the postMessage extra time delay !\r\n\tError: " + err.message);
    //     }
    //     break;
    }
}

//export {openCloseDetails, openCloseTopDetails, buttonEventHandler, buttonEventHandler,  autoFitIframeOnOpen, iframeEventHandler};
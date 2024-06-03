let dft_navWidth = undefined; //in "px"
let dft_navWidthCollapsed = '10px'; //in "px";
let initialPageIx = -1; // -1 for the intro, but it will be replaced as soon as the caller html is loaded.
let bOpenAllClicked = true;
let bOpenAllTopClicked = true;
let bNavExpand = false;
var lastItem;
var lastIx;
var aboutSmhCtrl;
let bInit = false;

// following variable may gets a function name to be invoked, especially
// the function defined within a HTML file to be part of the onload function.
var funcInHtmlToBePartOfEarlyOnLoad_nav = [];
var funcInHtmlToBePartOfOnLoad_nav = [];

var InitShowNavElement= function() {
    lastItem = 0;
    lastIx = 0;
    aboutSmhCtrl = false;
}

// function fDummy() {
//     ;
// }

function resizeIframeOnActivePage(id) {
    
    if( iframeElement !== undefined ) {
        //const iframe = document.getElementById(id).querySelectorAll('iframe');
        const iframe = document.getElementById(id).getElementsByClassName('iframeAutoFit');

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
// This function doesn't use jQuery. It shows the selected item on the navigation panel on the left.
// It also gets the selected Navigation menu toggled.
function showNavElement(item, arrayIds) {        
    if( item < 0 ) {
        var lId;
        let id;
        var ix = item * -1;
        
        if(aboutSmhCtrl === false) {
            document.getElementById('highlight').hidden = true;
            aboutSmhCtrl = true;
        }
        
        //if(item !== lastItem) {
            if( lastItem !== 0) lId = arrayIds[(lastItem + 1) * (-1)];
        //}
        
        // added outer 'if-else' statement to get the selected menu on the 'nav' toggled.
        if(item !== lastItem) {
            id = arrayIds[(item + 1) * (-1)];
            lastItem = item;
        } else {
            lastItem = 0;
            document.getElementById('highlight').hidden = false;
            aboutSmhCtrl = false;
        }
        
        if(lId !== undefined) {
            document.getElementById(lId).hidden = true;
            if(lastIx !== 0) document.getElementById('m' + lastIx.toString()).classList.remove('sel');
        }
        
        if(id !== undefined) {
            document.getElementById(id).hidden = false;
            if(ix !== 0) document.getElementById('m' + ix.toString()).classList.add('sel');
            lastIx = ix;
            // resizeIframeOnActivePage(id);
        }
        
        // if( item === -9 ) { // It is "9. Help"
        //     document.getElementById("openCloseAll").disabled = true; // 'details' in the 'Help' page belongs to the top html file, so it cannot be
        // } else {
        //     document.getElementById("openCloseAll").disabled = false;
        // }
    } //else if(item === 1) el1 = true;
}

// following new 'showElement' function doesn't use jQuery.
function showElement(item) {
    showNavElement(item, aIds);
}

function navExpandOrCollapse( bExd ) {
    document.getElementById("navExpand").hidden = bExd;
    document.getElementById("navColpse").hidden = !bExd;
    
    if( bExd == true ) {
        document.getElementsByTagName("nav")[0].style.width = dft_navWidth;
    } else {
        document.getElementsByTagName("nav")[0].style.width = dft_navWidthCollapsed;
    }

    // for( let i = 1; i <= aIds.length; i++ ) {
    //     document.getElementById("n" + i.toString()).hidden = !bExd;
    // }

    let navPage = document.getElementsByClassName('navPage');
    for( let i = 0; i < navPage.length; i++ ) {
        navPage[i].hidden = !bExd;
    }

    bNavExpand = bExd;
}

function openOrCloseAll(bTopOnly) {
    let div = document.getElementsByTagName("div");
    
    for(let i = 0; i < div.length; i++ ) {
        if(div[i].hidden === false) {

            if( div[i].id === "help") { // 'details' tags in the 'Help' page belongs to the top html file, not one in iframe.
                let dt = document.getElementsByTagName('details');
                for( let i = 0; i < dt.length; i++ ) {
                    if( bTopOnly === true ) { // open/close details only on top layer.
                        //if( dt[i].parentElement.parentElement.tagName === "BODY" ) {
                        if( dt[i].parentElement.parentElement.tagName === "SECTION" ) {
                            dt[i].open = bOpenAllTopClicked;
                        }
                    } else {
                        dt[i].open = bOpenAllClicked;
                    }
                }

                if( bTopOnly === true ) {
                    if( bOpenAllTopClicked === true ) {
                        document.getElementById("openCloseAllTop").innerText = "Close All Top";
                    } else {
                        document.getElementById("openCloseAllTop").innerText = "Open All Top";
                    }                    
                    bOpenAllTopClicked = !bOpenAllTopClicked;

                } else {
                    if( bOpenAllClicked === true ) {
                        document.getElementById("openCloseAll").innerText = "Close All";
                    } else {
                        document.getElementById("openCloseAll").innerText = "Open All";
                    }
                    bOpenAllClicked = !bOpenAllClicked;
                }

            } else {
                let ifr = div[i].getElementsByTagName("iframe");
                //let str = ifr.split("?");
                //ifr.src = str[0] + "?OpenAll=" + bOpen.toString();            
                if(ifr.length > 0 ) {
                    let bHtm = ifr[0].src.includes(".htm"); // to make sure it contains .htm file.
                    if( bHtm === true ) { // it contains .htm.
                        if( bTopOnly === true ) {
                            if( bOpenAllTopClicked === true ) {
                                ifr[0].contentWindow.postMessage( {msg: "openAllTop", req: true}, "*");
                                document.getElementById("openCloseAllTop").innerText = "Close All Top";
                            } else {
                                ifr[0].contentWindow.postMessage( {msg: "closeAllTop", req: true}, "*");
                                document.getElementById("openCloseAllTop").innerText = "Open All Top";
                            } 

                            bOpenAllTopClicked = !bOpenAllTopClicked;
                        } else {
                            if( bOpenAllClicked === true ) {
                                ifr[0].contentWindow.postMessage( {msg: "openAll", req: true}, "*");
                                document.getElementById("openCloseAll").innerText = "Close All";
                            } else {
                                ifr[0].contentWindow.postMessage( {msg: "closeAll", req: true}, "*");
                                document.getElementById("openCloseAll").innerText = "Open All";
                            }

                            bOpenAllClicked = !bOpenAllClicked;
                        }
                        break;
                    }
                }
            }
        }
    }
}

let a_img_ix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


function showNextImage(ix, imgLst, id, folder="") {
    changeImage(1, ix, imgLst, id, folder);
}

function showPreviousImage(ix, imgLst, id, folder) {
    changeImage(-1, ix, imgLst, id, folder);
}

function showFirstImage(ix, imgLst, id, folder) {
    changeImage(-200, ix, imgLst, id, folder);
}

function showLastImage(ix, imgLst, id, folder) {
    changeImage(200, ix, imgLst, id, folder);
}

function changeImage(cmd, ix, imgLst, id, folder) {

    if( a_img_ix.length > ix ) {
        bUdt = true
    
        switch(cmd) {
        case -200:
            a_img_ix[ix] = 0;
            break;
        case -1:
            if (a_img_ix[ix] > 0 ) a_img_ix[ix]--;
            break;
        // case 0:
        //     bPlayMinGapImg = false;
        //     break;
        case 1:
            if (a_img_ix[ix] < imgLst.length ) a_img_ix[ix]++;
            break;
        // case 10:
        //     bPlayMinGapImg = true;
        //     break;
        // case 100:
        //     bPlayMinGapImg = false;
        //     break;
        case 200:
            a_img_ix[ix] = imgLst.length - 1;
            break;
        default:
            bUdt = false;
            break;
        }
        
        if( bUdt == true ) {
            if( a_img_ix[ix] < imgLst.length ) {
                //img = "1_" + a_img_ix[ix] + "_start_sim.png";
                if ( folder.length > 0 ) {
                    img = ".\\" + folder + "\\";
                } else img = ""
                img += imgLst[a_img_ix[ix]] + ".png";

                document.getElementById(id).src = img
            }
        }
    }
}

//==> 24.4.3 from htm.js
// function autoFitIframe() {
//     if( iframeElement !== undefined ) {
//         if( iframeElement.length > 0 ) {
//             for( let i = 0; i < iframeElement.length; i++) {
//                 ////iframeElement[i].onload = () => resizeIframe(iframeElement[i]);   // org statements.
//                 iframeElement[i].contentWindow.postMessage({msg: 'winSize_req', req: false, val: i}, '*');
//                 //resizeIframe(iframeElement[i]);
//             }
//         }

//         // const iframes = document.querySelectorAll('iframe');
//         // iframes.forEach((iframe) => {
//         //     //iframe.onload = () => resizeIframe(iframe);   // org statements.
//         //     resizeIframe(iframe);
//         // });
//     }
// }
//<==

window.onload = function () {
    var rgb, rgbTxt, rlt, s, v;
    let ix = 0, ln;
    let color = ["<span class='r'>", "<span class='g'>", "<span class='b'>"];
    //var smry, u;
    for( let i = 0; i < funcInHtmlToBePartOfEarlyOnLoad_nav.length; i++ ) {
        funcInHtmlToBePartOfEarlyOnLoad_nav[i]();
    }
    
    ln = funcInHtmlToBePartOfEarlyOnLoad_nav.length;
    for( let i = 0; i < ln; i++ ) funcInHtmlToBePartOfEarlyOnLoad_nav.pop();

	bNE = localStorage.getItem("bNavExp");
	if( bNE == undefined ) {
		localStorage.setItem("bNavExp", "true");
		bNavExpand = true;                
	} else if ( bNE == "true") {
		bNavExpand = true;
	} else {
		bNavExpand = false;
	}

	initPgIx = localStorage.getItem("pageIx");; // set the initially selected page with the corresponding index number. The index -1, for instance, is the Intro page.

	if( initPgIx == undefined) { // no local store exists.
		localStorage.setItem("pageIx", "-1");
		initialPageIx = -1;
	} else { // local store exists.
		initialPageIx = parseInt(initPgIx, 10);
	}

            //navExpandOrCollapse(bNavExpand);
    InitShowNavElement();
    // smry = document.getElementsByTagName("summary");

    // for( let i = 0; i < smry.length; i++ ) {
    //     u = smry[i].getElementsByTagName("u");
    //     if( u.length > 0 ) u[0].classList = "dtSummary";
    // }

    //window.addEventListener("message", topEventHandler);

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


    if( initialPageIx !== 0 ) {
        showElement(initialPageIx);    // to show the command list page as the default.
    }

    if( bInit === false ) {
        if( dft_navWidth === undefined ) {
            dft_navWidth = document.getElementsByTagName('nav')[0].style.width;
        } else {
            navExpandOrCollapse(true);
        }
        
        // window.addEventListener("message", iframeEventHandler); //24.4.4 from event_htm.js
        // //autoFitIframe();                                        //24.4.4 from htm.js
        document.getElementById("ftVer").innerHTML = AppVer;
        document.getElementById("ftLstUdt").innerHTML = AppLastUpdate;
        // autoFitIframe(); 24.4.3 from htm.js
        bInit = true;
    }

    for( let i = 0; i < funcInHtmlToBePartOfOnLoad_nav.length; i ++ ) { // a function has been assigned by a HTML file which includes the body of the function.
        funcInHtmlToBePartOfOnLoad_nav[i]();
    }
    
    ln = funcInHtmlToBePartOfOnLoad_nav.length;
    for(let i = 0; i < ln; i++ ) funcInHtmlToBePartOfOnLoad_nav.pop();
}



window.onbeforeunload = function() {
	ix = (-1 * lastIx);

	if( initialPageIx != ix ) {
		localStorage.setItem("pageIx", ix.toString());
	}

	localStorage.setItem("bNavExp", bNavExpand.toString());
}
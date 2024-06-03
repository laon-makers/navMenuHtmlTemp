// import * as myEvt from "./share/event_htm.js";
// If you need to call the function, assign a reference to a function to 
// this variable in the HTML file which includes this script file.
// take a look at an example in tdb_na.htm.
var funcRef_htm = [];
var funcRefIframe_htm = [];
let bInit = false;




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
                iframeElement[i].contentWindow.postMessage({msg: 'winSize_req', req: true, val: i}, '*');
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





window.onload = function () {
    var rgb, rgbTxt, rlt, s, v;
    let ix = 0, ln;
    let color = ["<span class='r'>", "<span class='g'>", "<span class='b'>"];
    window.addEventListener("message", buttonEventHandler);
    window.addEventListener("message", iframeEventHandler);

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

    for(let i = 0; i < funcRef_htm.length; i++) { // a reference to a function has been assigned by the script in the HTML file which includes this script file.
        funcRef_htm[i]();
    }
    ln = funcRef_htm.length;
    for(let i = 0; i < ln; i++) funcRef_htm.pop();


    if( bInit === false ) {
        for( let i = 0; i < funcRefIframe_htm.length; i++) funcRefIframe_htm[i]();
        bInit = true;

        ln = funcRefIframe_htm.length;
        for( let i = 0; i < ln; i++) funcRefIframe_htm.pop();
    }
}
/*  Copyright (C) 2024 Gi Tae Cho laon.makers@yahoo.com
    This file is a part of the Smart Home WiFi Web Server project.
    This project can not be copied and/or distributed without the express permission of Gi Tae Cho laon.makers@yahoo.com.

    Author: G.T. Cho (a Laon maker/artist in Laon Creators' Group)
    Version: 1.0
    Last update: May. 27, 2024
*/

const prj_IDs = ['Dev_h', 'Med_h', 'Edu_h', 'StdAi_h', 'LrnJs_h', 'LrnEng_h', 'Ytb_h', 'Bs_h', 'Job_h', 'MiscL_h', 'Misc_h'];
const prjName = ['발명', '명상', '교육(Tr)', '학습(AI)', '학습(JS)', '학습(Eng)', 'Youtube', '창업', 'Job','Misc (Lrn)', 'Misc']
const prjChartColors = ['black', 'brown', 'red', 'orange', 'yellow', ' green', 'blue', 'purple', 'cyan', 'magenta', 'lightgrey' ];

let prjHoursSubTotal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // the number of elements must be equal to the number of element of 'prj_IDs'.

let list_DashboardFile = [];
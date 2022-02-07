function drawCalendar(month,year,id_monthyear,id_daysofweek,id_days) {

	//  SET ARRAYS FOR DIVERSE LANGUAGES
	var day_of_week = new Array();
	day_of_week[0] = new Array('Mo','Tu','We','Th','Fr','Sa','Su');
	day_of_week[1] = new Array('Lu','Ma','Me','Gi','Ve','Sa','Do');
	day_of_week[2] = new Array('Mo','Di','Mi','Do','Fr','Sa','So');
	day_of_week[3] = new Array('Lu','Ma','Me','Je','Ve','Sa','Di');
	day_of_week[4] = new Array('Lu','Ma','Mi','Ju','Vi','Sa','Do');
	
	var month_of_year = new Array();
	month_of_year[0] = new Array
	('January','February','March','April','May','June','July','August','September','October','November','December');
	month_of_year[1] = new Array
	('Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre');
	month_of_year[2] = new Array
	('Januar','Februar','Marzi','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember');
	month_of_year[3] = new Array
	('Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Decembre');
	month_of_year[4] = new Array
	('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');

	var month_days = [31,28,31,30,31,30,31,31,30,31,30,31];
	var isLeap = new Date(year,1,29).getMonth() == 1;
	if(isLeap) month_days[1] = 29;

	var lang = 1; // italiano
	var DAYS_OF_WEEK = 7;  		     // days of week
	var DAYS_OF_MONTH = 31;              // max number of days in a month

	var Calendar = new Date();

	if(month >= 0) Calendar.setMonth(month); // 0-11
	if(year >= 0) Calendar.setFullYear(year);
	
	var year = Calendar.getYear();	      // Returns year
	if ( year < 1000 ) { year += 1900; }  // Correction for 2 digit year format
	var month = Calendar.getMonth();      // Returns month (0-11)
	var today = Calendar.getDate();       // Returns day (1-31)
	var weekday = Calendar.getDay();      // Returns weekday (0-6)
	
	var nowepoc = Date.UTC(year,month,today+1,0,0,0);    // getting current day from epoc, millisec 
	
	// CONVERTING FOR ISO (european) FORMAT
	weekday = weekday-1;
	if (weekday < 0) { weekday = 6; }
	// END CONVERTING FOR ISO (european) FORMAT
	
	Calendar.setDate(1);    // Start the calendar day at '1'
	Calendar.setMonth(month);    // Start the calendar month at now

	// CONVERTING FOR ISO (european) FORMAT
	var giornosett = Calendar.getDay()-1;
	if (giornosett < 0) { giornosett = 6; }

	//var e = document.getElementById("mycalendar_monthyear");
	var e = document.getElementById(id_monthyear);
	e.innerHTML = month_of_year[lang][month] + '&nbsp;' + year;

	var strHTML;

	//e = document.getElementById("mycalendar_daysofweek");
	e = document.getElementById(id_daysofweek);
	strHTML = e.innerHTML;
	for(index = 0;index < DAYS_OF_WEEK; index++) {

		strHTML +=
			'<div class="rTableHead2"><strong>' + day_of_week[lang][index] + '</strong></div>';

	}
	e.innerHTML = strHTML;

	//e = document.getElementById("mycalendar_days");
	e = document.getElementById(id_days);
	strHTML = '<div class="rTableRow2">';

	for(idx = 0; idx < giornosett; idx++) {

		strHTML += '<div class="rTableCell2">&nbsp;</div>';

	}

	for(index = 0;index < DAYS_OF_MONTH;index++) {
		// this condition stops writing day number for month shorter of 31 days
		if( Calendar.getDate() > index ) {

			var day = Calendar.getDate();

			if(year == year && month == month && today == Calendar.getDate())
				strHTML += '<div class="rTableCell2"><strong><a id="cal_' + year + month + day + '" href="javascript:void(0)" style="color:red;">' + day + '</a></strong></div>';
			else
				strHTML += '<div class="rTableCell2"><a id="cal_' + year + month + day + '" href="javascript:void(0);">' + day + '</a></div>';

			// RETURNS THE NEXT DAY TO PRINT
			week_day = giornosett;

			// START NEW ROW FOR FIRST DAY OF WEEK
			if(week_day == 6 && day != month_days[month]) {
				strHTML += '</div>'; // rTableRow
				if(((index + 1) < DAYS_OF_MONTH) && ((Calendar.getDate()+1) > (index + 1))) {
					strHTML += '<div class="rTableRow2">';
				}
			}
	
			// INCREMENTS UNTIL END OF THE MONTH
			Calendar.setDate(Calendar.getDate()+1);
	
			// ISO (european) FORMAT
			giornosett = Calendar.getDay()-1;
			if(giornosett < 0) { giornosett = 6; }

		}
	}

	if(week_day != 6) strHTML += '</div>';

	e.innerHTML = strHTML;

}

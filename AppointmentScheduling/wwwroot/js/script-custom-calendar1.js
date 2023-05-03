$(document).ready(function () {
    InitializeCalendar();
    alert("here");
});

function InitializeCalendar() {
    try {
       
            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                headerToolbar: {
                    left: 'prev,next,today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                selectable: true,
                editable: false,
                select: function(event) {
                    onShowModal(event, null);
                }
            });
            calendar.render();
   
    }
    catch (e) {
        alert(e);
    }
}
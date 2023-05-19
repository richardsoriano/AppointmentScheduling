

var routeURL = location.protocol + "//" + location.host;

$(document).ready(function () {
    //$("#appointmentDate").kendoDateTimePicker({
    //        value: new Date(),
    //        dateInput: false
    //})
    console.log("function before Init");
    InitializeCalendar();
});
var calendar;
function InitializeCalendar() {
    //try {
    console.log("Initialize");
    var calendarEl = document.getElementById('calendar');
    //    if (calendarEl! = null)
    //    {

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next,today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        selectable: true,
        editable: false,
        select: function (event) {
            onShowModal(event, null);
        }

    });
    calendar.render();
    // }

    //}
    //catch (e) {
    //    alert(e);
    //}

}
function onShowModal(obj, isEventDetail) {
    if (isEventDetail != null) {
        $("#title").val(obj.title);
        $("#description").val(obj.description);
        $("#appointmentDate").val(obj.startDate);
        $("#duration").val(obj.duration);
        $("#patientId").val(obj.patientId);
        $("#doctorId").val(obj.doctorId);
        $("#id").val(obj.id);
        $("#lblPatientName").html(obj.patientName);
        $("#lblDoctorName").html(obj.doctorName);
        if (obj.isDoctorApproved) {
            $("#lblStatus").html("Approved");
        } else {
            $("#lblStatus").html("Pending");
        }

    } else {
        $("#appointmentDate").val(obj.startStr + " " + new moment().format("hh:mm A"));
        $("#id").val(0);
    }

    $("#appointmentInput").modal("show");
}
function onCloseModal() {
    $("#appointmentForm")[0].reset();
    $("#id").val(0);
    $("#title").val('');
    $("#description").val('');
    $("#appointmentDate").val('');
    $("#duration").val('');

    $("#patientId").val('');
    $("#appointmentInput").modal("hide");

}
function onSubmitForm() {
    if (checkValidation()) {
        var requestData = {
            Id: parseInt($("#id").val()),
            Title: $("#title").val(),
            Description: $("#description").val(),
            StartDate: $("#appointmentDate").val(),
            EndDate: "01/01/2000",
            Duration: $("#duration").val(),
            DoctorId: $("#doctorId").val(),
            PatientId: $("#patientId").val(),
            AdminId: "",
            DoctorName: "",
            PatientName: "",
            AdminName: "",
        };

        const payload = {
            "url": `${routeURL}/api/Appointment/SaveCalendarData`,
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(requestData),
        };
        $.ajax(payload).done(response => {
            if (response.status === 1 || response.status === 2) {
                $.notify(response.message, "success");
                onCloseModal();
            } else {
                $.notify(response.message, "error ");
            }
        }).fail(() => {
            $.notify("Error", "error");
            onCloseModal();
        })
    }
}
function checkValidation() {
    var isValid = true;
    if ($("#title").val() === undefined || $("#title").val() === "") {
        isValid = false;
        $("#title").addClass('error');
    }
    else {
        $("#title").removeClass('error');
    }
    if ($("#appointmentDate").val() === undefined || $("#appointmentDate").val() === "") {
        isValid = false;
        $("#appointmentDate").addClass('error');
    }
    return isValid;
}

function checkValidation() {
    var isValid = true;
    if ($("#title").val() === undefined || $("#title").val() === "") {
        isValid = false;
        $("#title").addClass('error');
    }
    else {
        $("#title").removeClass('error');
    }
    if ($("#appointmentDate").val() === undefined || $("#appointmentDate").val() === "") {
        isValid = false;
        $("#appointmentDate").addClass('error');
    }
    return isValid;
}
function getEventDetailsByEventId(info) {
    console.log("Get event detail by Id");
    var doctorId = $("#doctorId").val();
    console.log("doctor", doctorId);
    $.ajax({
        url: `${routeURL}/api/Appointment/GetCalendarDataById/${info.id}`,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.status === 1 && response.dataenum !== undefined) {
                onShowModal(response.dataenum, true)
            }
            successCallback(events);
        },
        error: function (xhr) {
            $.notify("Error", "error");
        }
    });
}
function onDoctorChange() {
    calendar.refetchEvents();
}
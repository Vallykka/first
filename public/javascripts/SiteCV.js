$(document).ready(function () {
    $("#menu").click(function () {
        $("#menu").animate({ opacity: "1", width: "140px", heigh: "214px" }, 50)
	.animate({ opacity: "0.3", width: "150px", heigh: "224px" }, 50)
	.animate({ opacity: "1" }, 200);
        $("#toPress").slideToggle(100);
    });
    $("li").mouseover(function () {
        $(this).css("background-color", "#b1e855");
    });
    $("li").mouseleave(function () {
        $(this).css("background-color", "#f3822d");
    });
    $("li").click(function () {
        $(this).animate({ opacity: "1", width: "80%", heigh: "214px" }, 50)
	.animate({ opacity: "0.3", width: "90%", heigh: "224px" }, 50)
	.animate({ opacity: "1" }, 200);
    });
    $("#sendComment").click(function () {
        $("#message").load("qwe.js");
    });

});
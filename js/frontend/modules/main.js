(function ($) {
	// Defining a global object for the javascript functions
	// By defining all our functions to this global object, we can access all functions in any function or file.
	window.projectFunctions = window.projectFunctions || {};

	$(document).ready(function () {
		// Menu JS starts here
		$(".burger-container")
			.stop()
			.click(function () {
				$(".header").stop().toggleClass("menu-opened");
			});

		$(".burger-container").click(function () {
			$("#content").fadeToggle(500);
		});

		$(".burger-container").click(function () {
			$(".menu").delay("300").fadeToggle(250);
		});
		// END

		// Menu JS starts here
		$("#image_1").click(function () {
			$(".section_4_individual_wrapper").stop().fadeOut(500);
			$("#hidden_1").stop().delay("490").fadeIn(500);
		});

		$("#image_2").click(function () {
			$(".section_4_individual_wrapper").stop().fadeOut(500);
			$("#hidden_2").stop().delay("490").fadeIn(500);
		});

		$("#image_3").click(function () {
			$(".section_4_individual_wrapper").stop().fadeOut(500);
			$("#hidden_3").stop().delay("490").fadeIn(500);
		});
		// END

		// Show/Hide
		$(document).ready(function () {
			$(".section_4_close").click(function () {
				$("#image_1").stop().delay("502").fadeToggle(500);
				$("#image_2").stop().delay("502").fadeToggle(500);
				$("#image_3").stop().delay("502").fadeToggle(500);
				$("#hidden_1").stop().fadeOut(500);
				$("#hidden_2").stop().fadeOut(500);
				$("#hidden_3").stop().fadeOut(500);
			});
		});
		// END

		$(".product_box_hover").on({
			mouseenter: function () {
				$(this).stop().animate(
					{
						bottom: "40px",
					},
					200
				);
			},
			mouseleave: function () {
				$(this).stop().animate(
					{
						bottom: "0px",
					},
					200
				);
			},
		});

		$("#product_box_1").on({
			mouseenter: function () {
				$("#button_1").stop().delay(100).fadeIn(300);
			},
			mouseleave: function () {
				$("#button_1").stop().fadeOut(200);
			},
		});

		$("#product_box_2").on({
			mouseenter: function () {
				$("#button_2").stop().delay(100).fadeIn(300);
			},
			mouseleave: function () {
				$("#button_2").stop().fadeOut(200);
			},
		});

		$("#product_box_3").on({
			mouseenter: function () {
				$("#button_3").stop().delay(100).fadeIn(300);
			},
			mouseleave: function () {
				$("#button_3").stop().fadeOut(100);
			},
		});

		$("#button_1").on({
			mouseenter: function () {
				$("#button_hover_solution_1").stop().animate(
					{
						bottom: "40px",
					},
					200
				);
			},
			mouseleave: function () {
				$("#button_hover_solution_1").stop().animate(
					{
						bottom: "0px",
					},
					200
				);
			},
		});

		$("#button_2").on({
			mouseenter: function () {
				$("#button_hover_solution_2").stop().animate(
					{
						bottom: "40px",
					},
					200
				);
			},
			mouseleave: function () {
				$("#button_hover_solution_2").stop().animate(
					{
						bottom: "0px",
					},
					200
				);
			},
		});

		$("#button_3").on({
			mouseenter: function () {
				$("#button_hover_solution_3").stop().animate(
					{
						bottom: "40px",
					},
					200
				);
			},
			mouseleave: function () {
				$("#button_hover_solution_3").stop().animate(
					{
						bottom: "0px",
					},
					200
				);
			},
		});

		// CLICK-SCROLL FUNKTION
		$(".1").click(function () {
			$("html, body").animate(
				{
					scrollTop: $("#section_2_scroll").offset().top,
				},
				1500
			);
		});

		$(".2").click(function () {
			$("html, body").animate(
				{
					scrollTop: $("#section_3_scroll").offset().top,
				},
				1500
			);
		});

		$(".3").click(function () {
			$("html, body").animate(
				{
					scrollTop: $("#section_31_scroll").offset().top,
				},
				1500
			);
		});

		$(".4").click(function () {
			$("html, body").animate(
				{
					scrollTop: $("#section_4_scroll").offset().top,
				},
				1500
			);
		});

		$(".5").click(function () {
			$("html, body").animate(
				{
					scrollTop: $("#section_5_scroll").offset().top,
				},
				1500
			);
		});

		$(".contact_info_text").click(function () {
			$("html, body").animate(
				{
					scrollTop: $("#section_4_scroll").offset().top,
				},
				1500
			);
		});

		// When the user scrolls down 300px from the top of the document, show the button
		window.onscroll = function () {
			scrollFunction();
		};

		function scrollFunction() {
			if (
				document.body.scrollTop > 300 ||
				document.documentElement.scrollTop > 300
			) {
				document.getElementById("up_arrow").style.display = "block";
			} else {
				document.getElementById("up_arrow").style.display = "none";
			}
		}

		$("#up_arrow").click(function () {
			$("html, body").animate(
				{
					scrollTop: $("#content").offset().top,
				},
				1500
			);
		});
	});
})(jQuery);

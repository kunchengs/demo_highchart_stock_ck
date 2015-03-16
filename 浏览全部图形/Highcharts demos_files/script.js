jQuery(document).ready(function () {
	jQuery('.nav-sidebar > li').click(function () {
		if (!jQuery(this).hasClass("active")) {
			jQuery('.nav-sidebar > li.active > div.active').removeClass('active');
			jQuery('.nav-sidebar > li.active > ul').slideUp("slow");
			jQuery('.nav-sidebar > li.active').removeClass('active');
			jQuery(this).addClass("active");
			jQuery('.nav-sidebar > li.active > ul').slideDown("slow");
			jQuery('.nav-sidebar > li.active > div').addClass('active');
		}
	});
	jQuery("#sidebar-toggle").click(function (e) {
		jQuery("#wrap").toggleClass("toggled");
	});	
});	
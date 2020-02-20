<?php
global $svg, $responsive;

$firstScreenVideo = isset($_GET['video']);
$firstScreenVideo = true;
?>

<header class="header front-header has-bg" data-theme="dark">
	<div class="bg-img" data-aos="fadeIn">
		<!-- <img src="<?= SRC; ?>img/screen1.jpg" alt="background" class="img-cover"> -->
		<?php
		if (!$firstScreenVideo) {
		?>
			<div class="img-lazy-load opacity" data-src="<?= SRC; ?>img/screen1.jpg" data-alt="background"></div>
		<?php
		} else {
		?>
			<div class="img-lazy-load opacity" data-src="<?= SRC; ?>img/screen1.jpg" data-alt="background"></div>
			<video loop muted class="front-header-video">
				<source src="/files/video_bg.webm" type="video/webm">
				<source src="/files/video_bg.mp4" type="video/mp4">
			</video>
		<?php
		}
		?>
	</div>

	<div class="container content-container">

		<div class="content-row">
			<div class="title-col">
				<h1 class="page-title animated-text-rows overflow-hide bottom-arrow" data-class-view="visible">
					<span class="animate-row">
						<span>Объединяйтесь</span>
					</span>
					<span class="animate-row">
						<span>для больших<br>
							побед
							вместе</span>
					</span>
					<span class="arrow" data-aos="fade-right" data-aos-delay="1000"></span>
				</h1>
				<button type="button" class="btn transparent-btn become-partner-btn dom-open-modal" data-target="#becomePartnerModal" data-dom-body-class="modal-become-partner">become a partner</button>
			</div>

			<div class="banner-col" data-aos="flip-right" data-aos-delay="800">
				<a href="/" target="_blank" class="banner-wrap">
					<div class="date">12 – 14 NOV 2019</div>
					<h3 class="banner-title">
						Wargaming at<br>
						Golden Joystick
					</h3>
					<span class="ico">
						<?= $svg->get_ico('arrow_left'); ?>
					</span>
				</a>
			</div>
		</div>


	</div>


	<div class="desc-wrap">
		<div class="desc-container container" data-aos="fade-up" data-aos-delay="200">

			<?php
			$carouselSets = [
				'type' => 'slider',
				'rewind' => false,
				'bound' => true,
				'perView' => 4,
				'keyboard' => true,
				'gap' => 0,
				'breakpoints' => [
					$responsive['mobile'] => [
						'perView' => 3,
					],
					'576' => [
						'perView' => 2,
					],
					'480' => [
						'perView' => 1.3,
					],
				],
			];
			?>

			<div class="dom-overflow-slider glide" data-dom-carousel-sets='<?= json_encode($carouselSets); ?>'>
				<div class="glide__track" data-glide-el="track">
					<div class="desc-row row header-advantages glide__slides">
						<!-- repeat 4 -->
						<div class="desc-col col glide__slide">
							<div class="desc-item">
								<span class="up">{2}up to{2}</span>
								<div class="desc-title">180 mln</div>
								<div class="dec-subtitle">Active players</div>
							</div>
						</div>
						<!-- end repeat  -->
					</div>
				</div>
				<div data-glide-el="controls" class="glide-controls">
					<span data-glide-dir="<" class="glide-prev">
						<?= $svg->get_ico('next'); ?>
					</span>
					<span data-glide-dir=">" class="glide-next">
						<?= $svg->get_ico('next'); ?>
					</span>
				</div>
			</div>

		</div>
		<div class="arrows-container container">
			<div class="header-advantages-arrows">
				<span class="nav-btn prev"></span>
				<span class="nav-btn next"></span>
			</div>
		</div>
	</div>


	<div class="scroll-down dom-scroll-to" data-dom-scroll-to=".network-section" data-dom-scroll-speed="300">
		<span class="text">scroll down</span>
		<span class="ico">
			<?= $svg->get_ico('anim_mouse'); ?>
		</span>
	</div>

</header>


<section class="section network-section has-bg" data-theme="dark">

	<div class="bg-img" data-aos="fade-in">
		<div class="img-lazy-load opacity" data-src="<?= SRC; ?>img/screen2.jpg" data-alt="background"></div>
		<!-- <img src="<?= SRC; ?>img/screen2.jpg" alt="background"> -->
	</div>

	<div class="container">
		<h2 class="section-title">
			<span class="block overflow-hide">
				<span class="block" data-aos="fade-up">Our network is focused on</span>
			</span>
			<span class="block overflow-hide">
				<span class="block" data-aos="fade-up" data-aos-delay="1000">one thing your profit</span>
			</span>
		</h2>

		<div class="row network-card-row">
			<?php
			for ($i = 1; $i < 5; $i++) {
			?>
				<div class="col network-card-col" data-aos="fade-left" data-aos-delay="<?= $i * 200; ?>">
					<div class="network-card">
						<div class="thumb-container">
							<div class="thumb">
								<?php
								// if ($i === 1) echo $svg->get_ico('pay');
								if ($i === 1) echo '<img src="/img/icons/pay.svg" alt="ico">';
								if ($i === 2) echo '<img src="/img/icons/headphonesa.svg" alt="ico">';
								if ($i === 3) echo '<img src="/img/icons/pay.svg" alt="ico">';
								if ($i === 4) echo '<img src="/img/icons/pay.svg" alt="ico">';
								?>
							</div>
						</div>
						<h3 class="card-title">
							<?php
							if ($i === 1) echo 'High payout';
							if ($i === 2) echo 'Dedicated support';
							if ($i === 3) echo 'Quick start';
							if ($i === 4) echo 'Global coverage';
							?>
						</h3>
						<div class="card-desc-container">
							<div class="card-desc">
								Brings its technology-centric challenges loyalty industry.
							</div>
						</div>
					</div>
				</div>
			<?php
			}
			?>
		</div>


		<div class="btn-row center overflow-hide" data-aos="fade-up">
			<a href="#" class="become-partner-btn btn red-btn dom-open-modal" data-target="#becomePartnerModal" data-dom-body-class="modal-become-partner">Become a partner</a>
		</div>

	</div>
</section>



<section class="section section-advantages has-bg" data-theme="dark" id="advantages">
	<div class="bg-img" data-aos="fade-in">
		<!-- <img src="<?= SRC; ?>img/screen3.jpg" alt="background"> -->
		<div class="img-lazy-load opacity" data-src="<?= SRC; ?>img/screen3.jpg" data-alt="background"></div>
	</div>
	<div class="container">
		<h2 class="section-title" data-aos="fade-in">

			<svg class="svg-stroked first-line">
				<text class="svg-stroked-text" x="0" y="78%" xml:space="preserve">
					<tspan class="svg-stroked-tspan" x="58%" y="78%" text-anchor="middle">Преимущества</tspan>
				</text>
			</svg>

			<svg class="svg-stroked second-line">
				<text class="svg-stroked-text" x="0" y="78%" xml:space="preserve">
					<tspan class="svg-stroked-tspan second-span" x="58%" y="78%" text-anchor="middle">работы с нами</tspan>
				</text>
			</svg>

		</h2>

		<div class="chart-row">

			<div class="buttons-col dom-scroll-drag hidden-scrollbar" data-aos="fade-right">
				<div class="buttons-wrap slide-nav dom-scroll-drag hidden-scrollbar">
					<?php
					for ($i = 1; $i < 6; $i++) {
					?>
						<button data-slide="<?= $i; ?>" class="chart-button slide-link <?= $i === 1 ? 'active' : ''; ?>">
							<div class="bg">
								<?= $svg->get_ico('down'); ?>
							</div>
							<span class="num">
								<?= '0' . $i; ?>
							</span>
						</button>

					<?php
					}
					?>
					<svg style="position:absolute; z-index: -1;">
						<defs>
							<linearGradient x1="50%" y1="6.54377884%" x2="50%" y2="169.127694%" id="bgGradient">
								<stop stop-color="#C51B31" stop-opacity="0" offset="0%"></stop>
								<stop stop-color="#FF0033" offset="100%"></stop>
							</linearGradient>
						</defs>
					</svg>
				</div>
			</div>

			<div class="sliders-wrapper">

				<!-- repeat 5  -->
				<div class="slide{1} active{1}" data-slide="{1}0{1}{2}1{2}{3}2{3}{4}3{4}{5}4{5}" {1}data-class-view="animate" {1}>

					<div class="content-col">
						<h3 class="chart-title">
							<span>
								Revenue
							</span>
						</h3>
						<div class="chart-desc">
							An online game dedicated to mid-20th century armored vehicles. Virtual tankers are fighting fans of
							steel giants from around the world, defending their claims to world domination.
							<div class="dom-slide-up" id="learnMoreContent{1}1{1}{2}2{2}{3}3{3}{4}4{4}{5}5{5}">
								An online game dedicated to mid-20th century armored vehicles. Virtual tankers are fighting fans of
								steel giants from around the world, defending their claims to world domination.
							</div>
						</div>
						<div class="learn-more-row">
							<a href="#learnMoreContent{1}1{1}{2}2{2}{3}3{3}{4}4{4}{5}5{5}" class="under-red learn-more-link show-link slide-link">
								<span class="hide-text">Show more</span>
								<span class="visible-text">Hide</span>
							</a>
						</div>

					</div>

					<div class="chart-col">
						{1}
						<div class="citation">
							The average income of our partners<br>
							for 2019 was $5000
						</div>
						<div class="chart-container">
							<div class="svg-animated-graph" data-class-view="animate">
								<div class="coordinates">

									<div class="ax-x ax">
										<div>
											<span>2015</span>
										</div>
										<div>
											<span>2016</span>
										</div>
										<div>
											<span>2017</span>
										</div>
										<div>
											<span>2018</span>
										</div>
										<div>
											<span>2019</span>
										</div>
									</div>

									<div class="ax-y ax">
										<div>
											<span>$5000</span>
										</div>
										<div>
											<span>$4000</span>
										</div>
										<div>
											<span>$3000</span>
										</div>
										<div>
											<span>$2000</span>
										</div>
										<div>
											<span>$1000</span>
										</div>
									</div>

								</div>


								<img src="<?= SRC; ?>img/graf.svg" alt="">
								<?php
								goto aftergraf;
								?>
								<svg fill="none" width="775" height="328" version="1.1" viewBox="0 0 775 328" style="overflow:visible">
									<defs>
										<linearGradient x1="0%" y1="100%" x2="100%" y2="100%" id="graphGradient">
											<stop stop-color="#321518" offset="0%"></stop>
											<stop stop-color="#C51B31" offset="100%"></stop>
										</linearGradient>
									</defs>
									<!-- fill-rule="evenodd" sketch:type="MSPage"  stroke-width="1" id="Page-1"-->
									<g fill="none">
										<!-- id="Path-1" stroke="url(#graphGradient)" stroke-width="10" sketch:type="MSShapeGroup" class="path" -->
										<path class="path" d="M0,320 l60,-40 l45,-3 l30,-20 l60,-10 l40,-30 l60,10 l100,-60 l100,-10 l50,-40 l90,-30 l60,-60 L775,0"></path>
									</g>
								</svg>
								<?php
								aftergraf:
								?>
							</div>

						</div>
						{1}

						{!1}
						<div class="img-wrap">
							<img src="<?= SRC; ?>img/poster.jpg" alt="image">
						</div>
						{!1}
					</div>

				</div>
				<!-- end repeat  -->
			</div>
			<div class="arrows-wrap">
				<button class="arrow slider-arrow arrow-prev">
					<svg style="transform: rotate(-90deg)" version="1.1" id="Capa_1" x="0px" y="0px" width="284.929px" height="284.929px" viewBox="0 0 284.929 284.929" style="enable-background:new 0 0 284.929 284.929">
						<path d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285
		C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854
		c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848
		c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566
		C284.929,199.378,283.984,197.188,282.082,195.285z" />
					</svg>
				</button>
				<button class="arrow slider-arrow arrow-next">
					<svg style="transform: rotate(90deg)" version="1.1" id="Capa_1" x="0px" y="0px" width="284.929px" height="284.929px" viewBox="0 0 284.929 284.929" style="enable-background:new 0 0 284.929 284.929">
						<path d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285
		C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854
		c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848
		c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566
		C284.929,199.378,283.984,197.188,282.082,195.285z" />
					</svg>
				</button>
			</div>
		</div>



	</div>
</section>


<section class="section section-offers" data-theme="dark" id="offers">
	<div class="container">
		<h1 class="section-title animated-text-rows" data-class-view="visible">
			<span class="animate-row">
				<span>Our offers</span>
			</span>
			<span class="arrow"></span>
		</h1>
		<div class="offers-row over-container">
			<?php
			$total = 7;
			$logos = ['logo1.png', 'logo2.png', 'logo3.png'];
			$posters = ['video_poster1.jpg', 'video_poster2.jpg', 'video_poster3.jpg'];
			for ($i = $total; $i > 0; $i--) {
				$index = $total - $i > 2 ? array_rand($logos) :  $total - $i;
			?>
				<div class="offer-col play-video-on-hover">
					<div class="offer-item">
						<div class="content-wrap">
							<div class="logo">
								<a href="http://google.com">
									<img src="<?= SRC . 'img/' . $logos[$index]; ?>" alt="logo">
								</a>
							</div>
							<div class="desc-wrap">
								<div class="desc">
									An online game dedicated to mid-20th century armored vehicles.
								</div>
							</div>
						</div>
						<div class="video-bg">
							<video loop="" muted="" class="offer_video">
								<source src="<?= SRC; ?>files/video_bg.webm" type="video/webm" />
								<source src="<?= SRC; ?>files/video_bg.mp4" type="video/mp4" />
							</video>
							<div class="video-poster" style="background-image:url('<?= SRC; ?>img/<?= $posters[$index]; ?>')"></div>

						</div>
						<div class="btn-row center">
							<a href="#" class="become-partner-btn btn red-btn dom-open-modal" data-target="#becomePartnerModal" data-dom-body-class="modal-become-partner">become a partner</a>
						</div>
					</div>
				</div>
			<?php
			}
			?>

		</div>
		<div class="arrows-wrap">
			<button class="arrow slider-arrow arrow-prev">
				<svg style="transform: rotate(-90deg)" version="1.1" id="Capa_1" x="0px" y="0px" width="284.929px" height="284.929px" viewBox="0 0 284.929 284.929" style="enable-background:new 0 0 284.929 284.929">
					<path d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285
		C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854
		c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848
		c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566
		C284.929,199.378,283.984,197.188,282.082,195.285z" />
				</svg>
			</button>
			<button class="arrow slider-arrow arrow-next">
				<svg style="transform: rotate(90deg)" version="1.1" id="Capa_1" x="0px" y="0px" width="284.929px" height="284.929px" viewBox="0 0 284.929 284.929" style="enable-background:new 0 0 284.929 284.929">
					<path d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285
		C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854
		c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848
		c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566
		C284.929,199.378,283.984,197.188,282.082,195.285z" />
				</svg>
			</button>
		</div>
	</div>
</section>




<section class="section section-review" data-theme="dark" id="review">
	<div class="bg-img" data-aos="fade-in">
		<!-- <img src="<?= SRC; ?>img/screen4.jpg" alt="home background"> -->
		<div class="img-lazy-load opacity" data-src="<?= SRC; ?>img/screen4.jpg" data-alt="background"></div>
	</div>
	<div class="container">
		<div class="section-title" data-aos="fade-left">
			<svg class="svg-stroked first-line">
				<text class="svg-stroked-text" x="0" y="78%" xml:space="preserve">
					<tspan class="svg-stroked-tspan" x="58%" y="98%" text-anchor="middle">Отзывы</tspan>
				</text>
			</svg>
		</div>

		<div class="slider-reviews" data-interval="5000">

			<div class="sliders-track">
				<!-- repeat 5 -->
				<div class="slider-item">

					<div class="slider-content">
						<a href="http://google.com" class="img-wrap animate-image-onview" data-class-view="animate">
							<!-- <a href="http://google.com"> -->
							<img src="<?= SRC; ?>img/review.jpeg" alt="slider preview" class="img-cover">
							<!-- </a> -->
						</a>
						<div class="content-col">
							<div class="content-wrap">
								<h3 class="slider-title animated-text-rows" data-class-view="visible">
									<span class="animate-row">
										<span>
											Softonic has been using the
										</span>
									</span>
									<span class="animate-row">
										<span>
											Affiliate Program for about two years.
										</span>
									</span>
								</h3>
								<div class="slider-desc opverflow-hide" data-aos="fade-in" data-aos-delay="950">
									<span class="arrow-red" data-aos="fade-right" data-aos-delay="1200"></span>
									{1}№1{1}
									{2}№2{2}
									{3}№3{3}
									{4}№4{4}
									{5}№5{5}
									During this time, our income has grown significantly thanks to the direct cooperation with the Wargaming team. The program is easy to use and payments are always on time!
									{2}During this time, our income has grown significantly thanks to the direct cooperation with the Wargaming team. The program is easy to use and payments are always on time!{2}
									{3}
									During this time, our income has grown significantly thanks to the direct cooperation with the Wargaming team. The program is easy to use and payments are always on time!
									During this time, our income has grown significantly thanks to the direct cooperation with the Wargaming team. The program is easy to use and payments are always on time!
									During this time, our income has grown significantly thanks to the direct cooperation with the Wargaming team. The program is easy to use and payments are always on time!
									{3}
									<div class="desc-signature">
										Oliver Millar
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
				<!-- end repeat  -->

			</div>

			<button class="arrow slider-arrow arrow-prev">
				<svg style="transform: rotate(-90deg)" version="1.1" id="Capa_1" x="0px" y="0px" width="284.929px" height="284.929px" viewBox="0 0 284.929 284.929" style="enable-background:new 0 0 284.929 284.929">
					<path d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285
		C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854
		c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848
		c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566
		C284.929,199.378,283.984,197.188,282.082,195.285z" />
				</svg>

			</button>

			<button class="arrow slider-arrow arrow-next">

				<svg style="transform: rotate(90deg)" version="1.1" id="Capa_1" x="0px" y="0px" width="284.929px" height="284.929px" viewBox="0 0 284.929 284.929" style="enable-background:new 0 0 284.929 284.929">
					<path d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285
		C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854
		c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848
		c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566
		C284.929,199.378,283.984,197.188,282.082,195.285z" />
				</svg>

				<svg class="progress-svg" width="220" height="220" viewBox="0 0 220 220" fill="none">
					<circle class="progress__value" cx="110" cy="110" r="100" fill="none" stroke-dashoffset="628" stroke-dasharray="628" style="transform: rotate(-90deg); transform-origin: center center;"></circle>
				</svg>

			</button>

		</div>
	</div>
</section>




<section class="section become-partner-section" data-theme="light">

	<div class="container white-bg lg-padding" data-aos="fade-up">

		<h2 class="section-title">Become a partner</h2>

		<form action="/includes/fake_ajax.php?ajax_action=become_partner" class="form become-partner-form ajax-form form-validate" data-help-container=".validate-form-msg" method="post">

			<div class="validate-form-msg">
				<div class="validate-form-ico alert-ico">
					<?= $svg->get_ico('alert'); ?>
				</div>
				<div class="validate-form-ico success-ico">
					<?= $svg->get_ico('tick'); ?>
				</div>
			</div>

			<div class="form-row">

				<div class="form-col-6">
					<label for="PartnerName">
						<div class="label">Name<span class="required">*</span></div>
						<input type="text" class="input" name="partnerName" id="PartnerName" data-label="Name" data-min="3" data-max="63" data-regex="[^\w\d_]+" data-min-msg="Слишком короткое имя пользователя" data-max-msg="Слишком длинное имя пользователя" data-regex-msg="Можно использовать только латиницу, цифры и знак подчёркивания" required>
					</label>
				</div>

				<div class="form-col-6">
					<label for="PartnerCompany">
						<div class="label">Company<span class="required">*</span></div>
						<input type="text" class="input" name="partnerCompany" id="PartnerCompany" required>
					</label>
				</div>

			</div>



			<div class="form-row">
				<?php
				$diffMsg = ['Пароль и имя пользователя не могут совпадать', 'Пароль и email не могут совпадать'];
				?>
				<div class="form-col-6">
					<label for="Password">
						<div class="label">Password<span class="required">*</span></div>
						<input autocomplete="off" type="password" class="input" name="passwordRepeat" id="Password" data-label="Password" data-diff-msg='<?= json_encode($diffMsg); ?>' data-diff='["#modalPartnerName","#modalPartnerEmail"]' data-min="6" data-max="64" data-min-msg="Слишком короткий пароль" data-max-msg="Слишком длинный пароль" data-regex-msg="Можно использовать только латиницу, цифры и знак подчёркивания" data-regex="[^\w\d_]+" required>
					</label>
				</div>

				<div class="form-col-6">
					<label for="PasswordRepeat">
						<div class="label">Repeat password<span class="required">*</span></div>
						<input autocomplete="off" type="password" class="input" name="passwordRepeat" id="PasswordRepeat" data-password-compare="#Password" required>
					</label>
				</div>

			</div>

			<div class="form-row">
				<div class="form-col-6">
					<label for="PartnerEmail">
						<div class="label">E-mail<span class="required">*</span></div>
						<input data-label="E-mail" type="email" class="input" name="partnerEmail" id="PartnerEmail" data-min="5" data-min-msg="Слишком короткий Email" data-max-msg="Слишком длинный Email" data-domain-error-msg="Вы ввели недопустимое значение домена при заполнении поля" required>
					</label>
				</div>
				<div class="form-col-6">
					<label for="PartnerWebsite">
						<div class="label">website<span class="required">*</span></div>
						<input type="text" class="input" name="partnerWebsite" id="PartnerWebsite" data-regex="[^a-zA-Z\/\.:]+" data-regex-msg="Вы ввели недопустимое значение домена, при заполнении поля" required>
					</label>
				</div>
			</div>


			<div class="form-row additional-fields dom-slide-up" id="additionaFieldsPartner">
				<div class="form-col">
					<label for="PartnerMoreInfo">
						<div class="label">Comments</div>
						<textarea type="text" class="input" name="partnerMoreInfo" id="PartnerMoreInfo"></textarea>
					</label>
				</div>
				<!-- <div class="form-col-6">
					<label for="PartnerMoreInfo2">
						<div class="label">Website stats</div>
						<textarea type="text" class="input" name="partnerMoreInfo2" id="PartnerMoreInfo2"></textarea>
					</label>
				</div> -->
			</div>


			<div class="form-row">
				<div class="form-col">
					<a href="#additionaFieldsPartner" class="slide-link show-additional-fields target-hidden">
						<span class="open-text">Is there anything else you want to add?</span>
						<span class="close-text">Hide fields</span>
					</a>
				</div>
			</div>


			<span class="form-hr"></span>


			<div class="form-row">
				<div class="form-col-6 no-responsive">
					<label for="termsAccept" class="custom-checkbox">
						<div class="input-checkbox">
							<input type="checkbox" name="termsAccept" id="termsAccept" data-accept-terms="true" class="input" required />
							<span class="check"></span>
						</div>
						<div class="label-checkbox">I acknowledge that I have read and accept the Wargaming <a href="#" class="dom-open-modal" data-target="#termsModal">Terms and Conditions</a></div>
					</label>
				</div>
				<div class="form-col-6 no-responsive">
					<div class="form-rules">
						<span class="required">*</span>Required Fields
					</div>
				</div>
			</div>




			<div class="form-row submit-row">
				<div class="form-col">
					<button type="submit" class="btn red-transparent-btn submit-btn">SEND MESSAGE</button>
				</div>
			</div>

		</form>

	</div>
</section>



<section class="section asked-questions-section">
	<div class="white-bg" data-theme="light">
		<div class="container">
			<div class="title-col">
				<h2 class="section-title animated-text-rows" data-class-view="visible">
					<span class="animate-row">
						<span>
							Частозадаваемые
						</span>
					</span>
					<span class="animate-row">
						<span>
							Вопросы
						</span>
					</span>
				</h2>
				<div class="all-quest-row hide-mobile hide-tablet" data-aos="fade-in">
					<a href="/?page=faq" class="under-red all-quest-link">all questions</a>
				</div>
			</div>

			<div class="accordion-col" data-aos="fade-in">

				<div class="dom-accordion">
					<!-- repeat 4 -->
					<div class="accordion-item">
						<div class="accordion-head">
							<h3 class="accordion-title">
								What is an affiliate program?
							</h3>
							<div class="accordion-ico">
								<span class="ico"></span>
							</div>
						</div>
						<div class="accordion-body dom-slide-up">
							<div class="content">
								What is an affiliate program?
								What is an affiliate program?
								What is an affiliate program?
								What is an affiliate program?
								What is an affiliate program?
								What is an affiliate program?
							</div>
						</div>
					</div>
					<!-- end repeat  -->
				</div>

			</div>

		</div>
		<div class="container display-tablet">
			<div class="all-quest-row">
				<a href="#" class="under-red all-quest-link">all questions</a>
			</div>
		</div>
	</div>
</section>
<?= get_template('recent_news'); ?>



<?php

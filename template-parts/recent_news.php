<section class="section recent-news-section" data-theme="dark">
  <div class="bg-img bottom-bg" data-aos="fade-in">
    <div class="img-lazy-load opacity" data-src="<?= SRC; ?>img/screen5.jpg" data-alt="home background"></div>
  </div>
  <div class="container">
    <h2 class="section-title animated-text-rows" data-class-view="visible">
      <span class="animate-row">
        <span>
          Recent news
        </span>
      </span>
    </h2>
    <div class="news-row col-3 center-col">
      <?php
      $total = 3;
      $posters = ['news1.jpg', 'news2.jpg', 'news3.jpg', 'news4.jpg', 'news5.jpg', 'news6.jpg', 'news7.jpg', 'news8.jpg', 'news9.jpg'];
      for ($i = $total; $i > 0; $i--) {
        $index = $i - $total + 6;
        $img = SRC . 'img/' . $posters[$index];
      ?>
        <div class="news-col" data-aos="fade-right" data-aos-delay="<?= $i * 200; ?>">
          <a href="/?page=single_news" class="news-card block">
            <div class="thumb">
              <img src="<?= $img; ?>" alt="poster" class="img-cover">
            </div>
            <div class="content">
              <div class="date">14 NOV 2019</div>
              <div class="desc">
                <?php
                if ($i === 1) echo 'World of Tanks got its fourth Golden Joystick Award, setting two records';
                if ($i === 2) echo 'World of Tanks Blitz partners with MMA fighter Aaron Pico';
                if ($i === 3) echo 'Wheeled vehicles are ready to roll out onto World of Tanks Battlefield';
                ?>
              </div>
            </div>
          </a>
        </div>
      <?php
      }
      ?>
    </div>
    <div class="more-news-row" data-aos="fade-in">
      <a href="/?page=news" class="under-red more-news-link">View all news</a>
    </div>
  </div>
</section>
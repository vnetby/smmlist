<?php
global $svg;
?>

<div class="bg-img top-right-bg">
  <!-- <img src="<?= SRC; ?>img/screen3.jpg" alt="background"> -->
  <div class="img-lazy-load opacity" data-src="<?= SRC; ?>img/screen3.jpg" data-alt="background"></div>
</div>


<header class="title-header container">
  <h1 class="page-title">News</h1>
</header>

<section class="section news-list-section">
  <div class="container">
    <div id="ajaxNewsPagination" class="has-preloader">
      <div class="list-cards col-3">
        <?php
        $posters = ['news1.jpg', 'news2.jpg', 'news3.jpg', 'news4.jpg', 'news5.jpg', 'news6.jpg', 'news7.jpg', 'news8.jpg', 'news9.jpg'];
        for ($i = 0; $i < 6; $i++) {
          $index = array_rand($posters, 1);
          $img = SRC . 'img/' . $posters[$index];
        ?>
          <div class="news-col">
            <a href="/?page=single_news" class="news-card block">
              <div class="thumb">
                <img src="<?= $img; ?>" alt="poster" class="img-cover">
              </div>
              <div class="content">
                <div class="date">14 NOV 2019</div>
                <div class="desc">
                  <?php
                  if ($i === 0) echo 'World of Tanks got its fourth Golden Joystick Award, setting two records';
                  if ($i === 1) echo 'World of Tanks Blitz partners with MMA fighter Aaron Pico';
                  if ($i === 2) echo 'Wheeled vehicles are ready to roll out onto World of Tanks Battlefield';
                  if ($i === 3) echo 'World of Tanks got its fourth Golden Joystick Award, setting two records';
                  if ($i === 4) echo 'World of Tanks Blitz partners with MMA fighter Aaron Pico';
                  if ($i === 5) echo 'Wheeled vehicles are ready to roll out onto World of Tanks Battlefield';
                  ?>
                </div>
              </div>
            </a>
          </div>
        <?php
        }
        ?>
      </div>

      <div class="pagination dom-ajax-pagination" data-ajax="<?= SRC; ?>includes/fake_ajax.php?ajax_action=get_news_pagination" data-content="#ajaxNewsPagination">
        <a href="/?page=news&p=1" class="pag-btn prev" data-page="1" data-title="some page title">Prev</a>
        <div class="pag-numbers">
          <a href="/?page=news&p=1" class="pag-item link" data-page="1" data-title="other page title">1</a>
          <span class="pag-item current" data-page="2" data-page-current ta-title="page title" data-page-link="/?page=news&p=2">2</span>
          <a href="/?page=news&p=3" class="pag-item link" data-page="3" data-title="3 - page">3</a>
          <a href="/?page=news&p=4" class="pag-item link" data-page="4" data-title="4 - page">4</a>
          <a href="/?page=news&p=5" class="pag-item link" data-page="5" data-title="5 - page">5</a>
        </div>
        <a href="/?page=news&p=7" class="pag-btn next" data-page="7" data-title="6 - page">Next</a>
      </div>

    </div>

  </div>

</section>
<?php

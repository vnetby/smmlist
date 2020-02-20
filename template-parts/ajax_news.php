<div class="list-cards col-3">
  <?php
  $posters = ['news1.jpg', 'news2.jpg', 'news3.jpg', 'news4.jpg', 'news5.jpg', 'news6.jpg', 'news7.jpg', 'news8.jpg', 'news9.jpg'];
  for ($i = 0; $i < 6; $i++) {
    $index = array_rand($posters, 1);
    $img = '/img/' . $posters[$index];
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
<?php
global $svg;
?>
<div class="single-news">
  <header class="simple-header">
    <div class="bg-image">
      <img src="<?= SRC; ?>img/poster.jpg" alt="background image" class="img-cover">
    </div>
    <div class="container">
      <div class="content-sm">
        <div class="date">14 NOV 2019</div>
        <h1 class="page-title">
          Wheeled vehicles are ready to roll out onto World of Tanks Battlefield
        </h1>
      </div>
    </div>
  </header>


  <section class="section section-single-news-content" data-theme="light">

    <div class="container editor-content">
      <div class="content-sm">
        <h3>
          World of Tanks Battlefield
        </h3>
        <p>
          Authorities in Washington state say a Texas man fell to his death during a climbing trip with his son, earlier this week.
        </p>
        <p>
          According to a statement from the Chelan County Sheriff's Office, Dallas resident Robert Jake Colburn, 60, died last week after it appeared he slipped and fell several hundred feet while descending Aasgard Pass, located about 15 miles souht of Leavenworth. He was last seen around 3 p.m. on Thursday as he descended Aasgard, one of the most difficult hikes in the state, KING5 news reported.
        </p>
        <p>
          When Colburn failed to arrive at base camp later that night, Colburn's son contacted authorities on Thursday night just before 11 p.m. to report his father had not returned after climbing the mountain pass. The Pass is one of two routes hikers can take into what's called "The Enchantments," which are a series of mountain lakes.
        </p>
        <p>
          "Achieving the pass is a thigh-burning, chest-bursting, eye-popping endeavor that offers as many extraordinary views as beads of sweat that will fall from your brow as you ascend nearly 2,000 feet in just three-quarters of a mile," as the Washington Trails Association describes the pass.
        </p>


        <div class="back-btn-row">
          <a href="#" class="back-link">
            <span class="ico">
              <?= $svg->get_ico('left_arrow'); ?>
            </span>
  
            <span class="text">all news</span>
          </a>
        </div>

      </div>
    </div>
  </section>


<?= get_template('recent_news'); ?>
</div>
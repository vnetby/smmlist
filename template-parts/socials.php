<?php
global $svg;
?>
<!-- dom-absolute-fix -->
<div class="fixed-socials "> 
  <div class="socials-container dom-slide-up" id="fixedSocials">
    <a href="#" target="_blank" class="social-ico">
      <?= $svg->get_ico('telegram'); ?>
    </a>
    <a href="#" target="_blank" class="social-ico">
      <?= $svg->get_ico('fb'); ?>
    </a>
    <a href="#" target="_blank" class="social-ico">
      <?= $svg->get_ico('mail'); ?>
    </a>
    <a href="#" target="_blank" class="social-ico">
      <?= $svg->get_ico('in'); ?>
    </a>
  </div>
  <div class="open-social-btn slide-link">
    <?= $svg->get_ico('contact'); ?>
  </div>
  <div class="close-social-btn">
    <div class="hamburger hamburger--spin js-hamburger open-menu-btn is-active">
      <div class="hamburger-box">
        <div class="hamburger-inner"></div>
      </div>
    </div>
  </div>
</div>
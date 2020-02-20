<?php
global $svg;
?>
<footer class="footer-wrap">
  <div class="footer">
    <div class="age">
      <span class="ico">
        <?= $svg->get_ico('age'); ?>
      </span>
    </div>
    <ul class="foot-menu">
      <li class="menu-item">
        <a href="#">
          FAQ
        </a>
      </li>
      <li class="menu-item current-menu-item">
        <a href="#" class="dom-open-modal" data-target="#termsModal">
          Terms and Conditions
        </a>
      </li>
      <li class="menu-item">
        <a href="#">
          Privacy Policy
        </a>
      </li>
      <li class="menu-item">
        <a href="#">
          Contact us
        </a>
      </li>
      <li class="menu-item">
        <a href="#">
          Meet us
        </a>
      </li>
    </ul>

    <ul class="foot-socials">
      <li class="social-item">
        <a href="#" class="ico">
          <?= $svg->get_ico('telegram'); ?>
        </a>
      </li>
      <li class="social-item">
        <a href="#" class="ico">
          <?= $svg->get_ico('fb'); ?>
        </a>
      </li>
      <li class="social-item">
        <a href="#" class="ico">
          <?= $svg->get_ico('mail'); ?>
        </a>
      </li>
      <li class="social-item">
        <a href="#" class="ico">
          <?= $svg->get_ico('in'); ?>
        </a>
      </li>
    </ul>
  </div>
  <div class="footer-copyrights">
    <div class="text">
      © 1998–2020 Wargaming.net. Все права защищены.
    </div>
  </div>
</footer>
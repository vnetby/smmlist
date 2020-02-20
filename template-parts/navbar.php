<?php
global $svg;

$langs = ['en' => 'EN', 'ru' => 'RU'];
$cur_lang = 'en';
$next_lang = 'ru';
if (isset($_GET['lang'])) {
  if (isset($langs[$_GET['lang']])) {
    $cur_lang = $_GET['lang'];
    $next_lang = $cur_lang === 'en' ? 'ru' : 'en';
  }
}


?>
<div class="fixed-nav">

  <nav class="nav top-nav main-width padding-on-body-hide">

    <div class="left-col">

      <div class="menu-btn-col">
        <div class="hamburger hamburger--spin js-hamburger open-menu-btn">
          <div class="hamburger-box">
            <div class="hamburger-inner"></div>
          </div>
        </div>
      </div>

      <div class="logo-col">
        <div class="logo-ico" data-dom-href="/">
          <img src="/img/icons/logo.svg" alt="">
        </div>
        <div class="logo-text" data-dom-href="/">
          Wargaming<br>
          Affiliate Program
        </div>
      </div>

    </div>



    <div class="right-col">
      <div class="lang-col hide-tablet">
        <div class="dropdown">
          <button type="button" class="open-dropdown btn white-hover-btn">
            <span class="text">
              <?= $langs[$cur_lang]; ?>
            </span>
            <span class="ico">
              <?= $svg->get_ico('down_arrow'); ?>
            </span>
          </button>
          <div class="dropdown-content">
            <a href="<?= $next_lang === 'en' ? '.' : '.?lang=ru'; ?>" class="text dropdown-text btn white-hover-btn"><?= $langs[$next_lang]; ?></a>
          </div>
        </div>
      </div>

      <div class="account-col hide-tablet">
        <a href="#" target="_blank" class="account-link btn white-hover-btn">
          <span class="ico white-ico"><?= $svg->get_ico('user'); ?></span>
          <span class="text">SIGN IN</span>
        </a>
      </div>

      <div class="become-btn-col">
        <button type="button" class="btn transparent-btn become-partner-btn dom-open-modal" data-target="#becomePartnerModal" data-dom-body-class="modal-become-partner">become a partner</button>
      </div>
    </div>




    <div class="offcanvas-nav dom-custom-scrollbar">

      <div class="container mobile-controls-container display-tablet">
        <div class="contrlos-row">
          <div class="lang-col">
            <div class="dropdown">
              <button type="button" class="open-dropdown btn white-hover-btn">
                <span class="text"><?= $langs[$cur_lang]; ?></span>
                <span class="ico">
                  <?= $svg->get_ico('down_arrow'); ?>
                </span>
              </button>
              <div class="dropdown-content">
                <a href="<?= $next_lang === 'en' ? '.' : '.?lang=ru'; ?>" class="text dropdown-text btn white-hover-btn"><?= $langs[$next_lang]; ?></a>
              </div>
            </div>
          </div>

          <div class="account-col">
            <a href="#" target="_blank" class="account-link btn white-hover-btn">
              <span class="ico white-ico"><?= $svg->get_ico('user'); ?></span>
              <span class="text">SIGN IN</span>
            </a>
          </div>

        </div>
      </div>

      <div class="container offcanvas-menu-container">
        <ul class="ofcanvas-menu top-menu">
          <li class="menu-item">
            <a href="/#advantages">Why work with us?</a>
          </li>
          <li class="menu-item">
            <a href="/#offers">Our offers</a>
          </li>
          <li class="menu-item">
            <a href="/#review">Review</a>
          </li>
          <li class="menu-item<?= $_SERVER['REQUEST_URI'] === '/?page=faq' ? ' current-menu-item' : ''; ?>">
            <a href="/?page=faq">FAQ</a>
          </li>
          <li class="menu-item<?= $_SERVER['REQUEST_URI'] === '/?page=news' ? ' current-menu-item' : ''; ?>">
            <a href="/?page=news">News</a>
          </li>
          <li class="menu-item<?= $_SERVER['REQUEST_URI'] === '/?page=contact' ? ' current-menu-item' : ''; ?>">
            <a href="/?page=contact">Contact us</a>
          </li>
        </ul>
      </div>

      <div class="container become-partner-container">
        <button type="button" class="btn red-btn become-partner-btn dom-open-modal" data-target="#becomePartnerModal">become a partner</button>
      </div>

    </div>
  </nav>

</div>
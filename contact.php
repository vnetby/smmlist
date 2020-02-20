<?php

global $svg;
?>
<div class="bg-img top-right-bg">
  <!-- <img src="<?= SRC; ?>img/screen3.jpg" alt="background"> -->
  <div class="img-lazy-load opacity" data-src="<?= SRC; ?>img/screen3.jpg" data-alt="background"></div>
</div>


<header class="title-header container">
  <h1 class="page-title">
    Contact us
  </h1>
</header>

<section class="section section-contact" data-theme="light">
  <div class="container form-container white-bg lg-padding">

    <div class="form-contact-col">
      <h2 class="section-title">
        Send message
      </h2>
      <form action="/includes/fake_ajax.php?ajax_action=contact_form" class="form contact-form ajax-form form-validate" data-help-container=".validate-form-msg" method="post">

        <div class="validate-form-msg">
          <div class="validate-form-ico alert-ico">
            <?= $svg->get_ico('alert'); ?>
          </div>
          <div class="validate-form-ico success-ico">
            <?= $svg->get_ico('tick'); ?>
          </div>
        </div>

        <div class="form-row">
          <div class="form-col">
            <label for="contactName">
              <div class="label">Name<span class="required">*</span></div>
              <input type="text" class="input" name="contactName" id="contactName" required>
            </label>
          </div>
        </div>

        <div class="form-row">
          <div class="form-col">
            <label for="contactEmail">
              <div class="label">Email<span class="required">*</span></div>
              <input data-label="E-mail" type="email" class="input" name="partnerEmail" id="PartnerEmail" data-min="5" data-min-msg="Слишком короткий Email" data-max-msg="Слишком длинный Email" required>
            </label>
          </div>
        </div>

        <div class="form-row">
          <div class="form-col">
            <label for="contactComment">
              <div class="label">Comments</div>
              <textarea class="input" name="contactComment" id="contactComment"></textarea>
            </label>
          </div>
        </div>

        <div class="form-rules">
          <span class="required">*</span>Required Fields
        </div>

        <div class="form-row submit-row">
          <div class="form-col">
            <button type="submit" class="btn red-btn submit-btn">SEND</button>
          </div>
        </div>

      </form>
    </div>

    <div class="contacts-col">
      <h3 class="col-title">Follow us</h3>
      <div class="socials-row">

        <div class="social-col">
          <a href="#" class="social-link tel">
            <?= $svg->get_ico('telegram'); ?>
          </a>
        </div>

        <div class="social-col">
          <a href="#" class="social-link fb">
            <?= $svg->get_ico('fb'); ?>
          </a>
        </div>

        <div class="social-col">
          <a href="#" class="social-link mail">
            <?= $svg->get_ico('mail'); ?>
          </a>
        </div>

        <div class="social-col">
          <a href="#" class="social-link in">
            <?= $svg->get_ico('in'); ?>
          </a>
        </div>

      </div>
    </div>

  </div>
</section>
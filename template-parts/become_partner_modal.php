<div class="modal become-partner-modal" id="becomePartnerModal">
  <div class="dom-custom-scrollbar" data-scroll-y>

    <div class="container">

      <div class="content-wrap white-bg">

        <h2 class="modal-title">Become a partner</h2>
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
              <label for="modalPartnerName">
                <div class="label">Name<span class="required">*</span></div>
                <input type="text" class="input" name="partnerName" id="modalPartnerName" data-label="Name" data-min="3" data-max="63" data-regex="[^\w\d_]+" data-min-msg="Слишком короткое имя пользователя" data-max-msg="Слишком длинное имя пользователя" data-regex-msg="Можно использовать только латиницу, цифры и знак подчёркивания" required>
              </label>
            </div>

            <div class="form-col-6">
              <label for="modalPartnerCompany">
                <div class="label">Company<span class="required">*</span></div>
                <input type="text" class="input" name="partnerCompany" id="modalPartnerCompany" required>
              </label>
            </div>

          </div>



          <div class="form-row">
            <?php
            $diffMsg = ['Пароль и имя пользователя не могут совпадать', 'Пароль и email не могут совпадать'];
            ?>
            <div class="form-col-6">
              <label for="modalPassword">
                <div class="label">Password<span class="required">*</span></div>
                <input autocomplete="off" type="password" class="input" name="passwordRepeat" id="modalPassword" data-label="Password" data-diff-msg='<?= json_encode($diffMsg); ?>' data-diff='["#modalPartnerName","#modalPartnerEmail"]' data-min="6" data-max="64" data-min-msg="Слишком короткий пароль" data-max-msg="Слишком длинный пароль" data-regex-msg="Можно использовать только латиницу, цифры и знак подчёркивания" data-regex="[^\w\d_]+" required>
              </label>
            </div>

            <div class="form-col-6">
              <label for="modalPasswordRepeat">
                <div class="label">Repeat password<span class="required">*</span></div>
                <input autocomplete="off" type="password" class="input" name="passwordRepeat" id="modalPasswordRepeat" data-password-compare="#modalPassword" required>
              </label>
            </div>

          </div>

          <div class="form-row">
            <div class="form-col-6">
              <label for="modalPartnerEmail">
                <div class="label">E-mail<span class="required">*</span></div>
                <input data-label="E-mail" type="email" class="input" name="partnerEmail" id="modalPartnerEmail" data-min="5" data-min-msg="Слишком короткий Email" data-max-msg="Слишком длинный Email" data-domain-error-msg="Вы ввели недопустимое значение домена при заполнении поля" required>
              </label>
            </div>
            <div class="form-col-6">
              <label for="modalPartnerWebsite">
                <div class="label">website<span class="required">*</span></div>
                <input type="text" class="input" name="partnerWebsite" id="modalPartnerWebsite" data-regex="[^a-zA-Z\/\.:]+" data-regex-msg="Вы ввели недопустимое значение домена, при заполнении поля" required>
              </label>
            </div>
          </div>


          <div class="form-row additional-fields dom-slide-up" id="additionaFieldsPartnerModal">
            <div class="form-col">
              <label for="modalPartnerMoreInfo">
                <div class="label">Comments</div>
                <textarea type="text" class="input" name="partnerMoreInfo" id="modalPartnerMoreInfo"></textarea>
              </label>
            </div>
            <!-- <div class="form-col-6">
              <label for="modalPartnerMoreInfo2">
                <div class="label">Website stats</div>
                <textarea type="text" class="input" name="partnerMoreInfo2" id="modalPartnerMoreInfo2"></textarea>
              </label>
            </div> -->
          </div>


          <div class="form-row">
            <div class="form-col">
              <a href="#additionaFieldsPartnerModal" class="slide-link show-additional-fields target-hidden">
                <span class="open-text">Is there anything else you want to add?</span>
                <span class="close-text">Hide fields</span>
              </a>
            </div>
          </div>


          <span class="form-hr"></span>


          <div class="form-row">
            <div class="form-col-6 no-responsive">
              <label for="termsAcceptModal" class="custom-checkbox">
                <div class="input-checkbox">
                  <input type="checkbox" name="termsAccept" id="termsAcceptModal" data-accept-terms="true" class="input" required />
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
    </div>
  </div>
</div>
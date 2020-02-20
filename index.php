<?php
define('SRC', 'https://wlap.vnetby.net/');
define('ABSPATH', dirname(__FILE__) . '/');

require(ABSPATH . 'includes/functions.php');

require(ABSPATH . 'includes/class_svg_icons.php');



$svg = new SvgIcons;

$responsive = [
  'mobile' => 992,
  'tablet' => 1024,
  'desktop' => 1660
];

$htmlAttrs = '';
if (isset($_GET['page'])) {
  if ($_GET['page'] === 'faq');
  $htmlAttrs = ' itemscope itemtype="https://schema.org/FAQPage"';
}

?>

<!DOCTYPE html>
<html lang="ru" dir="ltr" <?= $htmlAttrs; ?>>

<head>
  <meta charset="utf-8">
  <title>WLAP</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#c51b31" />
  <link rel="stylesheet" href="<?= SRC; ?>assets/assets.min.css">
  <link rel="stylesheet" href="<?= SRC; ?>css/head.min.css">
  <link rel="stylesheet" href="<?= SRC; ?>css/main.min.css">


  <script>
    window.back_dates = {
      SRC: '<?= SRC; ?>'
    };

    window.responsive = {
      mobile: <?= $responsive['mobile']; ?>,
      tablet: <?= $responsive['tablet']; ?>,
      desktop: <?= $responsive['desktop']; ?>
    };


    window.form_validate_msg = {
      required: 'Заполните все обязательные поля',
      mail_format: 'Вы ввели неверный email',
      accept_terms: 'Примите условия',
      min_number: 'Число должно быть более $1',
      max_number: 'Число должно быть меньше $1',
      min_str: "Минимальное количество символов: $1",
      max_str: "Максимальное количество символов: $1",
      not_allowed_symbols: "Поле содержит недопустимые символы",
      compare_password: "Пароли не совпадают. Попробуйте еще раз"
    }
  </script>

</head>






<body class="<?= isset($_GET['lang']) ? 'language-' . $_GET['lang'] : 'language-en'; ?>">
  <script src="<?= SRC; ?>js/head.min.js"></script>
  <?php
  get_template('navbar');
  get_template('socials');
  ?>
  <div class="site-wrap">
    <div class="main" id="main">
      <?php

      $has_content = false;
      if (isset($_GET['page'])) {
        if ($_GET['page'] === 'links') {
          require(dirname(__FILE__) . '/_links.php');
          $has_content = true;
        }
      }

      if (!$has_content) {
        the_page_content();
      }


      get_template('footer');

      ?>
    </div>
  </div>

  <?php
  require(ABSPATH . 'template-parts/become_partner_modal.php');
  require(ABSPATH . 'template-parts/terms_modal.php');
  ?>

  <script src="<?= SRC; ?>assets/assets.min.js"></script>
  <script src="<?= SRC; ?>js/main.min.js"></script>

</body>

</html>
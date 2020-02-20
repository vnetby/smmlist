<?php

require(dirname(__FILE__) . '/functions.php');

if (isset($_GET['ajax_action'])) {
  $action = $_GET['ajax_action'];
  if ($action) {
    $fn = 'ajax_' . $action;
    if (function_exists($fn)) {
      call_user_func($fn);
    }
  }
}





function ajax_get_news_pagination()
{
  $abspath = realpath(dirname(__FILE__) . '/../') . '/';

  $page = (int) $_POST['page'];


  ob_start();
  display_content($abspath . 'template-parts/ajax_news.php');
  $content = ob_get_clean();
  ob_start();

  $max = 5;
  $next = true;
?>
  <div class="pagination dom-ajax-pagination" data-ajax="/includes/fake_ajax.php?ajax_action=get_news_pagination" data-content="#ajaxNewsPagination">
    <a href="/?page=news&p=1" class="pag-btn prev" data-page="1" data-title="some page title">Prev</a>
    <div class="pag-numbers">
      <?php
      for ($i = 1; $i <= $max; $i++) {
        if ($i !== $page) {
      ?>
          <a href="/?page=news&p=<?= $i; ?>" class="pag-item link" data-page="<?= $i; ?>" data-title="<?= $i; ?> - page"><?= $i; ?></a>
        <?php
        } else {
        ?>
          <span class="pag-item current" data-page="<?= $i; ?>" data-page-current data-title="<?= $i; ?> - page" data-apage-link="/?page=news&p=<?= $i; ?>"><?= $i; ?></span>
      <?php
        }
      }
      ?>
    </div>
    <a href="/?page=news&p=<?= $i + 1; ?>" class="pag-btn next" data-page="<?= $i + 1; ?>" data-title="<?= $i + 1; ?> - page">Next</a>
  </div>
<?php
  $pagination = ob_get_clean();

  echo $content;
  echo $pagination;
  exit;
}







function ajax_become_partner()
{
  // ... validate $_POST data;

  // $response = [
  //   'type' => 'error',
  //   'inputs' => [isset($_POST['partnerName']) ? 'PartnerName' : 'ModalPartnerName', isset($_POST['partnerEmail']) ? 'PartnerEmail' : 'ModalPartnerEmail'], // ID OF INPUTS
  //   'msg' => 'Пользователь с таким именем уже существует<br>Пользователь с таким e-mail уже существует' // RESPONSE MESSAGE
  // ];


  // $response = [
  //   'redirect' => 'http://google.com' // WILL BE REDIRECTED TO THIS PAGE
  // ];


  // $response = [
  //   'reload' => true // WILL RELOAD CURRENT PAGE
  // ];

  $response = [
    'type' => 'success', // WILL CLEAR ALL INPUTS ERRORS
    'clearValues' => true, // WILL CLEAR ALL INPUTS VALUES
    'msg' => 'Данные успешно отправлены<br>You can use <strong>HTML</strong> markup here'
  ];

  // $response = [
  //   'type' => 'error',
  //   'msg' => 'some message'
  // ];

  echo json_encode($response);
}




function ajax_contact_form()
{
  $response = [
    'type' => 'success', // WILL CLEAR ALL INPUTS ERRORS
    'clearValues' => true // WILL CLEAR ALL INPUTS VALUES
  ];

  echo json_encode($response);
}

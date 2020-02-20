<?php


function get_template($name)
{
    $file = ABSPATH . 'template-parts/' . $name . '.php';
    if (!file_exists($file)) {
        echo '<strong>[template]</strong> <u>' . $name . '</u> <strong>[template]</strong>';
    } else {
        display_content($file);
        // require($file);
    }
}





function the_page_content()
{
    $page = false;
    if (isset($_GET['page'])) {
        $file = ABSPATH . $_GET['page'] . '.php';
        if (file_exists($file)) {
            $page = $file;
        } else {
            $page = ABSPATH . '404.php';
        }
    }
    if ($page === false) {
        $page = ABSPATH . 'home.php';
    }
    display_content($page);
}



function display_content($src)
{
    if (!file_exists($src)) {
        return;
    }
    ob_start();
    require($src);
    $content = ob_get_clean();
    $content = display_repeat_content($content);
    echo $content;
}





function display_repeat_content($content)
{
    $re = "/<!--[\s]*repeat[\s]*(\d+)[\s]*-->(.*?)(!?<!--[\s]*end[\s]*repeat[\s]*-->)/siu";
    return preg_replace_callback($re, 'regex_function_repeat_content', $content);
}




function regex_function_repeat_content($matches)
{
    $total = (int) $matches[1];
    $str = $matches[2];
    $res = '';
    for ($i = 0; $i < $total; $i++) {
        $exclude = $i + 1;
        $newstr = preg_replace("/{[\s]*(?!$exclude)\d*[\s]*}.*?{[\s]*(?!$exclude)\d*[\s]*}/siu", '', $str);
        $newstr = preg_replace("/{[\s]*" . $exclude . "[\s]*}(.*?){[\s]*" . $exclude . "[\s]*}/siu", "$1", $newstr);

        $newstr = preg_replace("/{[\s]*\![\s]*" . $exclude . "[\s]*}.*?{[\s]*\![\s]*" . $exclude . "[\s]*}/siu", '', $newstr);
        $newstr = preg_replace("/{[\s]*\![\s]*\d+[\s]*}(.*?){[\s]*\![\s]*\d+[\s]*}/siu", "$1", $newstr);

        $res .= $newstr;
    }
    return $res;
}

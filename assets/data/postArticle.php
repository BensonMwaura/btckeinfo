<?php
  // Posts articles
  $posts = json_decode(file_get_contents('php://input'));
  $date = $posts->date_posted;
  $title = $posts->title;
  $desc = $posts->desc;
  if(!empty($title) && !empty($date) && !empty($desc)){
    $id = uniqid('ART');
    $posts->id = $id;
    $posted = $posts;
    print_r(json_encode($posted));
  }else {
    echo "No Post Yet";
  }
?>

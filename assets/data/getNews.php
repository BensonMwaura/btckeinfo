<?php
  include("feeds.php");
  // get news feed array
  $data = json_decode($stream, true);
  $news_data = array();
  $news_data = $data['news'];
  $news = json_encode($news_data);
  print_r($news);
?>

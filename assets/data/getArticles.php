<?php
  include("feeds.php");
  // get news articles array
  $data = json_decode($stream, true);
  $article_data = array();
  $article_data = $data['articles'];
  $articles = json_encode($article_data);
  print_r($articles);
?>

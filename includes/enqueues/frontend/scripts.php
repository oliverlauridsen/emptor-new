<?php
/**
 * Register and load any scripts your themes frontend requires.
 */
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script( 'jquery.bxslider-js', get_stylesheet_directory_uri() . '/js/plugins/jquery.bxslider/jquery.bxslider.min.js', array( 'jquery' ) );
    wp_enqueue_script( 'frontend-js', get_stylesheet_directory_uri() . '/js/frontend/modules/main.js', array( 'jquery', 'jquery.bxslider-js' ) );
    wp_enqueue_script( 'bootstrap-js', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js', array( 'jquery.ui-js' ) );
    wp_enqueue_script( 'fontawesome-js', 'https://use.fontawesome.com/a613fcdfbc.js', array( 'bootstrap-js' ) );
});
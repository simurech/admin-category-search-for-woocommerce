<?php
if (!defined('ABSPATH')) {
    exit;
}

class WACS_Category_Search {

    public function __construct() {
        add_action('admin_enqueue_scripts', array($this, 'enqueue_assets'));
    }

    public function enqueue_assets() {
        if (!current_user_can('edit_products')) {
            return;
        }
        $screen = get_current_screen();
        if (!$screen || 'product' !== $screen->id) {
            return;
        }

        wp_enqueue_script(
            'wacs-category-search',
            WACS_PLUGIN_URL . 'assets/admin-category-search.js',
            array('jquery'),
            WACS_VERSION,
            true
        );
        wp_localize_script('wacs-category-search', 'wacsCatSearch', array(
            'placeholder' => __('Search categories…', 'admin-category-search-for-woocommerce'),
            'noResults'   => __('No categories found', 'admin-category-search-for-woocommerce'),
            'ariaLabel'   => __('Search product categories', 'admin-category-search-for-woocommerce'),
        ));

        wp_register_style('wacs-category-search', false, array(), WACS_VERSION);
        wp_enqueue_style('wacs-category-search');
        wp_add_inline_style('wacs-category-search', $this->inline_css());
    }

    private function inline_css() {
        return '.wacs-cat-search{width:100%;box-sizing:border-box;margin:6px 0 4px;padding:4px 6px;border:1px solid #ddd;border-radius:3px;font-size:13px;}'
            . '.wacs-cat-noresults{margin:6px 2px;color:#757575;font-style:italic;}'
            . '.wacs-cat-search-hl{background:#fff8c5;border-radius:2px;}'
            . '.wacs-cat-active{background:#f0f6fc;box-shadow:inset 2px 0 0 #2271b1;border-radius:2px;}';
    }
}

new WACS_Category_Search();

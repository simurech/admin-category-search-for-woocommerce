<?php
if (!defined('ABSPATH')) {
    exit;
}

class WACS_Category_Search {

    const HANDLE = 'wacs-category-search';

    public function __construct() {
        add_action('admin_enqueue_scripts', array($this, 'enqueue_assets'));
    }

    public function enqueue_assets() {
        if (!current_user_can('edit_products')) {
            return;
        }
        $screen = get_current_screen();
        // Produkt-Editor (Metabox) und Produktliste (Quick Edit / Bulk Edit).
        if (!$screen || 'product' !== $screen->post_type || !in_array($screen->base, array('post', 'edit'), true)) {
            return;
        }

        wp_enqueue_script(
            self::HANDLE,
            WACS_PLUGIN_URL . 'assets/admin-category-search.js',
            array('jquery', 'wp-i18n', 'wp-a11y'),
            WACS_VERSION,
            array(
                'in_footer' => true,
                'strategy'  => 'defer',
            )
        );
        wp_set_script_translations(self::HANDLE, 'admin-category-search-for-woocommerce');
        wp_add_inline_script(
            self::HANDLE,
            'window.wacsCatSearch = ' . wp_json_encode(array('taxonomies' => $this->taxonomy_labels())) . ';',
            'before'
        );

        wp_register_style(self::HANDLE, false, array(), WACS_VERSION);
        wp_enqueue_style(self::HANDLE);
        wp_add_inline_style(self::HANDLE, $this->inline_css());
    }

    /**
     * Beschriftungen aller hierarchischen Produkt-Taxonomien (Kategorien,
     * Marken usw.), damit Platzhalter und Hinweise zur jeweiligen Liste passen.
     *
     * @return array<string, array<string, string>>
     */
    private function taxonomy_labels() {
        $labels = array();
        foreach (get_object_taxonomies('product', 'objects') as $taxonomy) {
            if (!$taxonomy->hierarchical || !$taxonomy->show_ui) {
                continue;
            }
            $labels[$taxonomy->name] = array(
                'search'   => wp_strip_all_tags((string) $taxonomy->labels->search_items),
                'notFound' => wp_strip_all_tags((string) $taxonomy->labels->not_found),
            );
        }
        return $labels;
    }

    private function inline_css() {
        return '.wacs-cat-tools{margin:6px 0 4px;}'
            . '.wacs-cat-search{width:100%;box-sizing:border-box;padding:4px 6px;border:1px solid #ddd;border-radius:3px;font-size:13px;}'
            . '.wacs-cat-meta{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:2px 8px;margin-top:4px;font-size:12px;color:#50575e;}'
            . '.wacs-cat-meta label{font-size:12px;white-space:nowrap;}'
            . '.wacs-cat-meta input[type=checkbox]{margin:0 2px 0 0;}'
            . '.wacs-cat-count{white-space:nowrap;}'
            . '.wacs-cat-noresults{margin:6px 2px;color:#757575;font-style:italic;}'
            . '.wacs-cat-search-hl{background:#fff8c5;border-radius:2px;}'
            . '::highlight(wacs-cat-search){background-color:#fff8c5;color:inherit;}'
            . '.wacs-cat-active{background:#f0f6fc;box-shadow:inset 2px 0 0 #2271b1;border-radius:2px;}';
    }
}

new WACS_Category_Search();

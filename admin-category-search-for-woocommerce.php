<?php
/**
 * Plugin Name: Admin Category Search for WooCommerce
 * Plugin URI: https://pulacha-labs.ch/plugins/admin-category-search/
 * Description: Adds a live search field to the product category and brand checklists in the WooCommerce product editor, Quick Edit and Bulk Edit.
 * Version: 2.1.0
 * Author: Pulacha Labs
 * Author URI: https://pulacha-labs.ch/
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: admin-category-search-for-woocommerce
 * Requires at least: 6.6
 * Requires PHP: 7.4
 * Requires Plugins: woocommerce
 * WC requires at least: 8.0
 * WC tested up to: 11.3.1
 *
 * @package WCAdminCategorySearch
 */

if (!defined('ABSPATH')) {
    exit;
}

define('WACS_VERSION', '2.1.0');
define('WACS_PLUGIN_FILE', __FILE__);
define('WACS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('WACS_PLUGIN_URL', plugin_dir_url(__FILE__));

add_action('before_woocommerce_init', function () {
    if (class_exists(\Automattic\WooCommerce\Utilities\FeaturesUtil::class)) {
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', WACS_PLUGIN_FILE, true);
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('cart_checkout_blocks', WACS_PLUGIN_FILE, true);
    }
});

require_once WACS_PLUGIN_DIR . 'includes/class-wacs-category-search.php';

<?php
/**
 * Plugin Name: Admin Category Search for WooCommerce
 * Description: Adds a live search field to the product categories metabox in the WooCommerce product editor.
 * Version: 2.0.0
 * Author: Pulacha Labs
 * Author URI: https://pulacha-labs.ch/
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: admin-category-search-for-woocommerce
 * Requires at least: 6.0
 * Tested up to: 7.0
 * Requires PHP: 7.4
 * Requires Plugins: woocommerce
 * WC tested up to: 10.9.3
 *
 * @package WCAdminCategorySearch
 */

if (!defined('ABSPATH')) {
    exit;
}

define('WACS_VERSION', '2.0.0');
define('WACS_PLUGIN_FILE', __FILE__);
define('WACS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('WACS_PLUGIN_URL', plugin_dir_url(__FILE__));

require_once WACS_PLUGIN_DIR . 'includes/class-wacs-category-search.php';

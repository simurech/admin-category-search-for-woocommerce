=== Admin Category Search for WooCommerce ===
Contributors: simon61
Tags: woocommerce, categories, admin, search, products
Requires at least: 6.0
Tested up to: 7.1
Requires PHP: 8.3
WC tested up to: 11.3.1
Stable tag: 2.0.4
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Adds a live search field to the product categories metabox in the WooCommerce product editor.

== Description ==

Scrolling through a hundred product categories to find the right checkbox gets old fast. Admin Category Search for WooCommerce adds a live search field to the **product categories metabox** in the WooCommerce product editor — start typing and the list filters in real time.

**Features**

* Live search directly in the categories metabox — filters the checkbox list as you type
* Highlights the matched search term inside category names
* Accent-insensitive matching — "musli" also finds "Müsli", "creme" also finds "Crème"
* Keyboard navigation — use up/down arrows to move through matches, Enter toggles the checkbox
* Shows a "no results" message when nothing matches
* Escape clears the search field; input is debounced so filtering stays smooth with many categories
* Accessible via an `aria-label` on the search field
* Purely client-side (JavaScript) — no extra AJAX requests or database queries
* Works with the default category checklist of the product editor (`categorychecklist`)
* Detects metaboxes that are loaded later via `MutationObserver`

Requires WooCommerce to be active.

**Note:** the plugin enhances the classic categories metabox (`.categorydiv`). The newer, React-based WooCommerce product editor does not use this metabox, so the search is currently not available there.

== Installation ==

1. Go to **Plugins → Add New** in your WordPress admin and search for "Admin Category Search for WooCommerce".
2. Install and activate the plugin.
3. Alternatively, upload the plugin folder to `wp-content/plugins/` and activate it from the Plugins screen.

== Frequently Asked Questions ==

= Does this work with the new WooCommerce product editor? =

No. The plugin enhances the classic categories metabox (`.categorydiv`) used by the classic product editor. The new React-based product editor does not use this metabox.

= Does this add any database queries or AJAX requests? =

No. Filtering happens entirely client-side in JavaScript against the categories already rendered in the metabox.

= Is WooCommerce required? =

Yes, WooCommerce must be installed and active.

= Is this plugin compatible with High-Performance Order Storage (HPOS)? =

Yes. The plugin only touches the product categories metabox and stores no order data, so it is unaffected by HPOS.

= Is there a Pro version with more features? =

No, this plugin is free and does one thing well. There are no paid upgrades or premium add-ons.

== Screenshots ==

1. Live search field above the product categories checklist.

== Changelog ==

= 2.0.4 =
* PHP-Mindestversion auf 8.3 angehoben (ältere PHP-Versionen erhalten keine Sicherheitsupdates mehr), mit WooCommerce 11.3 getestet

= 2.0.3 =
* Kompatibilität mit WordPress 7.1 bestätigt

= 2.0.2 =
* Release-Paket enthält jetzt ein sauberes, direkt einreichbares ZIP

= 2.0.1 =
* Declared compatibility with WooCommerce High-Performance Order Storage and Cart/Checkout Blocks
* Updated author information

= 2.0.0 =
* Renamed the plugin to "Admin Category Search for WooCommerce" for wordpress.org submission
* Removed the bundled update checker; updates are now handled via wordpress.org
* Switched license to GPLv2 or later

= 1.2.0 =
* Accent-insensitive search and keyboard navigation

= 1.1.1 =
* Subcategories stay visible when only the child category matches

= 1.1.0 =
* Search term highlighting, Escape-to-reset, input debounce, accessibility and hardening improvements

= 1.0.1 =
* Internal update-checker path fix

= 1.0.0 =
* Initial release

== Upgrade Notice ==

= 2.0.4 =
Requires PHP 8.3 or higher. Sites on older PHP versions keep the current version until PHP is updated.

= 2.0.0 =
Plugin renamed and moved to wordpress.org-only updates. If you previously received updates via GitHub, reinstall from wordpress.org to keep receiving updates.

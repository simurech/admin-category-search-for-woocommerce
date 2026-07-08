=== Admin Category Search for WooCommerce ===
Contributors: simon61
Tags: woocommerce, categories, admin, search, products
Requires at least: 6.0
Tested up to: 7.0
Requires PHP: 8.0
WC tested up to: 10.9.3
Stable tag: 2.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Adds a live search field to the product categories metabox in the WooCommerce product editor.

== Description ==

Admin Category Search for WooCommerce adds a live search field to the **product categories metabox** in the WooCommerce product editor. Instead of endlessly scrolling through a long category list, just start typing and the list filters in real time.

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

== Screenshots ==

1. Live search field above the product categories checklist.

== Changelog ==

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

= 2.0.0 =
Plugin renamed and moved to wordpress.org-only updates. If you previously received updates via GitHub, reinstall from wordpress.org to keep receiving updates.

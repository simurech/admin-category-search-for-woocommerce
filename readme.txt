=== Admin Category Search for WooCommerce ===
Contributors: simon61
Tags: woocommerce, categories, brands, admin, search
Requires at least: 6.6
Tested up to: 7.1
Requires PHP: 7.4
WC requires at least: 8.0
WC tested up to: 11.3.1
Stable tag: 2.1.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Live search for the product category and brand checklists in the WooCommerce product editor, Quick Edit and Bulk Edit.

== Description ==

Scrolling through a hundred product categories to find the right checkbox gets old fast. Admin Category Search for WooCommerce adds a live search field to the **product categories metabox** in the WooCommerce product editor — start typing and the list filters in real time. The same search is available for **brands**, in **Quick Edit** and in **Bulk Edit** on the products list.

**Features**

* Live search in the categories metabox — filters the checkbox list as you type
* Works in Quick Edit and Bulk Edit on the products list, too
* Supports brands and every other hierarchical product taxonomy, with matching placeholders ("Search brands…")
* "Show selected only" toggle plus a live count of selected items
* Highlights the matched search term inside category names
* Accent-insensitive matching — "musli" also finds "Müsli", "creme" also finds "Crème"
* Parent categories stay visible when only a subcategory matches, so the hierarchy is never lost
* Keyboard navigation — use up/down arrows to move through matches, Enter toggles the checkbox (without submitting the form or saving Quick Edit)
* Escape clears the search field; in Quick Edit a second Escape closes the editor as usual
* Screen reader friendly: result counts are announced, the field has a proper label
* Fast with thousands of categories: a pre-built search index and the CSS Custom Highlight API keep filtering smooth
* Newly added categories ("+ Add new category") are picked up automatically
* Purely client-side — no extra AJAX requests, no database queries, no settings

Requires WooCommerce to be active.

**Note:** the plugin enhances the classic checklists (`.categorydiv`, Quick Edit and Bulk Edit). The React-based WooCommerce product editor does not use these checklists, so the search is not available there.

== Installation ==

1. Go to **Plugins → Add New** in your WordPress admin and search for "Admin Category Search for WooCommerce".
2. Install and activate the plugin.
3. Alternatively, upload the plugin folder to `wp-content/plugins/` and activate it from the Plugins screen.

There is nothing to configure — the search field appears automatically above the category and brand checklists.

== Frequently Asked Questions ==

= Does this work in Quick Edit and Bulk Edit? =

Yes. Since version 2.1.0 the search field is also shown above the category and brand checklists in Quick Edit and Bulk Edit on the products list.

= Does it work with brands and custom taxonomies? =

Yes. Every hierarchical taxonomy attached to products — WooCommerce brands, product categories and hierarchical taxonomies added by other plugins — gets its own search field with a matching placeholder.

= Does this work with the new WooCommerce product editor? =

No. The plugin enhances the classic checklists used by the classic product editor and the products list. The React-based product editor does not use them.

= Does this add any database queries or AJAX requests? =

No. Filtering happens entirely client-side in JavaScript against the items already rendered on the page.

= Is WooCommerce required? =

Yes, WooCommerce must be installed and active.

= Is this plugin compatible with High-Performance Order Storage (HPOS)? =

Yes. The plugin only touches product category and brand checklists and stores no order data, so it is unaffected by HPOS.

= Is there a Pro version with more features? =

No, this plugin is free and does one thing well. There are no paid upgrades or premium add-ons.

== Screenshots ==

1. Live search above the product categories checklist — matches are highlighted, parent categories stay visible.
2. The same search in Quick Edit on the products list.
3. Brands get their own search field; "Show selected only" hides everything that is not ticked.

== Changelog ==

= 2.1.0 =
* New: search field in Quick Edit and Bulk Edit on the products list
* New: support for brands and all other hierarchical product taxonomies, with matching placeholders and messages
* New: "Show selected only" toggle and a live count of selected items
* Improved: much faster filtering for large category trees (pre-built search index, CSS Custom Highlight API)
* Improved: result counts are announced to screen readers
* Fixed: Enter now toggles the first actual match instead of a parent category that is only shown for context
* Fixed: categories added via "+ Add new category" are now searchable and highlighted
* Fixed: Enter and Escape in the search field no longer save or close Quick Edit unintentionally
* Fixed: keyboard shortcuts no longer interfere with input method (IME) composition
* Lowered the minimum requirements to PHP 7.4 and WordPress 6.6

= 2.0.4 =
* Raised the minimum PHP version to 8.3, tested with WooCommerce 11.3

= 2.0.3 =
* Confirmed compatibility with WordPress 7.1

= 2.0.2 =
* The release package now contains a clean, ready-to-submit ZIP

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

= 2.1.0 =
Search in Quick Edit, Bulk Edit and for brands, plus a "Show selected only" filter. Minimum requirements lowered to PHP 7.4 and WordPress 6.6.

= 2.0.0 =
Plugin renamed and moved to wordpress.org-only updates. If you previously received updates via GitHub, reinstall from wordpress.org to keep receiving updates.

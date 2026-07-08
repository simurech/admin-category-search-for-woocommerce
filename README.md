# Admin Category Search for WooCommerce

Fügt ein Live-Suchfeld in die **Produktkategorien-Metabox** des WooCommerce-Produkt-Editors ein. Statt bei vielen Kategorien endlos zu scrollen, tippst du einfach los und die Liste filtert sich in Echtzeit.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue)
![PHP](https://img.shields.io/badge/PHP-8.0%2B-blue)

## Funktionen

- 🔍 **Live-Suche** direkt in der Kategorien-Metabox – filtert die Checkbox-Liste während des Tippens
- ✨ **Trefferhervorhebung** des Suchbegriffs in den Kategorienamen
- 🔤 **Umlaut-/Akzent-tolerant** – „musli" findet „Müsli", „creme" findet „Crème"
- ⬆️⬇️ **Tastatur-Navigation** – mit `↑`/`↓` durch die Treffer, `Enter` setzt das Häkchen
- 🚫 **„Keine Treffer"-Hinweis**, wenn nichts passt
- ⌨️ **`Esc`** leert das Suchfeld, **Debounce** hält die Liste auch bei vielen Kategorien flüssig
- ♿ Barrierefrei dank `aria-label` am Suchfeld
- ⚡ Rein clientseitig (JavaScript), keine zusätzlichen AJAX-Anfragen oder Datenbankabfragen
- 🧩 Funktioniert mit der Standard-Kategorienliste des Produkt-Editors (`categorychecklist`)
- 🔄 Erkennt nachträglich geladene Metaboxen per `MutationObserver`
- 🌐 Übersetzbar (Text Domain: `admin-category-search-for-woocommerce`)

## Voraussetzungen

| Anforderung      | Version       |
|------------------|---------------|
| WordPress        | 6.0 oder höher |
| PHP              | 8.0 oder höher |
| WooCommerce      | aktiv erforderlich |

Getestet bis WordPress 7.0 und WooCommerce 10.9.3.

## Installation

Das Plugin ist für die Einreichung im wordpress.org-Plugin-Verzeichnis vorbereitet, aber
noch nicht freigegeben. Bis dahin:

1. Lade den Code aus diesem Repository herunter (ZIP oder `git clone`).
2. Kopiere den Ordner nach `wp-content/plugins/admin-category-search-for-woocommerce`.
3. Aktiviere das Plugin im WordPress-Backend unter **Plugins**.

Nach erfolgter Freigabe wird die Installation direkt über **Plugins → Installieren** im
WordPress-Backend möglich sein.

## Verwendung

Nach der Aktivierung erscheint im Produkt-Editor (**Produkte → Neu / Bearbeiten**) oberhalb der Produktkategorien-Liste ein Suchfeld mit dem Platzhalter „Search categories…“.

- Beim Tippen werden nur passende Kategorien im Tab **„Alle”** angezeigt, der Treffer wird hervorgehoben.
- Die Suche ignoriert Gross-/Kleinschreibung sowie Umlaute und Akzente.
- Mit **`↑`/`↓`** navigierst du durch die Treffer, **`Enter`** setzt bzw. entfernt das Häkchen der aktiven Kategorie.
- Mit **`Esc`** oder durch Leeren des Felds kehrt die Liste in den Ausgangszustand mit aktiven Tabs zurück.

> **Hinweis:** Das Plugin erweitert die klassische Kategorien-Metabox (`.categorydiv`). Der neue, React-basierte WooCommerce-Produkt-Editor verwendet diese Metabox nicht – dort steht die Suche derzeit nicht zur Verfügung.

## Entwicklung

```
admin-category-search-for-woocommerce.php   # Plugin-Header, Konstanten
includes/
  └── class-wacs-category-search.php        # Lädt Assets im Produkt-/Post-Editor
assets/
  └── admin-category-search.js              # Live-Such-Logik (jQuery)
readme.txt                                  # wordpress.org-Plugin-Beschreibung
```

Eine neue Version veröffentlichst du, indem du die `Version` im Plugin-Header, die Konstante `WACS_VERSION` und den `Stable tag` in `readme.txt` erhöhst.

## Lizenz

GPLv2 oder später – siehe [gnu.org/licenses/gpl-2.0.html](https://www.gnu.org/licenses/gpl-2.0.html).

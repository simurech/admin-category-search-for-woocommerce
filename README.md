# Admin Category Search for WooCommerce

**Live-Suche in der Produktkategorien-Metabox des WooCommerce-Produkt-Editors.**

[![Stable Tag](https://img.shields.io/badge/stable-2.0.1-blue.svg)](https://github.com/simurech/admin-category-search-for-woocommerce/releases)
[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-21759b.svg)](https://wordpress.org/)
[![WooCommerce](https://img.shields.io/badge/WooCommerce-8.0%2B-96588a.svg)](https://woocommerce.com/)
[![PHP](https://img.shields.io/badge/PHP-7.4%2B-8892be.svg)](https://php.net/)
[![Lizenz](https://img.shields.io/badge/Lizenz-GPL--2.0--or--later-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

> Statt bei vielen Kategorien endlos zu scrollen, tippst du einfach los: Das Suchfeld filtert die Checkbox-Liste in Echtzeit, hebt Treffer hervor und ist per Tastatur bedienbar.

**→ Plugin auf WordPress.org (in Vorbereitung)** — Einreichung ist vorbereitet, aber noch nicht freigegeben.

---

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

> **Hinweis:** Das Plugin erweitert die klassische Kategorien-Metabox (`.categorydiv`). Der neue, React-basierte WooCommerce-Produkt-Editor verwendet diese Metabox nicht – dort steht die Suche derzeit nicht zur Verfügung.

---

## Systemanforderungen

| Komponente | Minimum | Getestet bis |
|---|---|---|
| WordPress | 6.0 | 7.0 |
| WooCommerce | aktiv erforderlich | 10.9.3 |
| PHP | 7.4 | – |

---

## Installation

Das Plugin ist für die Einreichung im wordpress.org-Plugin-Verzeichnis vorbereitet, aber noch nicht freigegeben. Bis dahin:

1. Den Code aus diesem Repository herunterladen (ZIP oder `git clone`).
2. Den Ordner nach `wp-content/plugins/admin-category-search-for-woocommerce` kopieren.
3. Das Plugin im WordPress-Backend unter **Plugins** aktivieren.

Nach erfolgter Freigabe wird die Installation direkt über **Plugins → Installieren** im WordPress-Backend möglich sein.

---

## Verwendung

Nach der Aktivierung erscheint im Produkt-Editor (**Produkte → Neu / Bearbeiten**) oberhalb der Produktkategorien-Liste ein Suchfeld mit dem Platzhalter „Search categories…".

- Beim Tippen werden nur passende Kategorien im Tab **„Alle"** angezeigt, der Treffer wird hervorgehoben.
- Die Suche ignoriert Gross-/Kleinschreibung sowie Umlaute und Akzente.
- Mit **`↑`/`↓`** navigierst du durch die Treffer, **`Enter`** setzt bzw. entfernt das Häkchen der aktiven Kategorie.
- Mit **`Esc`** oder durch Leeren des Felds kehrt die Liste in den Ausgangszustand mit aktiven Tabs zurück.

---

## Architektur

```
admin-category-search-for-woocommerce/
├── admin-category-search-for-woocommerce.php   # Plugin-Header, Konstanten
├── includes/
│   └── class-wacs-category-search.php          # Lädt Assets im Produkt-/Post-Editor
├── assets/
│   └── admin-category-search.js                # Live-Such-Logik (jQuery)
└── readme.txt                                  # wordpress.org-Plugin-Beschreibung
```

Eine neue Version veröffentlichst du, indem du die `Version` im Plugin-Header, die Konstante `WACS_VERSION` und den `Stable tag` in `readme.txt` erhöhst.

---

## Lizenz

GPL-2.0-or-later – siehe [gnu.org/licenses/gpl-2.0.html](https://www.gnu.org/licenses/gpl-2.0.html).

**Autor:** Pulacha Labs — [@simurech](https://github.com/simurech)

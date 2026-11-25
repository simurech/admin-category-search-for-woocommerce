# Admin Category Search for WooCommerce

**Live-Suche für Produktkategorien und Marken – im Produkt-Editor, in Quick Edit und in Bulk Edit.**

[![Stable Tag](https://img.shields.io/badge/stable-2.1.0-blue.svg)](https://github.com/simurech/admin-category-search-for-woocommerce/releases)
[![WordPress](https://img.shields.io/badge/WordPress-6.6%2B-21759b.svg)](https://wordpress.org/)
[![WooCommerce](https://img.shields.io/badge/WooCommerce-8.0%2B-96588a.svg)](https://woocommerce.com/)
[![PHP](https://img.shields.io/badge/PHP-7.4%2B-8892be.svg)](https://php.net/)
[![Lizenz](https://img.shields.io/badge/Lizenz-GPL--2.0--or--later-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

> Statt bei vielen Kategorien endlos zu scrollen, tippst du einfach los: Das Suchfeld filtert die Checkbox-Liste in Echtzeit, hebt Treffer hervor und ist per Tastatur bedienbar.

**→ Plugin auf WordPress.org (in Vorbereitung)** — Einreichung ist vorbereitet, aber noch nicht freigegeben.

---

## Funktionen

- 🔍 **Live-Suche** direkt in der Kategorien-Metabox – filtert die Checkbox-Liste während des Tippens
- ⚡ **Quick Edit & Bulk Edit** – dieselbe Suche auch in der Produktliste
- 🏷️ **Marken & weitere Taxonomien** – jede hierarchische Produkt-Taxonomie erhält ein eigenes Suchfeld mit passendem Platzhalter („Nach Marken suchen…“)
- ☑️ **„Nur ausgewählte“** – blendet alles aus, was nicht angehakt ist, inkl. Zähler der gewählten Einträge
- ✨ **Trefferhervorhebung** des Suchbegriffs in den Namen
- 🔤 **Umlaut-/Akzent-tolerant** – „musli“ findet „Müsli“, „creme“ findet „Crème“
- 🌳 **Hierarchie bleibt erhalten** – Oberkategorien bleiben sichtbar, wenn nur eine Unterkategorie passt
- ⬆️⬇️ **Tastatur-Navigation** – mit `↑`/`↓` durch die Treffer, `Enter` setzt das Häkchen (ohne das Formular abzusenden oder Quick Edit zu speichern)
- ⌨️ **`Esc`** leert das Suchfeld; in Quick Edit schliesst ein zweites `Esc` den Editor wie gewohnt
- ♿ **Barrierefrei** – Trefferzahl wird Screenreadern angesagt, Suchfeld mit Label
- 🚀 **Schnell auch bei tausenden Kategorien** – Suchindex und CSS Custom Highlight API statt DOM-Umbau
- 🔄 Neu angelegte Kategorien („+ Neue Kategorie hinzufügen“) werden automatisch erfasst
- 🪶 Rein clientseitig – keine AJAX-Anfragen, keine Datenbankabfragen, keine Einstellungen
- 🌐 Übersetzbar (Text Domain: `admin-category-search-for-woocommerce`)

> **Hinweis:** Das Plugin erweitert die klassischen Checklisten (`.categorydiv`, Quick Edit, Bulk Edit). Der React-basierte WooCommerce-Produkt-Editor verwendet diese nicht – dort steht die Suche nicht zur Verfügung.

---

## Systemanforderungen

| Komponente | Minimum | Getestet bis |
|---|---|---|
| WordPress | 6.6 | 7.1 |
| WooCommerce | 8.0 | 11.3.1 |
| PHP | 7.4 | 8.5 |

---

## Installation

Das Plugin ist für die Einreichung im wordpress.org-Plugin-Verzeichnis vorbereitet, aber noch nicht freigegeben. Bis dahin:

1. Das ZIP des aktuellen [Releases](https://github.com/simurech/admin-category-search-for-woocommerce/releases/latest) herunterladen.
2. Im WordPress-Backend unter **Plugins → Installieren → Plugin hochladen** installieren.
3. Das Plugin aktivieren.

Nach erfolgter Freigabe wird die Installation direkt über **Plugins → Installieren** im WordPress-Backend möglich sein.

---

## Verwendung

Nach der Aktivierung erscheint automatisch ein Suchfeld:

- im Produkt-Editor (**Produkte → Neu / Bearbeiten**) über der Kategorien- und der Marken-Liste,
- in der Produktliste beim **Quick Edit** und beim **Bulk Edit**.

Bedienung:

- Beim Tippen werden nur passende Einträge angezeigt, der Treffer wird hervorgehoben.
- Die Suche ignoriert Gross-/Kleinschreibung sowie Umlaute und Akzente.
- **„Show selected only“** zeigt nur angehakte Einträge – kombinierbar mit der Suche.
- Mit **`↑`/`↓`** navigierst du durch die Treffer, **`Enter`** setzt bzw. entfernt das Häkchen.
- Mit **`Esc`** oder durch Leeren des Felds kehrt die Liste in den Ausgangszustand zurück.

---

## Architektur

```
admin-category-search-for-woocommerce/
├── admin-category-search-for-woocommerce.php   # Plugin-Header, Konstanten, WooCommerce-Kompatibilität
├── includes/
│   └── class-wacs-category-search.php          # Lädt Assets im Produkt-Editor und in der Produktliste
├── assets/
│   └── admin-category-search.js                # Such-Logik (Index, Filter, Tastatur, Quick/Bulk Edit)
├── readme.txt                                  # wordpress.org-Plugin-Beschreibung
└── .wordpress-org/                             # Icon, Banner, Screenshots fürs WP.org-Verzeichnis (nicht im ZIP)
```

### Release

Eine neue Version veröffentlichst du, indem du folgende Stellen synchron erhöhst und auf `main` pushst:

- `Version` im Plugin-Header und die Konstante `WACS_VERSION`
- `Stable tag` und Changelog in `readme.txt`
- Versions-Badge in dieser `README.md`

Der Workflow **Auto Release** erstellt daraufhin Tag, GitHub-Release (Notizen aus dem Changelog) und ein sauberes Distributions-ZIP.

---

## Lizenz

GPL-2.0-or-later – siehe [gnu.org/licenses/gpl-2.0.html](https://www.gnu.org/licenses/gpl-2.0.html).

**Autor:** Pulacha Labs — [@simurech](https://github.com/simurech)

jQuery(function ($) {
    var cfg = window.wacsCatSearch || {};
    var taxLabels = cfg.taxonomies || {};
    var i18n = window.wp && window.wp.i18n;
    var __ = i18n ? i18n.__ : function (s) { return s; };
    var _n = i18n ? i18n._n : function (s, p, n) { return n === 1 ? s : p; };
    var sprintf = i18n ? i18n.sprintf : function (s, n) { return s.replace('%d', n); };
    var speak = (window.wp && window.wp.a11y && window.wp.a11y.speak) ? window.wp.a11y.speak : function () {};

    var canNormalize = (typeof ''.normalize === 'function');
    var listCounter = 0;

    // Vergleichsform: Kleinbuchstaben und – falls verfügbar – ohne
    // Akzente/Umlaute (NFD-Zerlegung, kombinierende Zeichen entfernt),
    // damit "musli" auch "Müsli" und "creme" auch "Crème" findet.
    function fold(str) {
        var f = str.toLowerCase();
        if (canNormalize) {
            f = f.normalize('NFD').replace(/[̀-ͯ]/g, '');
        }
        return f;
    }

    // Wie fold(), liefert aber zusätzlich eine Zuordnung jeder Position in
    // der gefalteten Zeichenkette zum Index im Originaltext. Nötig, um die
    // Hervorhebung trotz möglicher Längenänderung korrekt zu platzieren.
    function foldWithMap(str) {
        var folded = '';
        var map = [];
        for (var i = 0; i < str.length; i++) {
            var ch = str.charAt(i).toLowerCase();
            if (canNormalize) {
                ch = ch.normalize('NFD').replace(/[̀-ͯ]/g, '');
            }
            for (var j = 0; j < ch.length; j++) {
                folded += ch.charAt(j);
                map.push(i);
            }
        }
        return { folded: folded, map: map };
    }

    // Bezeichnung eines <label> einmalig in ein <span> packen, damit die
    // Trefferhervorhebung die Checkbox unangetastet lässt.
    function wrapLabel(label) {
        var existing = label.querySelector('.wacs-cat-label');
        if (existing) {
            return existing;
        }
        var textNode = null;
        for (var n = label.firstChild; n; n = n.nextSibling) {
            if (n.nodeType === 3 && String(n.nodeValue).trim() !== '') {
                textNode = n;
            }
        }
        if (!textNode) {
            return null;
        }
        var span = document.createElement('span');
        span.className = 'wacs-cat-label';
        span.textContent = textNode.nodeValue;
        label.replaceChild(span, textNode);
        return span;
    }

    // CSS Custom Highlight API: markiert Treffer ohne DOM-Änderungen und ist
    // damit bei vielen Einträgen deutlich schneller. Ältere Browser erhalten
    // als Fallback ein <span> um den Treffer.
    var hlRegistry = null;
    if (window.CSS && CSS.highlights && typeof window.Highlight === 'function' && typeof document.createRange === 'function') {
        hlRegistry = CSS.highlights.get('wacs-cat-search') || new window.Highlight();
        CSS.highlights.set('wacs-cat-search', hlRegistry);
    }

    // Trefferposition im Originaltext. q ist bereits gefaltet.
    function matchRange(entry, q) {
        var raw = entry.raw;
        if (entry.folded.length === raw.length) {
            // Häufigster Fall: Die Faltung ändert die Länge nicht, Positionen
            // stimmen 1:1 überein – keine zeichenweise Zuordnung nötig.
            var s = entry.folded.indexOf(q);
            return s < 0 ? null : [s, s + q.length];
        }
        var fm = foldWithMap(raw);
        var idx = fm.folded.indexOf(q);
        if (idx < 0) {
            return null;
        }
        var end = (idx + q.length < fm.map.length) ? fm.map[idx + q.length] : raw.length;
        return [fm.map[idx], end];
    }

    function clearHighlight(entry) {
        if (entry.range) {
            hlRegistry.delete(entry.range);
            entry.range = null;
        }
    }

    // Setzt bzw. entfernt die Hervorhebung – ausschliesslich über Ranges bzw.
    // Textknoten, daher kein HTML-Injection-Risiko.
    function setHighlight(entry, q) {
        var span = entry.span;
        var raw = entry.raw;
        var pos = q ? matchRange(entry, q) : null;

        if (hlRegistry) {
            clearHighlight(entry);
            var text = span.firstChild;
            if (pos && text && text.nodeType === 3 && text.nodeValue === raw) {
                var range = document.createRange();
                range.setStart(text, pos[0]);
                range.setEnd(text, pos[1]);
                hlRegistry.add(range);
                entry.range = range;
            }
            return;
        }

        if (!pos) {
            span.textContent = raw;
            return;
        }
        var start = pos[0];
        var end = pos[1];
        var hl = document.createElement('span');
        hl.className = 'wacs-cat-search-hl';
        hl.textContent = raw.slice(start, end);
        span.textContent = '';
        span.appendChild(document.createTextNode(raw.slice(0, start)));
        span.appendChild(hl);
        span.appendChild(document.createTextNode(raw.slice(end)));
    }

    function childrenByTag(el, tag) {
        var out = [];
        for (var c = el.firstElementChild; c; c = c.nextElementSibling) {
            if (c.tagName === tag) {
                out.push(c);
            }
        }
        return out;
    }

    function taxonomyFromList(list) {
        var classes = (list.className || '').split(/\s+/);
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] !== 'cat-checklist' && /-checklist$/.test(classes[i])) {
                return classes[i].replace(/-checklist$/, '');
            }
        }
        return '';
    }

    /**
     * Eine Suchinstanz für eine Checkliste.
     *
     * opts.root      – das <ul> mit den Einträgen
     * opts.taxonomy  – Taxonomie-Slug (für passende Beschriftungen)
     * opts.insert    – function($tools): fügt die Bedienelemente ein
     * opts.box       – optional: .categorydiv der Metabox (Tabs "Alle"/"Häufig")
     */
    function CatSearch(opts) {
        var self = this;
        var labels = taxLabels[opts.taxonomy] || {};

        this.root = opts.root;
        this.$box = opts.box ? $(opts.box) : null;
        this.entries = [];
        this.dirty = true;
        this.wasActive = false;
        this.activeIdx = -1;
        this.timer = null;
        this.escHandled = false;
        this.noResultsText = labels.notFound || __('No matches found.', 'admin-category-search-for-woocommerce');
        this.noSelectedText = __('No items selected.', 'admin-category-search-for-woocommerce');

        if (!this.root.id) {
            listCounter++;
            this.root.id = 'wacs-list-' + listCounter;
        }

        var searchLabel = labels.search || __('Search', 'admin-category-search-for-woocommerce');

        this.$input = $('<input>')
            .attr({
                type: 'search',
                placeholder: searchLabel + '…',
                'aria-label': searchLabel,
                'aria-controls': this.root.id,
                autocomplete: 'off'
            })
            .addClass('wacs-cat-search');

        this.$selOnly = $('<input type="checkbox" class="wacs-cat-selonly">');
        this.$count = $('<span class="wacs-cat-count"></span>');
        var $selLabel = $('<label class="wacs-cat-selonly-label"></label>')
            .append(this.$selOnly)
            .append(document.createTextNode(' ' + __('Show selected only', 'admin-category-search-for-woocommerce')));

        this.$tools = $('<div class="wacs-cat-tools"></div>')
            .append(this.$input)
            .append($('<div class="wacs-cat-meta"></div>').append($selLabel).append(this.$count));

        this.$noResults = $('<p class="wacs-cat-noresults"></p>').hide();
        $(this.root).after(this.$noResults);
        opts.insert(this.$tools);

        this.$input.on('input', function () {
            clearTimeout(self.timer);
            self.timer = setTimeout(function () {
                self.timer = null;
                self.run();
            }, 120);
        });
        this.$input.on('keydown', function (e) { self.onKeydown(e); });
        this.$input.on('keyup', function (e) {
            // Esc, das nur das Suchfeld geleert hat, soll Quick Edit nicht schliessen.
            if ((e.key === 'Escape' || e.keyCode === 27) && self.escHandled) {
                self.escHandled = false;
                e.stopPropagation();
            }
        });
        this.$selOnly.on('change', function () { self.run(); });
        $(this.root).on('change', 'input[type="checkbox"], input[type="radio"]', function () { self.updateCount(); });

        // Neu hinzugefügte Einträge (z. B. über "+ Neue Kategorie erstellen")
        // erkennen und den Index neu aufbauen.
        if (window.MutationObserver) {
            new MutationObserver(function (records) {
                for (var r = 0; r < records.length; r++) {
                    if (touchesItems(records[r].addedNodes) || touchesItems(records[r].removedNodes)) {
                        self.dirty = true;
                        self.filter(false);
                        self.updateCount();
                        return;
                    }
                }
            }).observe(this.root, { childList: true, subtree: true });
        }

        $(this.root).data('wacsCatSearch', this);
        this.updateCount();
    }

    function touchesItems(nodes) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeType === 1 && (nodes[i].tagName === 'LI' || nodes[i].tagName === 'UL')) {
                return true;
            }
        }
        return false;
    }

    // Index aufbauen: pro Eintrag die gefaltete Bezeichnung und der Index des
    // übergeordneten Eintrags. Einträge liegen in Dokumentreihenfolge, Kinder
    // also immer hinter ihrem Elternteil.
    CatSearch.prototype.rebuild = function () {
        if (hlRegistry) {
            for (var o = 0; o < this.entries.length; o++) {
                clearHighlight(this.entries[o]);
            }
        }
        var entries = [];
        function walk(ul, parent) {
            var items = childrenByTag(ul, 'LI');
            for (var i = 0; i < items.length; i++) {
                var li = items[i];
                var label = childrenByTag(li, 'LABEL')[0] || null;
                var span = label ? wrapLabel(label) : null;
                var raw = span ? span.textContent : (label ? label.textContent : '');
                var idx = entries.length;
                entries.push({
                    li: li,
                    label: label,
                    span: span,
                    cb: label ? label.querySelector('input[type="checkbox"], input[type="radio"]') : null,
                    raw: raw,
                    folded: fold(raw),
                    parent: parent,
                    vis: null,
                    hl: null,
                    range: null
                });
                var subs = childrenByTag(li, 'UL');
                for (var s = 0; s < subs.length; s++) {
                    walk(subs[s], idx);
                }
            }
        }
        walk(this.root, -1);
        this.entries = entries;
        this.dirty = false;
    };

    CatSearch.prototype.run = function () {
        this.activeIdx = -1;
        this.clearActive();
        this.filter(true);
    };

    // Sichtbarkeit in einem einzigen Durchlauf von hinten nach vorn: Ein
    // Eintrag bleibt sichtbar, wenn er selbst passt oder ein Nachfahre passt.
    // DOM-Änderungen nur dort, wo sich der Zustand tatsächlich ändert.
    CatSearch.prototype.filter = function (announce) {
        if (this.dirty) {
            this.rebuild();
        }
        var q = fold((this.$input.val() || '').trim());
        var selOnly = this.$selOnly.prop('checked');
        var active = !!q || selOnly;
        var entries = this.entries;
        var n = entries.length;
        var descVisible = new Array(n);
        var matches = 0;

        for (var i = n - 1; i >= 0; i--) {
            var e = entries[i];
            var textHit = q ? e.folded.indexOf(q) >= 0 : false;
            var pass = (!q || textHit) && (!selOnly || !!(e.cb && e.cb.checked));
            var vis = !active || pass || !!descVisible[i];
            if (vis !== e.vis) {
                e.li.style.display = vis ? '' : 'none';
                e.vis = vis;
            }
            // Nur echte Treffer sind per Tastatur anwählbar; Oberkategorien,
            // die bloss zur Orientierung sichtbar bleiben, nicht.
            e.pass = !active || pass;
            if (vis && e.parent >= 0) {
                descVisible[e.parent] = true;
            }
            if (active && pass) {
                matches++;
            }
            // Hervorhebung nur bei sichtbaren Einträgen aktualisieren; versteckte
            // werden nachgezogen, sobald sie wieder sichtbar sind.
            if (e.span && vis) {
                var want = textHit ? q : '';
                // Ranges kollabieren, wenn die Metabox im DOM verschoben wird
                // (z. B. per Drag & Drop) – dann neu setzen.
                if (want !== e.hl || (e.range && e.range.collapsed)) {
                    setHighlight(e, want);
                    e.hl = want;
                }
            }
        }

        this.syncPanels(active);

        var empty = active && matches === 0;
        var emptyText = q ? this.noResultsText : this.noSelectedText;
        this.$noResults.text(emptyText).toggle(empty);

        if (announce) {
            if (empty) {
                speak(emptyText);
            } else if (active) {
                /* translators: %d: number of matching items */
                speak(sprintf(_n('%d result found.', '%d results found.', matches, 'admin-category-search-for-woocommerce'), matches));
            }
        }
    };

    // Metabox: Während der Suche den Tab "Alle" zeigen, danach den zuvor
    // aktiven Tab wiederherstellen.
    CatSearch.prototype.syncPanels = function (active) {
        if (!this.$box || active === this.wasActive) {
            return;
        }
        this.wasActive = active;
        var $box = this.$box;
        if (active) {
            $box.find('.tabs-panel[id$="-pop"]').hide();
            $box.find('.tabs-panel[id$="-all"]').show();
        } else {
            $box.find('.tabs-panel').each(function () {
                var panelId = $(this).attr('id');
                var isActive = $box.find('.category-tabs a[href="#' + panelId + '"]').parent().hasClass('tabs');
                $(this).toggle(isActive);
            });
        }
    };

    CatSearch.prototype.updateCount = function () {
        var count = $(this.root).find('input[type="checkbox"]:checked, input[type="radio"]:checked').length;
        /* translators: %d: number of selected items */
        this.$count.text(sprintf(_n('%d selected', '%d selected', count, 'admin-category-search-for-woocommerce'), count));
    };

    CatSearch.prototype.reset = function () {
        clearTimeout(this.timer);
        this.timer = null;
        this.$input.val('');
        this.$selOnly.prop('checked', false);
        this.run();
        this.updateCount();
    };

    CatSearch.prototype.navigable = function () {
        if (!this.root.offsetParent) {
            return [];
        }
        var out = [];
        for (var i = 0; i < this.entries.length; i++) {
            if (this.entries[i].vis !== false && this.entries[i].pass !== false && this.entries[i].label) {
                out.push(this.entries[i]);
            }
        }
        return out;
    };

    CatSearch.prototype.clearActive = function () {
        $(this.root).find('.wacs-cat-active').removeClass('wacs-cat-active');
    };

    CatSearch.prototype.setActive = function (idx) {
        this.clearActive();
        if (this.dirty) {
            this.rebuild();
        }
        var items = this.navigable();
        if (!items.length) {
            this.activeIdx = -1;
            return;
        }
        idx = Math.max(0, Math.min(idx, items.length - 1));
        this.activeIdx = idx;
        var label = items[idx].label;
        label.classList.add('wacs-cat-active');
        if (label.scrollIntoView) {
            label.scrollIntoView({ block: 'nearest' });
        }
    };

    CatSearch.prototype.onKeydown = function (e) {
        // Während einer IME-Eingabe (z. B. Japanisch) nichts abfangen.
        var native = e.originalEvent || e;
        if (native.isComposing || e.keyCode === 229) {
            return;
        }
        if (e.key === 'Escape' || e.keyCode === 27) {
            if (this.$input.val() !== '') {
                e.preventDefault();
                e.stopPropagation();
                this.escHandled = true;
                this.$input.val('');
                clearTimeout(this.timer);
                this.timer = null;
                this.run();
            }
            return;
        }
        if (e.key === 'ArrowDown' || e.keyCode === 40) {
            e.preventDefault();
            this.setActive(this.activeIdx + 1);
            return;
        }
        if (e.key === 'ArrowUp' || e.keyCode === 38) {
            e.preventDefault();
            this.setActive(this.activeIdx - 1);
            return;
        }
        if (e.key === 'Enter' || e.keyCode === 13) {
            // Nie das Formular absenden bzw. Quick Edit speichern.
            e.preventDefault();
            e.stopPropagation();
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
                this.run();
            } else if (this.dirty) {
                this.filter(false);
            }
            var items = this.navigable();
            if (!items.length) {
                return;
            }
            var entry = items[this.activeIdx >= 0 ? Math.min(this.activeIdx, items.length - 1) : 0];
            if (entry.cb && !entry.cb.disabled) {
                entry.cb.click();
            }
        }
    };

    // Klassische Metabox im Produkt-Editor.
    function initMetabox(box) {
        var $box = $(box);
        var root = $box.find('.tabs-panel[id$="-all"] .categorychecklist').get(0);
        if (!root || $(root).data('wacsCatSearch')) {
            return;
        }
        new CatSearch({
            root: root,
            box: box,
            taxonomy: (box.id || '').replace(/^taxonomy-/, ''),
            insert: function ($tools) { $box.prepend($tools); }
        });
    }

    // Quick Edit / Bulk Edit in der Produktliste. Nur aktive Editor-Zeilen
    // (tr.inline-editor), niemals die versteckte Vorlage, die WordPress klont.
    function initInlineList(list) {
        if ($(list).data('wacsCatSearch')) {
            return;
        }
        new CatSearch({
            root: list,
            taxonomy: taxonomyFromList(list),
            insert: function ($tools) { $(list).before($tools); }
        });
    }

    function scan() {
        $('.categorydiv').each(function () { initMetabox(this); });
        $('tr.inline-editor ul.cat-checklist').each(function () { initInlineList(this); });
    }

    scan();

    // Nach dem Verschieben einer Metabox die Hervorhebungen wiederherstellen.
    $(document).on('postbox-moved', function () {
        $('.categorydiv .categorychecklist').each(function () {
            var inst = $(this).data('wacsCatSearch');
            if (inst) {
                inst.filter(false);
            }
        });
    });

    // Bulk Edit verwendet dieselbe Zeile wieder – beim erneuten Öffnen zurücksetzen.
    $(document).on('click', '#doaction, #doaction2', function () {
        setTimeout(function () {
            $('#bulk-edit ul.cat-checklist').each(function () {
                var inst = $(this).data('wacsCatSearch');
                if (inst) {
                    inst.reset();
                }
            });
            scan();
        }, 0);
    });

    // Später eingefügte Metaboxen und Quick-Edit-/Bulk-Edit-Zeilen erkennen.
    if (window.MutationObserver) {
        var pending = false;
        new MutationObserver(function (records) {
            if (pending) {
                return;
            }
            for (var r = 0; r < records.length; r++) {
                var added = records[r].addedNodes;
                for (var i = 0; i < added.length; i++) {
                    var tag = added[i].nodeType === 1 ? added[i].tagName : '';
                    if (tag === 'TR' || tag === 'DIV' || tag === 'TBODY' || tag === 'FIELDSET') {
                        pending = true;
                        setTimeout(function () {
                            pending = false;
                            scan();
                        }, 0);
                        return;
                    }
                }
            }
        }).observe(document.getElementById('wpbody-content') || document.body, { childList: true, subtree: true });
    }
});

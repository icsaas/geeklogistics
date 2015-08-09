﻿/*
 Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
 */
(function () {
    function v(a) {
        return a && a.domId && a.getInputElement().$ ? a.getInputElement() : a && a.$ ? a : !1
    }

    function E(a) {
        if (!a)throw"Languages-by-groups list are required for construct selectbox";
        var c = [], d = "", e;
        for (e in a)for (var f in a[e]) {
            var g = a[e][f];
            "en_US" == g ? d = g : c.push(g)
        }
        c.sort();
        d && c.unshift(d);
        return {
            getCurrentLangGroup: function (c) {
                a:{
                    for (var d in a)for (var e in a[d])if (e.toUpperCase() === c.toUpperCase()) {
                        c = d;
                        break a
                    }
                    c = ""
                }
                return c
            }, setLangList: function () {
                var c = {}, d;
                for (d in a)for (var e in a[d])c[a[d][e]] =
                    e;
                return c
            }()
        }
    }

    var h = function () {
        var a = function (a, b, e) {
            var e = e || {}, f = e.expires;
            if ("number" == typeof f && f) {
                var g = new Date;
                g.setTime(g.getTime() + 1E3 * f);
                f = e.expires = g
            }
            f && f.toUTCString && (e.expires = f.toUTCString());
            var b = encodeURIComponent(b), a = a + "=" + b, i;
            for (i in e)b = e[i], a += "; " + i, !0 !== b && (a += "=" + b);
            document.cookie = a
        };
        return {
            postMessage: {
                init: function (a) {
                    window.addEventListener ? window.addEventListener("message", a, !1) : window.attachEvent("onmessage", a)
                }, send: function (a) {
                    var b = Object.prototype.toString, e =
                        a.fn || null, f = a.id || "", g = a.target || window, i = a.message || {id: f};
                    a.message && "[object Object]" == b.call(a.message) && (a.message.id || (a.message.id = f), i = a.message);
                    a = window.JSON.stringify(i, e);
                    g.postMessage(a, "*")
                }, unbindHandler: function (a) {
                    window.removeEventListener ? window.removeEventListener("message", a, !1) : window.detachEvent("onmessage", a)
                }
            }, hash: {
                create: function () {
                }, parse: function () {
                }
            }, cookie: {
                set: a, get: function (a) {
                    return (a = document.cookie.match(RegExp("(?:^|; )" + a.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,
                            "\\$1") + "=([^;]*)"))) ? decodeURIComponent(a[1]) : void 0
                }, remove: function (c) {
                    a(c, "", {expires: -1})
                }
            }, misc: {
                findFocusable: function (a) {
                    var b = null;
                    a && (b = a.find("a[href], area[href], input, select, textarea, button, *[tabindex], *[contenteditable]"));
                    return b
                }, isVisible: function (a) {
                    return !(0 === a.offsetWidth || 0 == a.offsetHeight || "none" === (document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(a, null).display : a.currentStyle ? a.currentStyle.display : a.style.display))
                },
                hasClass: function (a, b) {
                    return !(!a.className || !a.className.match(RegExp("(\\s|^)" + b + "(\\s|$)")))
                }
            }
        }
    }(), a = a || {};
    a.TextAreaNumber = null;
    a.load = !0;
    a.cmd = {SpellTab: "spell", Thesaurus: "thes", GrammTab: "grammar"};
    a.dialog = null;
    a.optionNode = null;
    a.selectNode = null;
    a.grammerSuggest = null;
    a.textNode = {};
    a.iframeMain = null;
    a.dataTemp = "";
    a.div_overlay = null;
    a.textNodeInfo = {};
    a.selectNode = {};
    a.selectNodeResponce = {};
    a.langList = null;
    a.langSelectbox = null;
    a.banner = "";
    a.show_grammar = null;
    a.div_overlay_no_check = null;
    a.targetFromFrame =
    {};
    a.onLoadOverlay = null;
    a.LocalizationComing = {};
    a.OverlayPlace = null;
    a.sessionid = "";
    a.LocalizationButton = {
        ChangeTo_button: {instance: null, text: "Change to", localizationID: "ChangeTo"},
        ChangeAll: {instance: null, text: "Change All"},
        IgnoreWord: {instance: null, text: "Ignore word"},
        IgnoreAllWords: {instance: null, text: "Ignore all words"},
        Options: {instance: null, text: "Options", optionsDialog: {instance: null}},
        AddWord: {instance: null, text: "Add word"},
        FinishChecking_button: {instance: null, text: "Finish Checking", localizationID: "FinishChecking"},
        FinishChecking_button_block: {instance: null, text: "Finish Checking", localizationID: "FinishChecking"}
    };
    a.LocalizationLabel = {
        ChangeTo_label: {instance: null, text: "Change to", localizationID: "ChangeTo"},
        Suggestions: {instance: null, text: "Suggestions"},
        Categories: {instance: null, text: "Categories"},
        Synonyms: {instance: null, text: "Synonyms"}
    };
    var F = function (b) {
        var c, d, e;
        for (e in b)c = (c = a.dialog.getContentElement(a.dialog._.currentTabId, e)) ? c.getElement() : b[e].instance.getElement().getFirst() || b[e].instance.getElement(),
            d = b[e].localizationID || e, c.setText(a.LocalizationComing[d])
    }, G = function (b) {
        var c, d, e;
        for (e in b)if (c = a.dialog.getContentElement(a.dialog._.currentTabId, e), c || (c = b[e].instance), c.setLabel)d = b[e].localizationID || e, c.setLabel(a.LocalizationComing[d] + ":")
    }, n, w;
    a.framesetHtml = function (b) {
        return "<iframe id=" + a.iframeNumber + "_" + b + ' frameborder="0" allowtransparency="1" style="width:100%;border: 1px solid #AEB3B9;overflow: auto;background:#fff; border-radius: 3px;"></iframe>'
    };
    a.setIframe = function (b, c) {
        var d;
        d = a.framesetHtml(c);
        var e = a.iframeNumber + "_" + c;
        b.getElement().setHtml(d);
        d = document.getElementById(e);
        d = d.contentWindow ? d.contentWindow : d.contentDocument.document ? d.contentDocument.document : d.contentDocument;
        d.document.open();
        d.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>iframe</title><style>html,body{margin: 0;height: 100%;font: 13px/1.555 "Trebuchet MS", sans-serif;}a{color: #888;font-weight: bold;text-decoration: none;border-bottom: 1px solid #888;}.main-box {color:#252525;padding: 3px 5px;text-align: justify;}.main-box p{margin: 0 0 14px;}.main-box .cerr{color: #f00000;border-bottom-color: #f00000;}</style></head><body><div id="content" class="main-box"></div><iframe src="" frameborder="0" id="spelltext" name="spelltext" style="display:none; width: 100%" ></iframe><iframe src="" frameborder="0" id="loadsuggestfirst" name="loadsuggestfirst" style="display:none; width: 100%" ></iframe><iframe src="" frameborder="0" id="loadspellsuggestall" name="loadspellsuggestall" style="display:none; width: 100%" ></iframe><iframe src="" frameborder="0" id="loadOptionsForm" name="loadOptionsForm" style="display:none; width: 100%" ></iframe><script>(function(window) {var ManagerPostMessage = function() {var _init = function(handler) {if (document.addEventListener) {window.addEventListener("message", handler, false);} else {window.attachEvent("onmessage", handler);};};var _sendCmd = function(o) {var str,type = Object.prototype.toString,fn = o.fn || null,id = o.id || "",target = o.target || window,message = o.message || { "id": id };if (o.message && type.call(o.message) == "[object Object]") {(o.message["id"]) ? o.message["id"] : o.message["id"] = id;message = o.message;};str = JSON.stringify(message, fn);target.postMessage(str, "*");};return {init: _init,send: _sendCmd};};var manageMessageTmp = new ManagerPostMessage;var appString = (function(){var spell = parent.CKEDITOR.config.wsc.DefaultParams.scriptPath;var serverUrl = parent.CKEDITOR.config.wsc.DefaultParams.serviceHost;return serverUrl + spell;})();function loadScript(src, callback) {var scriptTag = document.createElement("script");scriptTag.type = "text/javascript";callback ? callback : callback = function() {};if(scriptTag.readyState) {scriptTag.onreadystatechange = function() {if (scriptTag.readyState == "loaded" ||scriptTag.readyState == "complete") {scriptTag.onreadystatechange = null;setTimeout(function(){scriptTag.parentNode.removeChild(scriptTag)},1);callback();}};}else{scriptTag.onload = function() {setTimeout(function(){scriptTag.parentNode.removeChild(scriptTag)},1);callback();};};scriptTag.src = src;document.getElementsByTagName("head")[0].appendChild(scriptTag);};window.onload = function(){loadScript(appString, function(){manageMessageTmp.send({"id": "iframeOnload","target": window.parent});});}})(this);<\/script></body></html>');
        d.document.close()
    };
    a.setCurrentIframe = function (b) {
        a.setIframe(a.dialog._.contents[b].Content, b)
    };
    a.setHeightBannerFrame = function () {
        var b = a.dialog.getContentElement("SpellTab", "banner").getElement(), c = a.dialog.getContentElement("GrammTab", "banner").getElement(), d = a.dialog.getContentElement("Thesaurus", "banner").getElement();
        b.setStyle("height", "90px");
        c.setStyle("height", "90px");
        d.setStyle("height", "90px")
    };
    a.setHeightFrame = function () {
        document.getElementById(a.iframeNumber + "_" + a.dialog._.currentTabId).style.height =
            "240px"
    };
    a.sendData = function (b) {
        var c = b._.currentTabId, d = b._.contents[c].Content, e, f;
        a.previousTab = c;
        a.setIframe(d, c);
        var g = function (i) {
            c = b._.currentTabId;
            i = i || window.event;
            i.data.getTarget().is("a") && c !== a.previousTab && (a.previousTab = c, d = b._.contents[c].Content, e = a.iframeNumber + "_" + c, a.div_overlay.setEnable(), d.getElement().getChildCount() ? A(a.targetFromFrame[e], a.cmd[c]) : (a.setIframe(d, c), f = document.getElementById(e), a.targetFromFrame[e] = f.contentWindow))
        };
        b.parts.tabs.removeListener("click", g);
        b.parts.tabs.on("click", g)
    };
    a.buildSelectLang = function (a) {
        var c = new CKEDITOR.dom.element("div"), d = new CKEDITOR.dom.element("select"), a = "wscLang" + a;
        c.addClass("cke_dialog_ui_input_select");
        c.setAttribute("role", "presentation");
        c.setStyles({
            height: "auto",
            position: "absolute",
            right: "0",
            top: "-1px",
            width: "160px",
            "white-space": "normal"
        });
        d.setAttribute("id", a);
        d.addClass("cke_dialog_ui_input_select");
        d.setStyles({width: "160px"});
        c.append(d);
        return c
    };
    a.buildOptionLang = function (b, c) {
        var d = document.getElementById("wscLang" +
            c), e = document.createDocumentFragment(), f, g, i = [];
        if (0 === d.options.length) {
            for (f in b)i.push([f, b[f]]);
            i.sort();
            for (var r = 0; r < i.length; r++)f = document.createElement("option"), f.setAttribute("value", i[r][1]), g = document.createTextNode(i[r][0]), f.appendChild(g), e.appendChild(f);
            d.appendChild(e)
        }
        for (e = 0; e < d.options.length; e++)d.options[e].value == a.selectingLang && (d.options[e].selected = "selected")
    };
    a.buildOptionSynonyms = function (b) {
        var b = a.selectNodeResponce[b], c = v(a.selectNode.Synonyms);
        a.selectNode.Synonyms.clear();
        for (var d = 0; d < b.length; d++) {
            var e = document.createElement("option");
            e.text = b[d];
            e.value = b[d];
            c.$.add(e, d)
        }
        a.selectNode.Synonyms.getInputElement().$.firstChild.selected = !0;
        a.textNode.Thesaurus.setValue(a.selectNode.Synonyms.getInputElement().getValue())
    };
    var x = function (a) {
            var c = document, d = a.target || c.body, e = a.id || "overlayBlock", f = a.opacity || "0.9", a = a.background || "#f1f1f1", g = c.getElementById(e), i = g || c.createElement("div");
            i.style.cssText = "position: absolute;top:30px;bottom:41px;left:1px;right:1px;z-index: 10020;padding:0;margin:0;background:" +
                a + ";opacity: " + f + ";filter: alpha(opacity=" + 100 * f + ");display: none;";
            i.id = e;
            g || d.appendChild(i);
            return {
                setDisable: function () {
                    i.style.display = "none"
                }, setEnable: function () {
                    i.style.display = "block"
                }
            }
        }, H = function (b, c, d) {
            var e = new CKEDITOR.dom.element("div"), f = new CKEDITOR.dom.element("input"), g = new CKEDITOR.dom.element("label"), i = "wscGrammerSuggest" + b + "_" + c;
            e.addClass("cke_dialog_ui_input_radio");
            e.setAttribute("role", "presentation");
            e.setStyles({width: "97%", padding: "5px", "white-space": "normal"});
            f.setAttributes({
                type: "radio",
                value: c, name: "wscGrammerSuggest", id: i
            });
            f.setStyles({"float": "left"});
            f.on("click", function (b) {
                a.textNode.GrammTab.setValue(b.sender.getValue())
            });
            d && f.setAttribute("checked", !0);
            f.addClass("cke_dialog_ui_radio_input");
            g.appendText(b);
            g.setAttribute("for", i);
            g.setStyles({display: "block", "line-height": "16px", "margin-left": "18px", "white-space": "normal"});
            e.append(f);
            e.append(g);
            return e
        }, B = function (a) {
            a = a || "true";
            null !== a && "false" == a && o()
        }, s = function (b) {
            var c = new E(b), b = "wscLang" + a.dialog.getParentEditor().name,
                b = document.getElementById(b), d = a.iframeNumber + "_" + a.dialog._.currentTabId;
            a.buildOptionLang(c.setLangList, a.dialog.getParentEditor().name);
            p[c.getCurrentLangGroup(a.selectingLang)].onShow();
            B(a.show_grammar);
            b.onchange = function () {
                var b = c.getCurrentLangGroup(this.value), f = a.dialog._.currentTabId;
                p[b].onShow();
                B(a.show_grammar);
                a.div_overlay.setEnable();
                a.selectingLang = this.value;
                f = a.cmd[f];
                if (!b || !p[b] || !p[b].allowedTabCommands[f])f = p[b].defaultTabCommand;
                for (var g in a.cmd)if (a.cmd[g] == f) {
                    a.previousTab =
                        g;
                    break
                }
                h.postMessage.send({
                    message: {changeLang: a.selectingLang, text: a.dataTemp, cmd: f},
                    target: a.targetFromFrame[d],
                    id: "selectionLang_outer__page"
                })
            }
        }, I = function (b) {
            var c, d = function (b) {
                b = a.dialog.getContentElement(a.dialog._.currentTabId, b) || a.LocalizationButton[b].instance;
                b.getElement().hasClass("cke_disabled") ? b.getElement().setStyle("color", "#a0a0a0") : b.disable()
            };
            c = function (b) {
                b = a.dialog.getContentElement(a.dialog._.currentTabId, b) || a.LocalizationButton[b].instance;
                b.enable();
                b.getElement().setStyle("color",
                    "#333")
            };
            "no_any_suggestions" == b ? (b = "No suggestions", c = a.dialog.getContentElement(a.dialog._.currentTabId, "ChangeTo_button") || a.LocalizationButton.ChangeTo_button.instance, c.disable(), c = a.dialog.getContentElement(a.dialog._.currentTabId, "ChangeAll") || a.LocalizationButton.ChangeAll.instance, c.disable(), d("ChangeTo_button"), d("ChangeAll")) : (c("ChangeTo_button"), c("ChangeAll"));
            return b
        }, K = {
            iframeOnload: function () {
                a.div_overlay.setEnable();
                var b = a.dialog._.currentTabId;
                A(a.targetFromFrame[a.iframeNumber +
                "_" + b], a.cmd[b])
            }, suggestlist: function (b) {
                delete b.id;
                a.div_overlay_no_check.setDisable();
                y();
                s(a.langList);
                var c = I(b.word), d = "";
                c instanceof Array && (c = b.word[0]);
                d = c = c.split(",");
                a.textNode.SpellTab.setValue(d[0]);
                b = v(w);
                w.clear();
                for (c = 0; c < d.length; c++) {
                    var e = document.createElement("option");
                    e.text = d[c];
                    e.value = d[c];
                    b.$.add(e, c)
                }
                q();
                a.div_overlay.setDisable()
            }, grammerSuggest: function (b) {
                delete b.id;
                delete b.mocklangs;
                y();
                s(a.langList);
                var c = b.grammSuggest[0];
                a.grammerSuggest.getElement().setHtml("");
                a.textNode.GrammTab.reset();
                a.textNode.GrammTab.setValue(c);
                a.textNodeInfo.GrammTab.getElement().setHtml("");
                a.textNodeInfo.GrammTab.getElement().setText(b.info);
                for (var b = b.grammSuggest, c = b.length, d = !0, e = 0; e < c; e++)a.grammerSuggest.getElement().append(H(b[e], b[e], d)), d = !1;
                q();
                a.div_overlay.setDisable()
            }, thesaurusSuggest: function (b) {
                delete b.id;
                delete b.mocklangs;
                y();
                s(a.langList);
                a.selectNodeResponce = b;
                a.textNode.Thesaurus.reset();
                var c = v(a.selectNode.Categories), d = 0;
                a.selectNode.Categories.clear();
                for (var e in b) {
                    var f = document.createElement("option");
                    f.text = e;
                    f.value = e;
                    c.$.add(f, d);
                    d++
                }
                b = a.selectNode.Categories.getInputElement().getChildren().$[0].value;
                a.selectNode.Categories.getInputElement().getChildren().$[0].selected = !0;
                a.buildOptionSynonyms(b);
                q();
                a.div_overlay.setDisable()
            }, finish: function (b) {
                delete b.id;
                J();
                b = a.dialog.getContentElement(a.dialog._.currentTabId, "BlockFinishChecking").getElement();
                b.removeStyle("display");
                b.removeStyle("position");
                b.removeStyle("left");
                b.show();
                a.div_overlay.setDisable()
            },
            settext: function (b) {
                delete b.id;
                a.dialog.getParentEditor().getCommand("checkspell");
                var c = a.dialog.getParentEditor();
                if (c.scayt && c.wsc.isSsrvSame) {
                    var d = c.wsc.udn;
                    d ? c.wsc.DataStorage.setData("scayt_user_dictionary_name", d) : c.wsc.DataStorage.setData("scayt_user_dictionary_name", "")
                }
                try {
                    c.focus()
                } catch (e) {
                }
                c.setData(b.text, function () {
                    a.dataTemp = "";
                    c.unlockSelection();
                    c.fire("saveSnapshot");
                    a.dialog.hide()
                })
            }, ReplaceText: function (b) {
                delete b.id;
                a.div_overlay.setEnable();
                a.dataTemp = b.text;
                a.selectingLang =
                    b.currentLang;
                window.setTimeout(function () {
                    try {
                        a.div_overlay.setDisable()
                    } catch (b) {
                    }
                }, 500);
                F(a.LocalizationButton);
                G(a.LocalizationLabel)
            }, options_checkbox_send: function (b) {
                delete b.id;
                b = {osp: h.cookie.get("osp"), udn: h.cookie.get("udn"), cust_dic_ids: a.cust_dic_ids};
                h.postMessage.send({
                    message: b,
                    target: a.targetFromFrame[a.iframeNumber + "_" + a.dialog._.currentTabId],
                    id: "options_outer__page"
                })
            }, getOptions: function (b) {
                var c = b.DefOptions.udn;
                a.LocalizationComing = b.DefOptions.localizationButtonsAndText;
                a.show_grammar =
                    b.show_grammar;
                a.langList = b.lang;
                a.bnr = b.bannerId;
                a.sessionid = b.sessionid;
                if (b.bannerId) {
                    a.setHeightBannerFrame();
                    var d = b.banner;
                    a.dialog.getContentElement(a.dialog._.currentTabId, "banner").getElement().setHtml(d)
                } else a.setHeightFrame();
                "undefined" == c && (a.userDictionaryName ? (c = a.userDictionaryName, d = {
                    osp: h.cookie.get("osp"),
                    udn: a.userDictionaryName,
                    cust_dic_ids: a.cust_dic_ids,
                    id: "options_dic_send",
                    udnCmd: "create"
                }, h.postMessage.send({message: d, target: a.targetFromFrame[void 0]})) : c = "");
                h.cookie.set("osp",
                    b.DefOptions.osp);
                h.cookie.set("udn", c);
                h.cookie.set("cust_dic_ids", b.DefOptions.cust_dic_ids);
                h.postMessage.send({id: "giveOptions"})
            }, options_dic_send: function () {
                var b = {
                    osp: h.cookie.get("osp"),
                    udn: h.cookie.get("udn"),
                    cust_dic_ids: a.cust_dic_ids,
                    id: "options_dic_send",
                    udnCmd: h.cookie.get("udnCmd")
                };
                h.postMessage.send({
                    message: b,
                    target: a.targetFromFrame[a.iframeNumber + "_" + a.dialog._.currentTabId]
                })
            }, data: function (a) {
                delete a.id
            }, giveOptions: function () {
            }, setOptionsConfirmF: function () {
            }, setOptionsConfirmT: function () {
                n.setValue("")
            },
            clickBusy: function () {
                a.div_overlay.setEnable()
            }, suggestAllCame: function () {
                a.div_overlay.setDisable();
                a.div_overlay_no_check.setDisable()
            }, TextCorrect: function () {
                s(a.langList)
            }
        }, C = function (a) {
            a = a || window.event;
            if ((a = window.JSON.parse(a.data)) && a.id)K[a.id](a)
        }, A = function (b, c, d, e) {
            c = c || CKEDITOR.config.wsc_cmd;
            d = d || a.dataTemp;
            h.postMessage.send({
                message: {
                    customerId: a.wsc_customerId,
                    text: d,
                    txt_ctrl: a.TextAreaNumber,
                    cmd: c,
                    cust_dic_ids: a.cust_dic_ids,
                    udn: a.userDictionaryName,
                    slang: a.selectingLang,
                    reset_suggest: e || !1,
                    sessionid: a.sessionid
                }, target: b, id: "data_outer__page"
            });
            a.div_overlay.setEnable()
        }, p = {
            superset: {
                onShow: function () {
                    a.dialog.showPage("Thesaurus");
                    a.dialog.showPage("GrammTab");
                    l()
                }, allowedTabCommands: {spell: !0, grammar: !0, thes: !0}, defaultTabCommand: "spell"
            }, usual: {
                onShow: function () {
                    t();
                    o();
                    l()
                }, allowedTabCommands: {spell: !0}, defaultTabCommand: "spell"
            }, rtl: {
                onShow: function () {
                    t();
                    o();
                    l()
                }, allowedTabCommands: {spell: !0}, defaultTabCommand: "spell"
            }, spellgrammar: {
                onShow: function () {
                    t();
                    a.dialog.showPage("GrammTab");
                    l()
                }, allowedTabCommands: {spell: !0, grammar: !0}, defaultTabCommand: "spell"
            }, spellthes: {
                onShow: function () {
                    a.dialog.showPage("Thesaurus");
                    o();
                    l()
                }, allowedTabCommands: {spell: !0, thes: !0}, defaultTabCommand: "spell"
            }
        }, D = function (b) {
            var c = (new function (a) {
                var b = {};
                return {
                    getCmdByTab: function (c) {
                        for (var g in a)b[a[g]] = g;
                        return b[c]
                    }
                }
            }(a.cmd)).getCmdByTab(CKEDITOR.config.wsc_cmd);
            b.selectPage(c);
            a.sendData(b)
        }, t = function () {
            a.dialog.hidePage("Thesaurus")
        }, o = function () {
            a.dialog.hidePage("GrammTab")
        }, l = function () {
            a.dialog.showPage("SpellTab")
        },
        q = function () {
            var b = a.dialog.getContentElement(a.dialog._.currentTabId, "bottomGroup").getElement();
            b.removeStyle("display");
            b.removeStyle("position");
            b.removeStyle("left");
            b.show()
        }, J = function () {
            var b = a.dialog.getContentElement(a.dialog._.currentTabId, "bottomGroup").getElement(), c = document.activeElement, d;
            b.setStyles({display: "block", position: "absolute", left: "-9999px"});
            setTimeout(function () {
                b.removeStyle("display");
                b.removeStyle("position");
                b.removeStyle("left");
                b.hide();
                a.dialog._.editor.focusManager.currentActive.focusNext();
                d = h.misc.findFocusable(a.dialog.parts.contents);
                if (!h.misc.hasClass(c, "cke_dialog_tab") && !h.misc.hasClass(c, "cke_dialog_contents_body") && h.misc.isVisible(c))try {
                    c.focus()
                } catch (e) {
                } else for (var f = 0, g; f < d.count(); f++)if (g = d.getItem(f), h.misc.isVisible(g.$)) {
                    try {
                        g.$.focus()
                    } catch (i) {
                    }
                    break
                }
            }, 0)
        }, y = function () {
            var b = a.dialog.getContentElement(a.dialog._.currentTabId, "BlockFinishChecking").getElement(), c = document.activeElement, d;
            b.setStyles({display: "block", position: "absolute", left: "-9999px"});
            setTimeout(function () {
                b.removeStyle("display");
                b.removeStyle("position");
                b.removeStyle("left");
                b.hide();
                a.dialog._.editor.focusManager.currentActive.focusNext();
                d = h.misc.findFocusable(a.dialog.parts.contents);
                if (!h.misc.hasClass(c, "cke_dialog_tab") && !h.misc.hasClass(c, "cke_dialog_contents_body") && h.misc.isVisible(c))try {
                    c.focus()
                } catch (e) {
                } else for (var f = 0, g; f < d.count(); f++)if (g = d.getItem(f), h.misc.isVisible(g.$)) {
                    try {
                        g.$.focus()
                    } catch (i) {
                    }
                    break
                }
            }, 0)
        };
    CKEDITOR.dialog.add("checkspell", function (b) {
        var c, d;

        function e(a) {
            var e = parseInt(b.config.wsc_left,
                10), f = parseInt(b.config.wsc_top, 10), g = parseInt(b.config.wsc_width, 10), h = parseInt(b.config.wsc_height, 10), j = CKEDITOR.document.getWindow().getViewPaneSize();
            a.getPosition();
            var k = a.getSize(), m = 0;
            if (!a._.resized) {
                var m = k.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.opera || CKEDITOR.env.ie && CKEDITOR.env.quirks)), z = k.width - a.parts.contents.getSize("width", 1);
                if (g < c || isNaN(g))g = c;
                g > j.width - z && (g = j.width - z);
                if (h < d || isNaN(h))h = d;
                h > j.height - m && (h = j.height - m);
                k.width = g + z;
                k.height =
                    h + m;
                a._.fromResizeEvent = !1;
                a.resize(g, h);
                setTimeout(function () {
                    a._.fromResizeEvent = !1;
                    CKEDITOR.dialog.fire("resize", {dialog: a, width: g, height: h}, b)
                }, 300)
            }
            a._.moved || (m = isNaN(e) && isNaN(f) ? 0 : 1, isNaN(e) && (e = (j.width - k.width) / 2), 0 > e && (e = 0), e > j.width - k.width && (e = j.width - k.width), isNaN(f) && (f = (j.height - k.height) / 2), 0 > f && (f = 0), f > j.height - k.height && (f = j.height - k.height), a.move(e, f, m))
        }

        function f() {
            b.wsc = {};
            (function (a) {
                var b = {
                    separator: "<$>", getDataType: function (a) {
                        return "undefined" === typeof a ? "undefined" :
                            null === a ? "null" : Object.prototype.toString.call(a).slice(8, -1)
                    }, convertDataToString: function (a) {
                        return this.getDataType(a).toLowerCase() + this.separator + a
                    }, restoreDataFromString: function (a) {
                        var b = a, c, a = this.backCompatibility(a);
                        if ("string" === typeof a)switch (b = a.indexOf(this.separator), c = a.substring(0, b), b = a.substring(b + this.separator.length), c) {
                            case "boolean":
                                b = "true" === b;
                                break;
                            case "number":
                                b = parseFloat(b);
                                break;
                            case "array":
                                b = "" === b ? [] : b.split(",");
                                break;
                            case "null":
                                b = null;
                                break;
                            case "undefined":
                                b = void 0
                        }
                        return b
                    }, backCompatibility: function (a) {
                        var b = a, c;
                        "string" === typeof a && (c = a.indexOf(this.separator), 0 > c && (b = parseFloat(a), isNaN(b) && ("[" === a[0] && "]" === a[a.length - 1] ? (a = a.replace("[", ""), a = a.replace("]", ""), b = "" === a ? [] : a.split(",")) : b = "true" === a || "false" === a ? "true" === a : a), b = this.convertDataToString(b)));
                        return b
                    }
                }, c = {
                    get: function (a) {
                        return b.restoreDataFromString(window.localStorage.getItem(a))
                    }, set: function (a, c) {
                        var d = b.convertDataToString(c);
                        window.localStorage.setItem(a, d)
                    }, del: function (a) {
                        window.localStorage.removeItem(a)
                    },
                    clear: function () {
                        window.localStorage.clear()
                    }
                }, d = {
                    expiration: 31622400, get: function (a) {
                        return b.restoreDataFromString(this.getCookie(a))
                    }, set: function (a, c) {
                        var d = b.convertDataToString(c);
                        this.setCookie(a, d, {expires: this.expiration})
                    }, del: function (a) {
                        this.deleteCookie(a)
                    }, getCookie: function (a) {
                        return (a = document.cookie.match(RegExp("(?:^|; )" + a.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"))) ? decodeURIComponent(a[1]) : void 0
                    }, setCookie: function (a, b, c) {
                        var c = c || {}, d = c.expires;
                        if ("number" === typeof d && d) {
                            var e = new Date;
                            e.setTime(e.getTime() + 1E3 * d);
                            d = c.expires = e
                        }
                        d && d.toUTCString && (c.expires = d.toUTCString());
                        var b = encodeURIComponent(b), a = a + "=" + b, i;
                        for (i in c)b = c[i], a += "; " + i, !0 !== b && (a += "=" + b);
                        document.cookie = a
                    }, deleteCookie: function (a) {
                        this.setCookie(a, null, {expires: -1})
                    }, clear: function () {
                        for (var a = document.cookie.split(";"), b = 0; b < a.length; b++) {
                            var c = a[b], d = c.indexOf("=");
                            this.deleteCookie(-1 < d ? c.substr(0, d) : c)
                        }
                    }
                }, e = window.localStorage ? c : d;
                a.DataStorage = {
                    getData: function (a) {
                        return e.get(a)
                    },
                    setData: function (a, b) {
                        e.set(a, b)
                    }, deleteData: function (a) {
                        e.del(a)
                    }, clear: function () {
                        e.clear()
                    }
                }
            })(b.wsc);
            b.wsc.operationWithUDN = function (b, c) {
                h.postMessage.send({
                    message: {udn: c, id: "operationWithUDN", udnCmd: b},
                    target: a.targetFromFrame[a.iframeNumber + "_" + a.dialog._.currentTabId]
                })
            };
            b.wsc.getLocalStorageUDN = function () {
                var a = b.wsc.DataStorage.getData("scayt_user_dictionary_name");
                if (a)return a
            };
            b.wsc.getLocalStorageUD = function () {
                var a = b.wsc.DataStorage.getData("scayt_user_dictionary");
                if (a)return a
            };
            b.wsc.addWords = function (a, c) {
                var d = b.config.wsc.DefaultParams.serviceHost + b.config.wsc.DefaultParams.ssrvHost + "?cmd=dictionary&format=json&customerid=1%3AncttD3-fIoSf2-huzwE4-Y5muI2-mD0Tt-kG9Wz-UEDFC-tYu243-1Uq474-d9Z2l3&action=addword&word=" + a + "&callback=toString&synchronization=true", e = document.createElement("script");
                e.type = "text/javascript";
                e.src = d;
                document.getElementsByTagName("head")[0].appendChild(e);
                e.onload = c;
                e.onreadystatechange = function () {
                    "loaded" === this.readyState && c()
                }
            };
            b.wsc.cgiOrigin =
                function () {
                    var a = b.config.wsc.DefaultParams.serviceHost.split("/");
                    return a[0] + "//" + a[2]
                };
            b.wsc.isSsrvSame = !1
        }

        var g = function () {
            this.getElement().focus();
            a.div_overlay.setEnable();
            var c = a.dialog._.currentTabId, d = a.iframeNumber + "_" + c, e = a.textNode[c].getValue(), f = this.getElement().getAttribute("title-cmd");
            h.postMessage.send({
                message: {cmd: f, tabId: c, new_word: e},
                target: a.targetFromFrame[d],
                id: "cmd_outer__page"
            });
            ("ChangeTo" == f || "ChangeAll" == f) && b.fire("saveSnapshot");
            "FinishChecking" == f && b.config.wsc_onFinish.call(CKEDITOR.document.getWindow().getFrame())
        };
        c = 560;
        d = 444;
        return {
            title: b.config.wsc_dialogTitle || b.lang.wsc.title,
            minWidth: c,
            minHeight: d,
            buttons: [CKEDITOR.dialog.cancelButton],
            onLoad: function () {
                a.dialog = this;
                t();
                o();
                l();
                b.plugins.scayt && f()
            },
            onShow: function () {
                a.dialog = this;
                b.lockSelection(b.getSelection());
                a.TextAreaNumber = "cke_textarea_" + CKEDITOR.currentInstance.name;
                h.postMessage.init(C);
                a.dataTemp = CKEDITOR.currentInstance.getData();
                a.OverlayPlace = a.dialog.parts.tabs.getParent().$;
                if (CKEDITOR && CKEDITOR.config) {
                    a.wsc_customerId = b.config.wsc_customerId;
                    a.cust_dic_ids = b.config.wsc_customDictionaryIds;
                    a.userDictionaryName = b.config.wsc_userDictionaryName;
                    a.defaultLanguage = CKEDITOR.config.defaultLanguage;
                    var c = "file:" == document.location.protocol ? "http:" : document.location.protocol, c = b.config.wsc_customLoaderScript || c + "//loader.webspellchecker.net/sproxy_fck/sproxy.php?plugin=fck2&customerid=" + a.wsc_customerId + "&cmd=script&doc=wsc&schema=22";
                    e(this);
                    CKEDITOR.scriptLoader.load(c, function (c) {
                        CKEDITOR.config && CKEDITOR.config.wsc && CKEDITOR.config.wsc.DefaultParams ?
                            (a.serverLocationHash = CKEDITOR.config.wsc.DefaultParams.serviceHost, a.logotype = CKEDITOR.config.wsc.DefaultParams.logoPath, a.loadIcon = CKEDITOR.config.wsc.DefaultParams.iconPath, a.loadIconEmptyEditor = CKEDITOR.config.wsc.DefaultParams.iconPathEmptyEditor, a.LangComparer = new CKEDITOR.config.wsc.DefaultParams._SP_FCK_LangCompare) : (a.serverLocationHash = DefaultParams.serviceHost, a.logotype = DefaultParams.logoPath, a.loadIcon = DefaultParams.iconPath, a.loadIconEmptyEditor = DefaultParams.iconPathEmptyEditor, a.LangComparer =
                            new _SP_FCK_LangCompare);
                        a.pluginPath = CKEDITOR.getUrl(b.plugins.wsc.path);
                        a.iframeNumber = a.TextAreaNumber;
                        a.templatePath = a.pluginPath + "dialogs/tmp.html";
                        a.LangComparer.setDefaulLangCode(a.defaultLanguage);
                        a.currentLang = b.config.wsc_lang || a.LangComparer.getSPLangCode(b.langCode) || "en_US";
                        a.selectingLang = a.currentLang;
                        a.div_overlay = new x({
                            opacity: "1",
                            background: "#fff url(" + a.loadIcon + ") no-repeat 50% 50%",
                            target: a.OverlayPlace
                        });
                        var d = a.dialog.parts.tabs.getId(), d = CKEDITOR.document.getById(d);
                        d.setStyle("width",
                            "97%");
                        d.getElementsByTag("DIV").count() || d.append(a.buildSelectLang(a.dialog.getParentEditor().name));
                        a.div_overlay_no_check = new x({
                            opacity: "1",
                            id: "no_check_over",
                            background: "#fff url(" + a.loadIconEmptyEditor + ") no-repeat 50% 50%",
                            target: a.OverlayPlace
                        });
                        c && (D(a.dialog), a.dialog.setupContent(a.dialog));
                        b.plugins.scayt && (b.wsc.isSsrvSame = function () {
                            var a = CKEDITOR.config.wsc.DefaultParams.serviceHost.replace("lf/22/js/../../../", "").split("//")[1], c = CKEDITOR.config.wsc.DefaultParams.ssrvHost, d = b.config.scayt_srcUrl,
                                e, f, g, i, h;
                            if (window.SCAYT && window.SCAYT.CKSCAYT) {
                                g = SCAYT.CKSCAYT.prototype.basePath;
                                g.split("//");
                                i = g.split("//")[1].split("/")[0];
                                h = g.split(i + "/")[1].replace("/lf/scayt3/ckscayt/", "") + "/script/ssrv.cgi"
                            }
                            if (d && !g && !b.config.scayt_servicePath) {
                                d.split("//");
                                e = d.split("//")[1].split("/")[0];
                                f = d.split(e + "/")[1].replace("/lf/scayt3/ckscayt/ckscayt.js", "") + "/script/ssrv.cgi"
                            }
                            return "//" + a + c === "//" + (b.config.scayt_serviceHost || i || e) + "/" + (b.config.scayt_servicePath || h || f)
                        }());
                        if (window.SCAYT && b.wsc && b.wsc.isSsrvSame) {
                            var e =
                                b.wsc.cgiOrigin();
                            b.wsc.syncIsDone = !1;
                            var c = function (a) {
                                if (a.origin === e) {
                                    a = JSON.parse(a.data);
                                    if (a.ud && a.ud !== "undefined")b.wsc.ud = a.ud; else if (a.ud === "undefined")b.wsc.ud = void 0;
                                    if (a.udn && a.udn !== "undefined")b.wsc.udn = a.udn; else if (a.udn === "undefined")b.wsc.udn = void 0;
                                    if (!b.wsc.syncIsDone) {
                                        f(b.wsc.ud);
                                        b.wsc.syncIsDone = true
                                    }
                                }
                            }, f = function () {
                                var c = b.wsc.getLocalStorageUD(), d;
                                c instanceof Array && (d = c.toString());
                                d !== void 0 && d !== "" && setTimeout(function () {
                                        b.wsc.addWords(d, function () {
                                            D(a.dialog);
                                            a.dialog.setupContent(a.dialog)
                                        })
                                    },
                                    400)
                            };
                            window.addEventListener ? addEventListener("message", c, !1) : window.attachEvent("onmessage", c);
                            setTimeout(function () {
                                var a = b.wsc.getLocalStorageUDN();
                                a !== void 0 && b.wsc.operationWithUDN("restore", a)
                            }, 500)
                        }
                    })
                } else a.dialog.hide()
            },
            onHide: function () {
                var c = CKEDITOR.plugins.scayt, d = b.scayt;
                b.unlockSelection();
                c && (d && c.state[b.name]) && d.setMarkupPaused(!1);
                a.dataTemp = "";
                a.sessionid = "";
                h.postMessage.unbindHandler(C);
                if (b.plugins.scayt && b.wsc && b.wsc.isSsrvSame) {
                    var c = b.wsc.udn, e = b.wsc.ud, f, g;
                    b.scayt ? (c ?
                        (b.wsc.DataStorage.setData("scayt_user_dictionary_name", c), b.scayt.restoreUserDictionary(c)) : (b.wsc.DataStorage.setData("scayt_user_dictionary_name", ""), b.scayt.removeUserDictionary()), e && setTimeout(function () {
                        f = e.split(",");
                        for (g = 0; g < f.length; g = g + 1)b.scayt.addWordToUserDictionary(f[g])
                    }, 200), e || b.wsc.DataStorage.setData("scayt_user_dictionary", [])) : (c ? b.wsc.DataStorage.setData("scayt_user_dictionary_name", c) : b.wsc.DataStorage.setData("scayt_user_dictionary_name", ""), e && (f = e.split(","), b.wsc.DataStorage.setData("scayt_user_dictionary",
                        f)))
                }
            },
            contents: [{
                id: "SpellTab",
                label: "SpellChecker",
                accessKey: "S",
                elements: [{type: "html", id: "banner", label: "banner", style: "", html: "<div></div>"}, {
                    type: "html",
                    id: "Content",
                    label: "spellContent",
                    html: "",
                    setup: function (b) {
                        var b = a.iframeNumber + "_" + b._.currentTabId, c = document.getElementById(b);
                        a.targetFromFrame[b] = c.contentWindow
                    }
                }, {
                    type: "hbox",
                    id: "bottomGroup",
                    style: "width:560px; margin: 0 auto;",
                    widths: ["50%", "50%"],
                    children: [{
                        type: "hbox", id: "leftCol", align: "left", width: "50%", children: [{
                            type: "vbox",
                            id: "rightCol1",
                            widths: ["50%", "50%"],
                            children: [{
                                type: "text",
                                id: "ChangeTo_label",
                                label: a.LocalizationLabel.ChangeTo_label.text + ":",
                                labelLayout: "horizontal",
                                labelStyle: "font: 12px/25px arial, sans-serif;",
                                width: "140px",
                                "default": "",
                                onShow: function () {
                                    a.textNode.SpellTab = this;
                                    a.LocalizationLabel.ChangeTo_label.instance = this
                                },
                                onHide: function () {
                                    this.reset()
                                }
                            }, {
                                type: "hbox", id: "rightCol", align: "right", width: "30%", children: [{
                                    type: "vbox", id: "rightCol_col__left", children: [{
                                        type: "text",
                                        id: "labelSuggestions",
                                        label: a.LocalizationLabel.Suggestions.text +
                                        ":",
                                        onShow: function () {
                                            a.LocalizationLabel.Suggestions.instance = this;
                                            this.getInputElement().setStyles({display: "none"})
                                        }
                                    }, {
                                        type: "html",
                                        id: "logo",
                                        html: '<img width="99" height="68" border="0" src="" title="WebSpellChecker.net" alt="WebSpellChecker.net" style="display: inline-block;">',
                                        setup: function () {
                                            this.getElement().$.src = a.logotype;
                                            this.getElement().getParent().setStyles({"text-align": "left"})
                                        }
                                    }]
                                }, {
                                    type: "select",
                                    id: "list_of_suggestions",
                                    labelStyle: "font: 12px/25px arial, sans-serif;",
                                    size: "6",
                                    inputStyle: "width: 140px; height: auto;",
                                    items: [["loading..."]],
                                    onShow: function () {
                                        w = this
                                    },
                                    onChange: function () {
                                        a.textNode.SpellTab.setValue(this.getValue())
                                    }
                                }]
                            }]
                        }]
                    }, {
                        type: "hbox", id: "rightCol", align: "right", width: "50%", children: [{
                            type: "vbox", id: "rightCol_col__left", widths: ["50%", "50%", "50%", "50%"], children: [{
                                type: "button",
                                id: "ChangeTo_button",
                                label: a.LocalizationButton.ChangeTo_button.text,
                                title: "Change to",
                                style: "width: 100%;",
                                onLoad: function () {
                                    this.getElement().setAttribute("title-cmd", "ChangeTo");
                                    a.LocalizationButton.ChangeTo_button.instance =
                                        this
                                },
                                onClick: g
                            }, {
                                type: "button",
                                id: "ChangeAll",
                                label: a.LocalizationButton.ChangeAll.text,
                                title: "Change All",
                                style: "width: 100%;",
                                onLoad: function () {
                                    this.getElement().setAttribute("title-cmd", this.id);
                                    a.LocalizationButton.ChangeAll.instance = this
                                },
                                onClick: g
                            }, {
                                type: "button",
                                id: "AddWord",
                                label: a.LocalizationButton.AddWord.text,
                                title: "Add word",
                                style: "width: 100%;",
                                onLoad: function () {
                                    this.getElement().setAttribute("title-cmd", this.id);
                                    a.LocalizationButton.AddWord.instance = this
                                },
                                onClick: g
                            }, {
                                type: "button",
                                id: "FinishChecking_button",
                                label: a.LocalizationButton.FinishChecking_button.text,
                                title: "Finish Checking",
                                style: "width: 100%;margin-top: 9px;",
                                onLoad: function () {
                                    this.getElement().setAttribute("title-cmd", "FinishChecking");
                                    a.LocalizationButton.FinishChecking_button.instance = this
                                },
                                onClick: g
                            }]
                        }, {
                            type: "vbox", id: "rightCol_col__right", widths: ["50%", "50%", "50%"], children: [{
                                type: "button",
                                id: "IgnoreWord",
                                label: a.LocalizationButton.IgnoreWord.text,
                                title: "Ignore word",
                                style: "width: 100%;",
                                onLoad: function () {
                                    this.getElement().setAttribute("title-cmd",
                                        this.id);
                                    a.LocalizationButton.IgnoreWord.instance = this
                                },
                                onClick: g
                            }, {
                                type: "button",
                                id: "IgnoreAllWords",
                                label: a.LocalizationButton.IgnoreAllWords.text,
                                title: "Ignore all words",
                                style: "width: 100%;",
                                onLoad: function () {
                                    this.getElement().setAttribute("title-cmd", this.id);
                                    a.LocalizationButton.IgnoreAllWords.instance = this
                                },
                                onClick: g
                            }, {
                                type: "button",
                                id: "Options",
                                label: a.LocalizationButton.Options.text,
                                title: "Option",
                                style: "width: 100%;",
                                onLoad: function () {
                                    a.LocalizationButton.Options.instance = this;
                                    "file:" ==
                                    document.location.protocol && this.disable()
                                },
                                onClick: function () {
                                    this.getElement().focus();
                                    "file:" == document.location.protocol ? alert("WSC: Options functionality is disabled when runing from file system") : (u = document.activeElement, b.openDialog("options"))
                                }
                            }]
                        }]
                    }]
                }, {
                    type: "hbox",
                    id: "BlockFinishChecking",
                    style: "width:560px; margin: 0 auto;",
                    widths: ["70%", "30%"],
                    onShow: function () {
                        this.getElement().setStyles({display: "block", position: "absolute", left: "-9999px"})
                    },
                    onHide: q,
                    children: [{
                        type: "hbox", id: "leftCol",
                        align: "left", width: "70%", children: [{
                            type: "vbox",
                            id: "rightCol1",
                            setup: function () {
                                this.getChild()[0].getElement().$.src = a.logotype;
                                this.getChild()[0].getElement().getParent().setStyles({"text-align": "center"})
                            },
                            children: [{
                                type: "html",
                                id: "logo",
                                html: '<img width="99" height="68" border="0" src="" title="WebSpellChecker.net" alt="WebSpellChecker.net" style="display: inline-block;">'
                            }]
                        }]
                    }, {
                        type: "hbox", id: "rightCol", align: "right", width: "30%", children: [{
                            type: "vbox", id: "rightCol_col__left", children: [{
                                type: "button",
                                id: "Option_button",
                                label: a.LocalizationButton.Options.text,
                                title: "Option",
                                style: "width: 100%;",
                                onLoad: function () {
                                    this.getElement().setAttribute("title-cmd", this.id);
                                    "file:" == document.location.protocol && this.disable()
                                },
                                onClick: function () {
                                    this.getElement().focus();
                                    "file:" == document.location.protocol ? alert("WSC: Options functionality is disabled when runing from file system") : (u = document.activeElement, b.openDialog("options"))
                                }
                            }, {
                                type: "button",
                                id: "FinishChecking_button_block",
                                label: a.LocalizationButton.FinishChecking_button_block.text,
                                title: "Finish Checking",
                                style: "width: 100%;",
                                onLoad: function () {
                                    this.getElement().setAttribute("title-cmd", "FinishChecking")
                                },
                                onClick: g
                            }]
                        }]
                    }]
                }]
            }, {
                id: "GrammTab",
                label: "Grammar",
                accessKey: "G",
                elements: [{type: "html", id: "banner", label: "banner", style: "", html: "<div></div>"}, {
                    type: "html",
                    id: "Content",
                    label: "GrammarContent",
                    html: "",
                    setup: function () {
                        var b = a.iframeNumber + "_" + a.dialog._.currentTabId, c = document.getElementById(b);
                        a.targetFromFrame[b] = c.contentWindow
                    }
                }, {
                    type: "vbox", id: "bottomGroup", style: "width:560px; margin: 0 auto;",
                    children: [{
                        type: "hbox", id: "leftCol", widths: ["66%", "34%"], children: [{
                            type: "vbox",
                            children: [{
                                type: "text",
                                id: "text",
                                label: "Change to:",
                                labelLayout: "horizontal",
                                labelStyle: "font: 12px/25px arial, sans-serif;",
                                inputStyle: "float: right; width: 200px;",
                                "default": "",
                                onShow: function () {
                                    a.textNode.GrammTab = this
                                },
                                onHide: function () {
                                    this.reset()
                                }
                            }, {
                                type: "html",
                                id: "html_text",
                                html: "<div style='min-height: 17px; line-height: 17px; padding: 5px; text-align: left;background: #F1F1F1;color: #595959; white-space: normal!important;'></div>",
                                onShow: function () {
                                    a.textNodeInfo.GrammTab = this
                                }
                            }, {
                                type: "html", id: "radio", html: "", onShow: function () {
                                    a.grammerSuggest = this
                                }
                            }]
                        }, {
                            type: "vbox",
                            children: [{
                                type: "button",
                                id: "ChangeTo_button",
                                label: "Change to",
                                title: "Change to",
                                style: "width: 133px; float: right;",
                                onLoad: function () {
                                    this.getElement().setAttribute("title-cmd", "ChangeTo")
                                },
                                onClick: g
                            }, {
                                type: "button",
                                id: "IgnoreWord",
                                label: "Ignore word",
                                title: "Ignore word",
                                style: "width: 133px; float: right;",
                                onLoad: function () {
                                    this.getElement().setAttribute("title-cmd",
                                        this.id)
                                },
                                onClick: g
                            }, {
                                type: "button",
                                id: "IgnoreAllWords",
                                label: "Ignore Problem",
                                title: "Ignore Problem",
                                style: "width: 133px; float: right;",
                                onLoad: function () {
                                    this.getElement().setAttribute("title-cmd", this.id)
                                },
                                onClick: g
                            }, {
                                type: "button",
                                id: "FinishChecking_button",
                                label: a.LocalizationButton.FinishChecking_button.text,
                                title: "Finish Checking",
                                style: "width: 133px; float: right; margin-top: 9px;",
                                onLoad: function () {
                                    this.getElement().setAttribute("title-cmd", "FinishChecking")
                                },
                                onClick: g
                            }]
                        }]
                    }]
                }, {
                    type: "hbox",
                    id: "BlockFinishChecking",
                    style: "width:560px; margin: 0 auto;",
                    widths: ["70%", "30%"],
                    onShow: function () {
                        this.getElement().setStyles({display: "block", position: "absolute", left: "-9999px"})
                    },
                    onHide: q,
                    children: [{
                        type: "hbox", id: "leftCol", align: "left", width: "70%", children: [{
                            type: "vbox", id: "rightCol1", children: [{
                                type: "html",
                                id: "logo",
                                html: '<img width="99" height="68" border="0" src="" title="WebSpellChecker.net" alt="WebSpellChecker.net" style="display: inline-block;">',
                                setup: function () {
                                    this.getElement().$.src =
                                        a.logotype;
                                    this.getElement().getParent().setStyles({"text-align": "center"})
                                }
                            }]
                        }]
                    }, {
                        type: "hbox",
                        id: "rightCol",
                        align: "right",
                        width: "30%",
                        children: [{
                            type: "vbox",
                            id: "rightCol_col__left",
                            children: [{
                                type: "button",
                                id: "FinishChecking_button_block",
                                label: a.LocalizationButton.FinishChecking_button_block.text,
                                title: "Finish Checking",
                                style: "width: 100%;",
                                onLoad: function () {
                                    this.getElement().setAttribute("title-cmd", "FinishChecking")
                                },
                                onClick: g
                            }]
                        }]
                    }]
                }]
            }, {
                id: "Thesaurus", label: "Thesaurus", accessKey: "T", elements: [{
                    type: "html",
                    id: "banner", label: "banner", style: "", html: "<div></div>"
                }, {
                    type: "html", id: "Content", label: "spellContent", html: "", setup: function () {
                        var b = a.iframeNumber + "_" + a.dialog._.currentTabId, c = document.getElementById(b);
                        a.targetFromFrame[b] = c.contentWindow
                    }
                }, {
                    type: "vbox",
                    id: "bottomGroup",
                    style: "width:560px; margin: -10px auto; overflow: hidden;",
                    children: [{
                        type: "hbox", widths: ["75%", "25%"], children: [{
                            type: "vbox", children: [{
                                type: "hbox", widths: ["65%", "35%"], children: [{
                                    type: "text",
                                    id: "ChangeTo_label",
                                    label: a.LocalizationLabel.ChangeTo_label.text +
                                    ":",
                                    labelLayout: "horizontal",
                                    inputStyle: "width: 160px;",
                                    labelStyle: "font: 12px/25px arial, sans-serif;",
                                    "default": "",
                                    onShow: function () {
                                        a.textNode.Thesaurus = this;
                                        a.LocalizationLabel.ChangeTo_label.instance = this
                                    },
                                    onHide: function () {
                                        this.reset()
                                    }
                                }, {
                                    type: "button",
                                    id: "ChangeTo_button",
                                    label: a.LocalizationButton.ChangeTo_button.text,
                                    title: "Change to",
                                    style: "width: 121px; margin-top: 1px;",
                                    onLoad: function () {
                                        this.getElement().setAttribute("title-cmd", "ChangeTo");
                                        a.LocalizationButton.ChangeTo_button.instance =
                                            this
                                    },
                                    onClick: g
                                }]
                            }, {
                                type: "hbox",
                                children: [{
                                    type: "select",
                                    id: "Categories",
                                    label: a.LocalizationLabel.Categories.text + ":",
                                    labelStyle: "font: 12px/25px arial, sans-serif;",
                                    size: "5",
                                    inputStyle: "width: 180px; height: auto;",
                                    items: [],
                                    onShow: function () {
                                        a.selectNode.Categories = this;
                                        a.LocalizationLabel.Categories.instance = this
                                    },
                                    onChange: function () {
                                        a.buildOptionSynonyms(this.getValue())
                                    }
                                }, {
                                    type: "select",
                                    id: "Synonyms",
                                    label: a.LocalizationLabel.Synonyms.text + ":",
                                    labelStyle: "font: 12px/25px arial, sans-serif;",
                                    size: "5",
                                    inputStyle: "width: 180px; height: auto;",
                                    items: [],
                                    onShow: function () {
                                        a.selectNode.Synonyms = this;
                                        a.textNode.Thesaurus.setValue(this.getValue());
                                        a.LocalizationLabel.Synonyms.instance = this
                                    },
                                    onChange: function () {
                                        a.textNode.Thesaurus.setValue(this.getValue())
                                    }
                                }]
                            }]
                        }, {
                            type: "vbox", width: "120px", style: "margin-top:46px;", children: [{
                                type: "html",
                                id: "logotype",
                                label: "WebSpellChecker.net",
                                html: '<img width="99" height="68" border="0" src="" title="WebSpellChecker.net" alt="WebSpellChecker.net" style="display: inline-block;">',
                                setup: function () {
                                    this.getElement().$.src = a.logotype;
                                    this.getElement().getParent().setStyles({"text-align": "center"})
                                }
                            }, {
                                type: "button",
                                id: "FinishChecking_button",
                                label: a.LocalizationButton.FinishChecking_button.text,
                                title: "Finish Checking",
                                style: "width: 100%; float: right; margin-top: 9px;",
                                onLoad: function () {
                                    this.getElement().setAttribute("title-cmd", "FinishChecking")
                                },
                                onClick: g
                            }]
                        }]
                    }]
                }, {
                    type: "hbox",
                    id: "BlockFinishChecking",
                    style: "width:560px; margin: 0 auto;",
                    widths: ["70%", "30%"],
                    onShow: function () {
                        this.getElement().setStyles({
                            display: "block",
                            position: "absolute", left: "-9999px"
                        })
                    },
                    children: [{
                        type: "hbox",
                        id: "leftCol",
                        align: "left",
                        width: "70%",
                        children: [{
                            type: "vbox",
                            id: "rightCol1",
                            children: [{
                                type: "html",
                                id: "logo",
                                html: '<img width="99" height="68" border="0" src="" title="WebSpellChecker.net" alt="WebSpellChecker.net" style="display: inline-block;">',
                                setup: function () {
                                    this.getElement().$.src = a.logotype;
                                    this.getElement().getParent().setStyles({"text-align": "center"})
                                }
                            }]
                        }]
                    }, {
                        type: "hbox", id: "rightCol", align: "right", width: "30%", children: [{
                            type: "vbox",
                            id: "rightCol_col__left",
                            children: [{
                                type: "button",
                                id: "FinishChecking_button_block",
                                label: a.LocalizationButton.FinishChecking_button_block.text,
                                title: "Finish Checking",
                                style: "width: 100%;",
                                onLoad: function () {
                                    this.getElement().setAttribute("title-cmd", "FinishChecking")
                                },
                                onClick: g
                            }]
                        }]
                    }]
                }]
            }]
        }
    });
    var u = null;
    CKEDITOR.dialog.add("options", function () {
        var b = null, c = {}, d = {}, e = null, f = null;
        h.cookie.get("udn");
        h.cookie.get("osp");
        var g = function () {
            f = this.getElement().getAttribute("title-cmd");
            var a = [];
            a[0] = d.IgnoreAllCapsWords;
            a[1] = d.IgnoreWordsNumbers;
            a[2] = d.IgnoreMixedCaseWords;
            a[3] = d.IgnoreDomainNames;
            a = a.toString().replace(/,/g, "");
            h.cookie.set("osp", a);
            h.cookie.set("udnCmd", f ? f : "ignore");
            "delete" != f && (a = "", "" !== n.getValue() && (a = n.getValue()), h.cookie.set("udn", a));
            h.postMessage.send({id: "options_dic_send"})
        }, i = function () {
            e.getElement().setHtml(a.LocalizationComing.error);
            e.getElement().show()
        };
        return {
            title: a.LocalizationComing.Options,
            minWidth: 430,
            minHeight: 130,
            resizable: CKEDITOR.DIALOG_RESIZE_NONE,
            contents: [{
                id: "OptionsTab",
                label: "Options",
                accessKey: "O",
                elements: [{
                    type: "hbox",
                    id: "options_error",
                    children: [{
                        type: "html",
                        style: "display: block;text-align: center;white-space: normal!important; font-size: 12px;color:red",
                        html: "<div></div>",
                        onShow: function () {
                            e = this
                        }
                    }]
                }, {
                    type: "vbox", id: "Options_content", children: [{
                        type: "hbox", id: "Options_manager", widths: ["52%", "48%"], children: [{
                            type: "fieldset",
                            label: "Spell Checking Options",
                            style: "border: none;margin-top: 13px;padding: 10px 0 10px 10px",
                            onShow: function () {
                                this.getInputElement().$.children[0].innerHTML =
                                    a.LocalizationComing.SpellCheckingOptions
                            },
                            children: [{
                                type: "vbox",
                                id: "Options_checkbox",
                                children: [{
                                    type: "checkbox",
                                    id: "IgnoreAllCapsWords",
                                    label: "Ignore All-Caps Words",
                                    labelStyle: "margin-left: 5px; font: 12px/16px arial, sans-serif;display: inline-block;white-space: normal;",
                                    style: "float:left; min-height: 16px;",
                                    "default": "",
                                    onClick: function () {
                                        d[this.id] = !this.getValue() ? 0 : 1
                                    }
                                }, {
                                    type: "checkbox",
                                    id: "IgnoreWordsNumbers",
                                    label: "Ignore Words with Numbers",
                                    labelStyle: "margin-left: 5px; font: 12px/16px arial, sans-serif;display: inline-block;white-space: normal;",
                                    style: "float:left; min-height: 16px;",
                                    "default": "",
                                    onClick: function () {
                                        d[this.id] = !this.getValue() ? 0 : 1
                                    }
                                }, {
                                    type: "checkbox",
                                    id: "IgnoreMixedCaseWords",
                                    label: "Ignore Mixed-Case Words",
                                    labelStyle: "margin-left: 5px; font: 12px/16px arial, sans-serif;display: inline-block;white-space: normal;",
                                    style: "float:left; min-height: 16px;",
                                    "default": "",
                                    onClick: function () {
                                        d[this.id] = !this.getValue() ? 0 : 1
                                    }
                                }, {
                                    type: "checkbox",
                                    id: "IgnoreDomainNames",
                                    label: "Ignore Domain Names",
                                    labelStyle: "margin-left: 5px; font: 12px/16px arial, sans-serif;display: inline-block;white-space: normal;",
                                    style: "float:left; min-height: 16px;",
                                    "default": "",
                                    onClick: function () {
                                        d[this.id] = !this.getValue() ? 0 : 1
                                    }
                                }]
                            }]
                        }, {
                            type: "vbox", id: "Options_DictionaryName", children: [{
                                type: "text",
                                id: "DictionaryName",
                                style: "margin-bottom: 10px",
                                label: "Dictionary Name:",
                                labelLayout: "vertical",
                                labelStyle: "font: 12px/25px arial, sans-serif;",
                                "default": "",
                                onLoad: function () {
                                    n = this;
                                    this.setValue(a.userDictionaryName ? a.userDictionaryName : (h.cookie.get("udn"), this.getValue()))
                                },
                                onShow: function () {
                                    n = this;
                                    this.setValue(!h.cookie.get("udn") ?
                                        this.getValue() : h.cookie.get("udn"));
                                    this.setLabel(a.LocalizationComing.DictionaryName)
                                },
                                onHide: function () {
                                    this.reset()
                                }
                            }, {
                                type: "hbox", id: "Options_buttons", children: [{
                                    type: "vbox",
                                    id: "Options_leftCol_col",
                                    widths: ["50%", "50%"],
                                    children: [{
                                        type: "button",
                                        id: "create",
                                        label: "Create",
                                        title: "Create",
                                        style: "width: 100%;",
                                        onLoad: function () {
                                            this.getElement().setAttribute("title-cmd", this.id)
                                        },
                                        onShow: function () {
                                            (this.getElement().getFirst() || this.getElement()).setText(a.LocalizationComing.Create)
                                        },
                                        onClick: g
                                    },
                                        {
                                            type: "button",
                                            id: "restore",
                                            label: "Restore",
                                            title: "Restore",
                                            style: "width: 100%;",
                                            onLoad: function () {
                                                this.getElement().setAttribute("title-cmd", this.id)
                                            },
                                            onShow: function () {
                                                (this.getElement().getFirst() || this.getElement()).setText(a.LocalizationComing.Restore)
                                            },
                                            onClick: g
                                        }]
                                }, {
                                    type: "vbox", id: "Options_rightCol_col", widths: ["50%", "50%"], children: [{
                                        type: "button",
                                        id: "rename",
                                        label: "Rename",
                                        title: "Rename",
                                        style: "width: 100%;",
                                        onLoad: function () {
                                            this.getElement().setAttribute("title-cmd", this.id)
                                        },
                                        onShow: function () {
                                            (this.getElement().getFirst() ||
                                            this.getElement()).setText(a.LocalizationComing.Rename)
                                        },
                                        onClick: g
                                    }, {
                                        type: "button",
                                        id: "delete",
                                        label: "Remove",
                                        title: "Remove",
                                        style: "width: 100%;",
                                        onLoad: function () {
                                            this.getElement().setAttribute("title-cmd", this.id)
                                        },
                                        onShow: function () {
                                            (this.getElement().getFirst() || this.getElement()).setText(a.LocalizationComing.Remove)
                                        },
                                        onClick: g
                                    }]
                                }]
                            }]
                        }]
                    }, {
                        type: "hbox", id: "Options_text", children: [{
                            type: "html",
                            style: "text-align: justify;margin-top: 15px;white-space: normal!important; font-size: 12px;color:#777;",
                            html: "<div>" +
                            a.LocalizationComing.OptionsTextIntro + "</div>",
                            onShow: function () {
                                this.getElement().setText(a.LocalizationComing.OptionsTextIntro)
                            }
                        }]
                    }]
                }]
            }],
            buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton],
            onOk: function () {
                var a = [];
                a[0] = d.IgnoreAllCapsWords;
                a[1] = d.IgnoreWordsNumbers;
                a[2] = d.IgnoreMixedCaseWords;
                a[3] = d.IgnoreDomainNames;
                a = a.toString().replace(/,/g, "");
                h.cookie.set("osp", a);
                h.postMessage.send({id: "options_checkbox_send"});
                e.getElement().hide();
                e.getElement().setHtml(" ")
            },
            onLoad: function () {
                b =
                    this;
                c.IgnoreAllCapsWords = b.getContentElement("OptionsTab", "IgnoreAllCapsWords");
                c.IgnoreWordsNumbers = b.getContentElement("OptionsTab", "IgnoreWordsNumbers");
                c.IgnoreMixedCaseWords = b.getContentElement("OptionsTab", "IgnoreMixedCaseWords");
                c.IgnoreDomainNames = b.getContentElement("OptionsTab", "IgnoreDomainNames")
            },
            onShow: function () {
                h.postMessage.init(i);
                var b = h.cookie.get("osp").split("");
                d.IgnoreAllCapsWords = b[0];
                d.IgnoreWordsNumbers = b[1];
                d.IgnoreMixedCaseWords = b[2];
                d.IgnoreDomainNames = b[3];
                !parseInt(d.IgnoreAllCapsWords,
                    10) ? c.IgnoreAllCapsWords.setValue("", !1) : c.IgnoreAllCapsWords.setValue("checked", !1);
                !parseInt(d.IgnoreWordsNumbers, 10) ? c.IgnoreWordsNumbers.setValue("", !1) : c.IgnoreWordsNumbers.setValue("checked", !1);
                !parseInt(d.IgnoreMixedCaseWords, 10) ? c.IgnoreMixedCaseWords.setValue("", !1) : c.IgnoreMixedCaseWords.setValue("checked", !1);
                !parseInt(d.IgnoreDomainNames, 10) ? c.IgnoreDomainNames.setValue("", !1) : c.IgnoreDomainNames.setValue("checked", !1);
                d.IgnoreAllCapsWords = !c.IgnoreAllCapsWords.getValue() ? 0 : 1;
                d.IgnoreWordsNumbers =
                    !c.IgnoreWordsNumbers.getValue() ? 0 : 1;
                d.IgnoreMixedCaseWords = !c.IgnoreMixedCaseWords.getValue() ? 0 : 1;
                d.IgnoreDomainNames = !c.IgnoreDomainNames.getValue() ? 0 : 1;
                c.IgnoreAllCapsWords.getElement().$.lastChild.innerHTML = a.LocalizationComing.IgnoreAllCapsWords;
                c.IgnoreWordsNumbers.getElement().$.lastChild.innerHTML = a.LocalizationComing.IgnoreWordsWithNumbers;
                c.IgnoreMixedCaseWords.getElement().$.lastChild.innerHTML = a.LocalizationComing.IgnoreMixedCaseWords;
                c.IgnoreDomainNames.getElement().$.lastChild.innerHTML =
                    a.LocalizationComing.IgnoreDomainNames
            },
            onHide: function () {
                h.postMessage.unbindHandler(i);
                if (u)try {
                    u.focus()
                } catch (a) {
                }
            }
        }
    });
    CKEDITOR.dialog.on("resize", function (b) {
        var b = b.data, c = b.dialog, d = CKEDITOR.document.getById(a.iframeNumber + "_" + c._.currentTabId);
        "checkspell" == c._.name && (a.bnr ? d && d.setSize("height", b.height - 310) : d && d.setSize("height", b.height - 220), c._.fromResizeEvent && !c._.resized && (c._.resized = !0), c._.fromResizeEvent = !0)
    });
    CKEDITOR.on("dialogDefinition", function (b) {
        if ("checkspell" === b.data.name) {
            var c =
                b.data.definition;
            a.onLoadOverlay = new x({opacity: "1", background: "#fff", target: c.dialog.parts.tabs.getParent().$});
            a.onLoadOverlay.setEnable();
            c.dialog.on("cancel", function () {
                c.dialog.getParentEditor().config.wsc_onClose.call(this.document.getWindow().getFrame());
                a.div_overlay.setDisable();
                a.onLoadOverlay.setDisable();
                return !1
            }, this, null, -1)
        }
    })
})();
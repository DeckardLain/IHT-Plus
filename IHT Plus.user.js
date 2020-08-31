// ==UserScript==
// @name         IHT Plus
// @namespace    http://www.hanalani.org
// @version      0.1.0
// @description  I'm Healthy Today Dashboard QOL additions
// @author       Scott Yoshimura
// @match        https://*.imhealthytodayschools.com/dashboard/*
// @grant        none
// @run-at       document-end
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js
// ==/UserScript==

/* Copyright (C) 2018-2020  Hanalani Schools

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>. */

// ----------------------------------------[INDEX001]--------------------------------------
// ---------------------------------------Main Section-------------------------------------
// ----------------------------------------------------------------------------------------

this.$ = this.jQuery = jQuery.noConflict(true);

// Check for page hashchanges
// Borrowed from: https://stackoverflow.com/questions/18989345/how-do-i-reload-a-greasemonkey-script-when-ajax-changes-the-url-without-reloadin
var fireOnHashChangesToo    = true;
var pageURLCheckTimer       = setInterval (
    function () {
        if (   this.lastPathStr  !== location.pathname
            || this.lastQueryStr !== location.search
            || (fireOnHashChangesToo && this.lastHashStr !== location.hash)
        ) {
            this.lastPathStr  = location.pathname;
            this.lastQueryStr = location.search;
            this.lastHashStr  = location.hash;
            setTimeout(gmMain, 100);

        }
    }
    , 111
);

// Load all mods
function gmMain(){

    console.log("Function: " + arguments.callee.name)
    var strURL = window.location.href

    ViewShortcuts()
    Highlight()
}

function ViewShortcuts()
{
    console.log("Function: " + arguments.callee.name)

    $(".search-input").keydown(function (e){
        switch (e.keyCode)
        {
            case 13:
            case 49:
                $("#detail-s").find(".btn-info").eq(0).click();
                e.preventDefault();
                break;
            case 50:
                $("#detail-s").find(".btn-info").eq(1).click();
                e.preventDefault();
                break;
            case 51:
                $("#detail-s").find(".btn-info").eq(2).click();
                e.preventDefault();
                break;
            case 52:
                $("#detail-s").find(".btn-info").eq(3).click();
                e.preventDefault();
                break;
            case 53:
                $("#detail-s").find(".btn-info").eq(4).click();
                e.preventDefault();
                break;
        }
    })

    $(document).keyup(function(e) {
        if (e.key === "Escape")
        {
            $(".close").eq(0).click();
            $(".search-input").val("")
        }
    })
}

function Highlight()
{
    console.log("Function: " + arguments.callee.name)

    const modal = document.getElementById("myModal-content");
    const config = { subtree: true, childList: true };

    const callback = function(mutationsList, observer)
    {
        if ($("#myModal-content").find("th:first").text() == "Date")
        {
            var firstDate = $("#myModal-content").find("td:first")
            if (firstDate.text() == moment().format("YYYY-MM-DD"))
            {
                $(firstDate).closest("tr").css({ 'background-color' : $(firstDate).siblings("td").eq(1).text() });
            } else
            {
                $(firstDate).closest("tr").css({ 'background-color' : 'DimGray' });
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(modal, config);
}

































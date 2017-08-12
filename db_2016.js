// ==UserScript==
// @name        KaniWani Audio
// @namespace   kaniwani-audio.sd.net.nz
// @description Audio reinforcement for KaniWani vocabulary
// @version     0.0.3-dev
// @include     https://www.kaniwani.com/kw/review
// @copyright   2016-2017, Stephen Davis
// @license     MIT; http://opensource.org/licenses/MIT
// @run-at      document-end
// @grant       none
// ==/UserScript==
// http://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js

(function() {
    'use strict';

    var dbName = "kaniwani-audio.sd.net.nz";
    var dbVersion = 1;

    var getWordFromReviewPage = function getWordFromPage() {
        var span = $("#character span");
        var text = null;
        if (span && span[0]) {
            text = span[0].innerHTML;
        }
        return text || null;
    };

    var getWordFromVocabPage = function getWordFromPage() {
        var span = $("span.vocabulary-icon span");
        var text = null;
        if (span && span[0]) {
            text = span[0].innerHTML;
        }
        return text || null;
    };

    var getAudioLinksFromReviewPage = function getAudioLinksFromPage() {
        var audios = $("#option-audio audio source");
        var retval = {};
        if(audios) {
            $.each(audios, function(idx, audio_elem) {
                retval[audio_elem.type] = audio_elem.src;
            });
        }
        return retval;
    };

    var getAudioLinksFromVocabPage = function getAudioLinksFromVocabPage() {
        var audios = $(".vocabulary-reading audio source");
        var retval = {};
        if(audios) {
            $.each(audios, function(idx, audio_elem) {
                retval[audio_elem.type] = audio_elem.src;
            });
        }
        return retval;
    };

    var getMode = function getMode() {
        var hostname = window.location.host;
        var path = window.location.pathname;
        if(hostname.match("wanikani.com")) {
            if(path.match("^/vocabulary/")) {
                return "vocab";
            } else if(path.match("^/review/session")) {
                return "review";
            } else if(path.match("^/review/lesson")) {
                return "lesson";
            }
        } else if(hostname.match("kaniwani.com")) {
            return "kaniwani";
        }
        return "none";
    };

    // In WaniKani mode
    // Loop words from page (review, lesson, vocab page)
    // For each reading, find audio link
    // Save path to localstorage

    // In KaniWani mode
    // See if we are reviewing a vocab item
    // On success, see if link in database
    // if so, play audio.

    var mode = getMode();
    var db = window.indexedDB;



    var storeAudioPathsForWord = function storeAudioPathsForWord(word, audio_links) {
        var request = db.open(dbName, dbVersion);
        request.onerror = function storeAudioPathsForWord_request_onerror(event) {
            console.error("Database error: " + event.target.errorCode);
        };
        request.onsuccess = function storeAudioPathsForWord_request_onsuccess(event) {
        };
        request.onupgradeneeded = function storeAudioPathsForWord_request_onupgradeneeded(event) {
            var e_db = event.target.result;
            var objectStore = e_db.createObjectStore("name", { keyPath: "myKey" });
        };
    };

    var dumpAudioPaths = function dumpAudioPaths() {
    };

    var main = function main(mode) {
        var word;
        var audio_links;

        if(mode === "kaniwani") {
        } else {
            if(mode === "review") {
                word = getWordFromReviewPage();
                audio_links = getAudioLinksFromReviewPage();
            } else if(mode === "lesson") {
            } else if(mode === "vocab") {
                word = getWordFromVocabPage();
                audio_links = getAudioLinksFromVocabPage();
            }
            console.log("Mode is " + mode);
            console.log("Word is " + word);
            console.log("MPEG is " + audio_links["audio/mpeg"]);
        }

    };

    if(!db) {
        console.error("No indexedDB!");
    } else {
        main(mode);
    }
})();
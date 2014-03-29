Accents.module("Utils", function(Utils, App, Backbone, Marionette, $, _)  {

    var dotUnders = function (word) {
        // vowels
        word = word.replace(/\^a/g, 'á');
        word = word.replace(/\^i/g, 'í');
        word = word.replace(/\^u/g, 'ú');
        word = word.replace(/\^A/g, 'Á');
        word = word.replace(/\^I/g, 'Í');
        word = word.replace(/\^U/g, 'Ú');
        word = word.replace(/\`a/g, 'á');
        word = word.replace(/\`i/g, 'í');
        word = word.replace(/\`u/g, 'ú');
        word = word.replace(/\`A/g, 'Á');
        word = word.replace(/\`I/g, 'Í');
        word = word.replace(/\`U/g, 'Ú');
        // dot-unders
        word = word.replace(/\.H/g, 'Ḥ');
        word = word.replace(/\.h/g, 'ḥ');
        word = word.replace(/\.D/g, 'Ḍ');
        word = word.replace(/\.d/g, 'ḍ');
        word = word.replace(/\.T/g, 'Ṭ');
        word = word.replace(/\.t/g, 'ṭ');
        word = word.replace(/\.Z/g, 'Ẓ');
        word = word.replace(/\.z/g, 'ẓ');
        word = word.replace(/\.S/g, 'Ṣ');
        word = word.replace(/\.s/g, 'ṣ');
        // ayn and hamza
        word = word.replace(/[\'|‘|’]9/g, '’'); // |‘|’
        word = word.replace(/[\'|‘|’]6/g, '‘');
        word = word.replace(/[\'|‘|’]hamza/g, '’');
        word = word.replace(/[\'|‘|’]ayn/g, '‘');
        word = word.replace(/’’/g, '‘');
        word = word.replace(/‘’/g, '’');

        return word;
    };

    var lineUnder2HTML= function (word) {
        word = word.replace(/_([s|d|z|t|g|k|c][h])/ig, "<u>$1</u>");
        return word;
    };

    var smartQuotes = function (a) {
      a = a.replace(/(^|[-\u2014\s(\["])'/g, "$1\u2018");       // opening singles
      a = a.replace(/'/g, "\u2019");                            // closing singles & apostrophes
      //a = a.replace(/(^|[-\u2014/\[(\u2018\s])"/g, "$1\u201c"); // opening doubles
      //a = a.replace(/"/g, "\u201d");                            // closing doubles
      //a = a.replace(/--/g, "\u2014");                           // em-dashes
      return a
    };





   // public utilities

    Utils.randomTerm = function() {
        return {
            id: Utils.genUUID('xxxxxxxxxx'),
            term: _.shuffle([ 'Bahá', 'Abhá', 'Shoghi', 'Effendi', 'Báb', 'Quddús', 'Mulla', 'Ḥusayn' ])[0],
            ref: _.shuffle(['GPB', 'GWB', 'KIQ', 'SWA', 'HW', 'SAQ'])[0] + ', pg. ' + Math.floor(Math.random()*300),
            type: 'term',
            user: _.shuffle([ 'Chad', 'Dan', 'Ghazala', 'Bob', 'Liliane', 'Farhad', 'Gilbert', 'George' ])[0],
        };
    };

    Utils.genUUID = function (pattern) {
        pattern = pattern || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        var uuid = pattern.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        return uuid;
    };

    Utils.importTermList = function (filename) {  // should be a comma or whitespace delimited file.
        return filename;
    };

    Utils.renderTypedTerm = function (term) {  // should be a comma or whitespace delimited file.
        term = dotUnders(term);
        term = lineUnder2HTML(term);
        term = smartQuotes(term);
        return term;
    };

    Utils.renderGlyph2UTF = function (term) {  // should be a comma or whitespace delimited file.
        term = smartQuotes(term);
        term = dotUnders(term);
        return term;
    };
    Utils.ilm2HTML = function (term) { // this only needs to render line unders, the rest is already part of ilm UTF-8
        return lineUnder2HTML(term);
    }



});


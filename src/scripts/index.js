'use strict';

(function() {
    var sectionHeaders = document.querySelectorAll('section > header');
    var headerArray = Array.prototype.slice.call(sectionHeaders);

    headerArray.forEach(function (header) {
        header.addEventListener('mouseover', randomizeHeaderColor);
        header.addEventListener('mouseout', resetHeaderColor);

        header.addEventListener('touchstart', touchHeaderColor);
    });

    function touchHeaderColor(event) {
        var header = event.target;

        if (event.target.classList.contains('randomizing')) {
            resetHeaderColor(event);
        } else {
            randomizeHeaderColor(event);
        }
    }

    function randomizeHeaderColor(event) {
        var header = event.target;

        header.classList.add('randomizing');
        changeHeaderColor(header);
    }

    function changeHeaderColor(header) {
        var color = [null, null, null, null, null, null].map(pickHex);

        header.style.backgroundColor = '#' + color.join('');

        setTimeout(function() {
            if (header.classList.contains('randomizing')) {
                changeHeaderColor(header);
            }
        }, 250);
    }

    function pickHex() {
        var hex = [
            '0', '1', '2', '3',
            '4', '5', '6', '7',
            '8', '9', 'A', 'B',
            'C', 'D', 'E', 'F'
        ];
        // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        var digit = Math.floor(Math.random() * (15 - 1));

        return hex[digit];
    }

    function resetHeaderColor(event) {
        var header = event.target;

        header.classList.remove('randomizing');
        header.style.backgroundColor = '';
        header.style.backgroundImage = '';
    }
})();

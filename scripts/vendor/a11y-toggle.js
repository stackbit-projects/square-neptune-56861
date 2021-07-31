if (process.browser) {

(function () {
    'use strict';

    var internalId = 0;
    var togglesMap = {};
    var targetsMap = {};

    function $ (selector, context) {
      return Array.prototype.slice.call(
        (context || document).querySelectorAll(selector)
      );
    }

    function getClosestToggle (element) {
      if (element.closest) {
        return element.closest('[data-a11y-toggle]');
      }

      while (element) {
        if (element.nodeType === 1 && element.hasAttribute('data-a11y-toggle')) {
          return element;
        }

        element = element.parentNode;
      }

      return null;
    }

    function handleToggle (toggle) {
      var target = toggle && targetsMap[toggle.getAttribute('aria-controls')];

      if (!target) {
        return false;
      }

      var toggles = togglesMap['#' + target.id];
      var isExpanded = target.getAttribute('aria-hidden') === 'false';

      target.setAttribute('aria-hidden', isExpanded);
      toggles.forEach(function (toggle) {
        toggle.setAttribute('aria-expanded', !isExpanded);
      });

      // scroll down to target
      if(!isExpanded){
          jQuery("#"+target.id).attr("tabindex",-1).focus();
          jQuery('html, body').animate({
            'scrollTop':  jQuery("#"+target.id).offset().top
        }, 1000);
      }
    }

    var initA11yToggle = function (context) {
      togglesMap = $('[data-a11y-toggle]', context).reduce(function (acc, toggle) {
        var selector = '#' + toggle.getAttribute('data-a11y-toggle');
        acc[selector] = acc[selector] || [];
        acc[selector].push(toggle);
        return acc;
      }, togglesMap);

      var targets = Object.keys(togglesMap);
      targets.length && $(targets).forEach(function (target) {
        var toggles = togglesMap['#' + target.id];
        var isExpanded = target.hasAttribute('data-a11y-toggle-open');
        var labelledby = [];

        toggles.forEach(function (toggle) {
          toggle.id || toggle.setAttribute('id', 'a11y-toggle-' + internalId++);
          toggle.setAttribute('aria-controls', target.id);
          toggle.setAttribute('aria-expanded', isExpanded);
          labelledby.push(toggle.id);
        });

        target.setAttribute('aria-hidden', !isExpanded);
        target.hasAttribute('aria-labelledby') || target.setAttribute('aria-labelledby', labelledby.join(' '));

        targetsMap[target.id] = target;
      });

      function collapse (toggle) {
        var collapsibleBox = document.getElementById(toggle.getAttribute('data-a11y-toggle'))
        collapsibleBox.setAttribute('aria-hidden', true)
        toggle.setAttribute('aria-expanded', false)
      }

      function collapseAll (event) {
        toggles
          .filter(function (t) {
            return t !== event.target
          })
          .forEach(collapse)
      }

      var toggles = Array.prototype.slice.call(
        document.querySelectorAll('[data-a11y-toggle]')
      )

      toggles.forEach(function (toggle) {
        toggle.addEventListener('click', collapseAll)
      })
    };

    document.addEventListener('DOMContentLoaded', function () {
      initA11yToggle();
    });

    document.addEventListener('click', function (event) {
      if(!event.target.hasAttribute("data-a11y-toggle")) return;
      event.preventDefault();
      var toggle = getClosestToggle(event.target);
      handleToggle(toggle);
    });

    document.addEventListener('keyup', function (event) {
      if (event.which === 13 || event.which === 32) {
        event.preventDefault();
        var toggle = getClosestToggle(event.target);
        if (toggle && toggle.getAttribute('role') === 'button') {
          handleToggle(toggle);
        }
      }
    });

    window && (window.a11yToggle = initA11yToggle);
  })();
}

'use strict';

if (process.browser) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      var inEditor = document.querySelector('.on-page-editor');

      // get chatbot element from the page
      var chatbot = document.querySelector('.c-chatbot');
      var iframeOrigin = 'https://chatbot.guidedogs.org.uk';
      // media query for adding no-scroll or not
      var mql = window.matchMedia('(min-width: 60em)');
      
      if (chatbot && chatbot.dataset.sdk != '' && !inEditor) {
        // build the iframeorigin based on the path to the sdk being used
        var path = chatbot.dataset.sdk.split('/');
        var protocol = path[0];
        var host = path[2];
        iframeOrigin = protocol + '//' + host;
      
        // append the sdk script to the page and then initialise
        loadScript(chatbot.dataset.sdk).then(function () {
          initChatbot();
        }).catch(function () {
          console.error('Unable to load chatbot');
        });
      }
    

    function loadScript(scriptUrl) {
      var script = document.createElement('script');
      script.src = scriptUrl;
      document.body.appendChild(script);
    
      return new Promise(function (res, rej) {
        script.onload = res;
        script.onerror = rej;
      });
    }
    
    var chatbotLoaderOptions = {
      containerClass: 'lex-web-ui-iframe',
      elementId: 'lex-web-ui-iframe'
    };
    
    function initChatbot() {
      var chatbotUiOptions = {
        parentOrigin: window.location.origin
      };
      GuideDogs.Chatbot(chatbotLoaderOptions, chatbotUiOptions);
    }
    
    /***********************************************************
     *                                                         *
     * Event Handling Examples:                                *
     * showing communication between Chatbot & main website   *
     * useful for things like deactivate main site scrolling   *
     * chatbot is open                                         *
     *                                                         *
     **********************************************************/
    
    window.addEventListener('message', onMessageFromChatBot, false);
    
    /**
     * Example of receiving all messages from chatbot
     * @param {*} evt
     */
    function onMessageFromChatBot(evt) {
      // security check
      if (evt.origin !== iframeOrigin) {
        //console.warn('postMessage from invalid origin', evt.origin);
        return;
      }
      if (!evt.ports) {
        //console.error('postMessage not sent over MessageChannel', evt);
        return;
      }
    
      switch (evt.data.event) {
        case 'ready':
          onLexWebUiReady(evt);
          break;
        case 'toggleMinimizeUi':
          onToggleMinimizeUi(evt);
          break;
        // other handlers go here
        default:
          //console.log('unknown message in event', evt);
          break;
      }
    }
    
    /**
     *
     * @param {*} evt
     */
    function onLexWebUiReady(evt) {
      //console.log('Chatbot lexWebUiReady()');
      var iframeElement = document.getElementById(chatbotLoaderOptions.elementId);
      var isUiMinimized = document.body.classList.contains('lex-web-ui-iframe--minimize');
      toggleMinimizeUi(isUiMinimized);
    
      // We are just sending a ping request here as an example
      // This example uses an event instead of calling
      // iframeLoader.api.ping() to show the asynchronous
      // event API alternative
      var event = new CustomEvent('lexWebUiMessage', { detail: { message: { event: 'ping' } } });
      document.dispatchEvent(event);
    }
    
    /**
     * Toggle parent page scrolling on/off based on if chatbot is open
     * @param {*} evt
     */
    function onToggleMinimizeUi(evt) {
      toggleMinimizeUi(evt.data.state.isUiMinimized);
      evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });
    }
    
    function toggleMinimizeUi(isUiMinimized) {
      // if smaller than the mobile media query...
      if (!mql.matches) {
        var bodyClasses = document.body.classList;
        if (!isUiMinimized && !bodyClasses.contains("no-scroll")) {
          bodyClasses.add("no-scroll");
        } else if (isUiMinimized && bodyClasses.contains("no-scroll")) {
          bodyClasses.remove("no-scroll");
        }
      }
    }
  }, Number(process.env.NEXT_PUBLIC_CHATBOT_DELAY));
  });
}

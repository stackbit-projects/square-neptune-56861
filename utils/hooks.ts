import React from 'react'

// Kuddos to https://usehooks.com/useScript/
export function useScript(src) {
  const [scriptStatus, setScriptStatus] = React.useState<"idle"| "loading"| "ready"| "error">(src ? "loading" : "idle");

  React.useEffect(() => {
    // Allow falsy src value if waiting on other data needed for
    // constructing the script URL passed to this hook.
    if (!src) {
      setScriptStatus("idle");
      return;
    }

    // Fetch existing script element by src
    // It may have been added by another intance of this hook
    let script: any = document.querySelector(`script[src="${src}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-status", "loading");
      document.body.appendChild(script);

      // Store status in attribute on script
      // This can be read by other instances of this hook
      const setAttributeFromEvent = (event) => {
        script.setAttribute(
          "data-status",
          event.type === "load" ? "ready" : "error"
        );
      };

      script.addEventListener("load", setAttributeFromEvent);
      script.addEventListener("error", setAttributeFromEvent);
    } else {
      // Grab existing script status from attribute and set to state.
      setScriptStatus(script.getAttribute("data-status"));
    }

    // Script event handler to update status in state
    // Note: Even if the script already exists we still need to add
    // event handlers to update the state for *this* hook instance.
    const setStateFromEvent = (event) => {
      setScriptStatus(event.type === "load" ? "ready" : "error");
    };

    // Add event listeners
    script.addEventListener("load", setStateFromEvent);
    script.addEventListener("error", setStateFromEvent);

    // Remove event listeners on cleanup
    return () => {
      if (script) {
        script.removeEventListener("load", setStateFromEvent);
        script.removeEventListener("error", setStateFromEvent);
      }
    };
  }, [src]);

  return scriptStatus;
}
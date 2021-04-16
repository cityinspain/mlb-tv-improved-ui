function toggleStatPanel() {
  const panel = document.getElementById("mlbtv-stats-panel");
  if (panel.style.flexGrow) {
    panel.style.flexGrow = "";
  } else {
    panel.style.flexGrow = "1";
  }
}

function setupToggle() {
  const panel = document.getElementById("mlbtv-stats-panel");
  panel.style.maxWidth = "-moz-fit-content";
  panel.style.maxWidth = "fit-content";
  panel.style.width = "0";
  panel.style.flexGrow = "1";
  panel.style.transition = "all .2s ease";
}

function createButton() {
  const menuRight = document.getElementsByClassName("mlbtv-menu-right")[0];
  let togglePanelButton = document.createElement("BUTTON");
  togglePanelButton.innerHTML = "Toggle Stat Panel";
  togglePanelButton.className = "mlbtv-menu-right__item toggle-stat-panel";
  togglePanelButton.onclick = toggleStatPanel;
  menuRight.appendChild(togglePanelButton);
}

const targetNode = document.getElementById("app");

const cfg = { attributes: true, childList: true, subtree: true };

const callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for (const mutation of mutationsList) {
    // unsafeWindow.
    if (mutation.type === "childList") {
      console.log("mutation: target: ", mutation.target);
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach((n) => {
          if (n.textContent.includes("Settings")) {
            setupToggle();
            createButton();
          }
        });
      }
    }
  }
};

const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
if (targetNode instanceof HTMLElement) {
  observer.observe(targetNode, cfg);
}

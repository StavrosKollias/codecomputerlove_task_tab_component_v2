window.addEventListener("resize", () => {
   const textAreaActive = document.querySelector(".active-tab-block").children[1];
   handleTextAreaHeight(textAreaActive);
   const containers = getContainersTabElements();
   checkTabsContainerOverflow(containers.tabs);
});

window.addEventListener("load", () => {
   const textAreaActive = document.querySelector(".active-tab-block").children[1];
   handleTextAreaHeight(textAreaActive);
   const containers = getContainersTabElements();
   checkTabsContainerOverflow(containers.tabs);
});

// ----Click handlers---
function handleTextAreaHeight(element) {
   element.style.height = "";
   element.style.height = element.scrollHeight + "px";
}

function handleClickTab(element) {
   const activeElements = getActiveTabElements();
   const idIndex = extractIdIndex(element.id, 1);
   const block = document.getElementById(`tab-block-${idIndex}`);
   removeClassFromElement(activeElements.tab, "active-tab");
   removeClassFromElement(activeElements.block, "active-tab-block");
   addClassToElement(element, "active-tab");
   addClassToElement(block, "active-tab-block");
   handleTextAreaHeight(block.children[1]);
   scrollSmoothIntoViewelement(element);
}

function addNewTab() {
   const containers = getContainersTabElements();
   const lastIndexTabs = getLastIndexChildOfParent(containers.tabs);
   const lastIndexTabBlocks = getLastIndexChildOfParent(containers.blocks);
   const indexIdLastElement = extractIdIndex(containers.tabs.children[lastIndexTabs].id, 1);
   var newIndex = Number(indexIdLastElement) + 1;
   const newTab = containers.tabs.children[lastIndexTabs].cloneNode(true);
   const newBlock = containers.blocks.children[lastIndexTabBlocks].cloneNode(true);
   addAttributesToNewTabElements(newTab, newBlock, newIndex);
   addTextNewTab(newTab, newBlock);
   addChildToElement(containers.blocks, newBlock);
   addChildToElement(containers.tabs, newTab);
   handleClickTab(newTab);
}

function deleteActiveTab() {
   const activeElements = getActiveTabElements();
   const containers = getContainersTabElements();
   const lastChildIndexTab = getLastIndexChildOfParent(containers.tabs);
   if (lastChildIndexTab > 0) {
      const availableSibling = findAvailablesiblingElement(activeElements.tab);
      handleClickTab(availableSibling);
      removeChildFromElement(containers.tabs, activeElements.tab);
      removeChildFromElement(containers.blocks, activeElements.block);
   }
}

function editActiveTab(element) {
   const activeElements = getActiveTabElements();
   addAttributeElement(activeElements.tab.children[0], "contentEditable", "true");
   addAttributeElement(activeElements.block.children[0], "contentEditable", "true");
   removeAttributeElement(activeElements.block.children[1], "readonly");
   addClassToElement(element, "disabled-setting-item");
   addClassToElement(element.parentElement.children[0], "disabled-setting-item");
   addClassToElement(element.parentElement.children[1], "disabled-setting-item");
   removeClassFromElement(element.nextElementSibling, "disabled-setting-item");
   removeClickHandlerTabs();
}

function saveEditsActiveTab(element) {
   const activeElements = getActiveTabElements();
   addAttributeElement(activeElements.tab.children[0], "contentEditable", "false");
   addAttributeElement(activeElements.block.children[0], "contentEditable", "false");
   addAttributeElement(activeElements.block.children[1], "readonly", "readonly");
   addClassToElement(element, "disabled-setting-item");
   removeClassFromElement(element.parentElement.children[0], "disabled-setting-item");
   removeClassFromElement(element.parentElement.children[1], "disabled-setting-item");
   removeClassFromElement(element.previousElementSibling, "disabled-setting-item");
   addClickHandlerTabs();
}

function checkTabsContainerOverflow(element) {
   const isOverflow = checkOverflowElement(element);
   const offSet = findLeftOffSet(element);
   if (isOverflow && offSet != 0) {
      addClassToElement(element, "tabs-container-overflow");
      findPositionOverflowRightElement(element, "--position-right-fade");
   } else {
      removeClassFromElement(element, "tabs-container-overflow");
   }
}

//---- Functions----- /
function removeClickHandlerTabs() {
   const tabs = document.querySelectorAll(".tab-item");
   tabs.forEach((e) => {
      removeClickHandlerElement(e);
   });
}

function addClickHandlerTabs() {
   const tabs = document.querySelectorAll(".tab-item");
   tabs.forEach((e) => {
      addClickHandlerElement(e, handleClickTab);
   });
}

function removeClickHandlerElement(element) {
   element.onclick = () => {
      return false;
   };
}

function addClickHandlerElement(element, clickOperation) {
   element.onclick = () => {
      clickOperation(element);
   };
}

function findPositionOverflowRightElement(element, variableName) {
   const position = -element.scrollLeft + "px";
   generateDomVariableCSSInject(variableName, position);
}

function generateDomVariableCSSInject(variableName, value) {
   document.documentElement.style.setProperty(variableName, value);
}

function findLeftOffSet(element) {
   return element.clientWidth - (element.scrollWidth - element.scrollLeft);
}

function checkOverflowElement(element) {
   return element.clientWidth < element.scrollWidth;
}

function findAvailablesiblingElement(element) {
   var sibling = element.previousElementSibling;
   sibling ? sibling : (sibling = element.nextElementSibling);
   return sibling;
}

function addAttributesToNewTabElements(newTab, newBlock, newIndex) {
   addAttributeElement(newTab, "class", "tab-item");
   addAttributeElement(newTab, "id", `tab-${newIndex}`);
   addAttributeElement(newBlock, "class", "tab-blocks-item");
   addAttributeElement(newBlock, "id", `tab-block-${newIndex}`);
}

function addTextNewTab(newTab, newBlock) {
   changeTextToElements(newTab.children[0], "New Tab");
   changeTextToElements(newBlock.children[0], "New Tab Title");
   changeTextToElements(newBlock.children[1], "New Tab Text Please entre what you wish!!");
}

function getLastIndexChildOfParent(parent) {
   return parent.children.length - 1;
}

function getActiveTabElements() {
   const tab = document.querySelector(".active-tab");
   const block = document.querySelector(".active-tab-block");
   return { tab: tab, block: block };
}

function getContainersTabElements() {
   const tabs = document.querySelector(".tabs-container");
   const blocks = document.querySelector(".tab-blocks-container");
   return { tabs: tabs, blocks: blocks };
}

function addClassToElement(element, className) {
   element.classList.add(className);
}

function removeClassFromElement(element, className) {
   element.classList.remove(className);
}

function getDomElements(type) {
   var elements = document.querySelectorAll(type);
   return elements;
}

function scrollSmoothIntoViewelement(element) {
   element.scrollIntoView({ behavior: "smooth" });
}

function extractIdIndex(id, i) {
   return id.split("-")[i];
}

function addAttributeElement(element, type, string) {
   element.setAttribute(type, string);
}

function removeAttributeElement(element, type) {
   element.removeAttribute(type);
}

function addChildToElement(element, child) {
   element.appendChild(child);
}

function removeChildFromElement(element, child) {
   element.removeChild(child);
}

function changeTextToElements(element, txt) {
   element.innerText = txt;
}

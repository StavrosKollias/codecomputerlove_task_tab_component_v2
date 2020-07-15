// ----Click handlers---

function handleClickTab(element) {
  const tabItems = getDomElements(".tab-item");
  const tabBlocks = getDomElements(".tab-blocks-item");
  const tabSelected = idNumber(element.id, 1);
  tabItems.forEach((e, i) => {
    e.id != element.id ? e.classList.remove("active-tab") : false;
    var blockIdNumber = idNumber(tabBlocks[i].id, 2);
    blockIdNumber == tabSelected
      ? tabBlocks[i].classList.add("active-tab-block")
      : tabBlocks[i].classList.remove("active-tab-block");
  });
  element.classList.add("active-tab");
}

function addNewTab() {
  const tabItems = getDomElements(".tab-item");
  const newTab = checkFiveMaximumLimit(tabItems);
  if (newTab) {
    const newItemEnum = tabItems.length + 1;
    var tabContainer = document.getElementById("tabs-container");
    const tabBlocksContainer = document.getElementById("tab-blocks-container");
    var blockDiv = createTabblock(newItemEnum);
    tabBlocksContainer.appendChild(blockDiv);

    const tab = createTabButton(newItemEnum);
    tabContainer.appendChild(tab);

    handleClickTab(tab);
  }
}

function editActiveTab() {
  const activeTab = getDomElements(".active-tab");
  const activeBlock = getDomElements(".active-tab-block");
  activeBlock[0].children[0].setAttribute("contenteditable", "true");
  activeBlock[0].children[1].children[0].setAttribute(
    "contenteditable",
    "true"
  );
  activeBlock[0].children[1].children[1].setAttribute(
    "contenteditable",
    "true"
  );
  activeTab[0].setAttribute("contenteditable", "true");
}

function saveEditsActiveTab() {
  const activeTab = getDomElements(".active-tab");
  const activeBlock = getDomElements(".active-tab-block");
  activeBlock[0].children[0].setAttribute("contenteditable", "false");
  activeBlock[0].children[1].children[0].setAttribute(
    "contenteditable",
    "false"
  );
  activeBlock[0].children[1].children[1].setAttribute(
    "contenteditable",
    "false"
  );
  activeTab[0].setAttribute("contenteditable", "false");
}
//---- Functions----- /

function createTabblock(newItemEnum) {
  console.log("create Tab Block");
  const blockDiv = document.createElement("div");
  const blockTitle = createTitle();
  const blockTextContainer = createTextContainer();
  blockDiv.appendChild(blockTitle);
  blockDiv.appendChild(blockTextContainer);
  addAttributeElement(blockDiv, "class", "tab-blocks-item");
  addAttributeElement(blockDiv, "id", `tab-block-${newItemEnum}`);
  return blockDiv;
}

function createTitle() {
  console.log("create Title block");
  const blockTitle = document.createElement("h2");
  const titleTxt = document.createTextNode("New Title here");
  blockTitle.appendChild(titleTxt);
  addAttributeElement(blockTitle, "class", "tab-blocks-item_title");
  return blockTitle;
}

function createTextContainer() {
  console.log("create Title block");
  const blockTextContainer = document.createElement("div");
  const blockTxtPar = createTextPar();
  const blockTxtPar2 = createTextPar();
  blockTextContainer.appendChild(blockTxtPar);
  blockTextContainer.appendChild(blockTxtPar2);
  addAttributeElement(blockTextContainer, "class", "tab-blocs_text");
  return blockTextContainer;
}

function createTextPar() {
  console.log("create Title block");
  const blockTxtPar = document.createElement("p");
  const parTxt = document.createTextNode(
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque omnis perferendis tempore nulla molestiae totam veritatis possimus aliquid provident rem neque optio dolorum, fugiat esse minima, asperiores quas quia facilis."
  );
  blockTxtPar.appendChild(parTxt);
  addAttributeElement(blockTxtPar, "class", "tab-blocks_text-item");
  return blockTxtPar;
}

function createTabButton(newItemEnum) {
  const tab = document.createElement("button");
  const btnTxt = document.createTextNode("New Tab Name");
  tab.appendChild(btnTxt);
  addAttributeElement(tab, "class", `tab-item`);
  addAttributeElement(tab, "id", `tab-${newItemEnum}`);
  addEventListenerNewTab(tab);
  return tab;
}

function addEventListenerNewTab(tab) {
  tab.addEventListener("click", (e) => {
    handleClickTab(e.target);
  });
}

function checkFiveMaximumLimit(list) {
  return list.length + 1 <= 5;
}
function getDomElements(type) {
  var elements = document.querySelectorAll(type);
  return elements;
}

function addAttributeElement(element, type, string) {
  element.setAttribute(type, string);
}

function idNumber(id, i) {
  return id.split("-")[i];
}

function getDomElements(type) {
   var elements = document.querySelectorAll(type);
   return elements;
}

function idNumber(id, i) {
   return id.split("-")[i];
}

function handleClicktab(element) {
   const tabItems = getDomElements(".tab-item");
   const tabBlocks = getDomElements(".tab-blocks-item");
   const tabSelected = idNumber(element.id, 1);
   tabItems.forEach((e, i) => {
      e.id != element.id ? e.classList.remove("active-tab") : false;
      var blockIdNumber = idNumber(tabBlocks[i].id, 2);
      blockIdNumber == tabSelected ? tabBlocks[i].classList.add("active-tab-block") : tabBlocks[i].classList.remove("active-tab-block");
   });

   element.classList.add("active-tab");
}

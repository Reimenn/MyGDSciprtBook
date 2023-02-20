/** @param {HTMLElement} blockquote */
function OneBlockquoteToAdmonition(blockquote) {
    let first = blockquote.firstElementChild;
    if (first.tagName != "P") return;
    let firstText = first.textContent;
    if (!firstText.startsWith("[!")) return;
    let noteType = firstText.substring(2, firstText.indexOf("]"));

    let title = firstText.substring(firstText.indexOf("]") + 1, firstText.length).trim();
    if (title.length == 0) title = noteType;
    title = title[0].toUpperCase() + title.substring(1, title.length);

    let div = document.createElement("div");
    div.classList.add("admonition");
    div.classList.add(noteType);

    let divTitle = document.createElement("div");
    divTitle.classList.add("admonition-title");

    let divTitleP = document.createElement("p");
    divTitleP.textContent = title;

    divTitle.appendChild(divTitleP);

    div.appendChild(divTitle);
    let divContent = document.createElement("div");
    blockquote.removeChild(blockquote.childNodes.item(1));
    while (blockquote.childElementCount > 0) {
        let cur = blockquote.childNodes.item(0);
        blockquote.removeChild(cur);
        console.log(cur);
        divContent.appendChild(cur);
    }

    div.appendChild(divContent);
    blockquote.appendChild(div);


    blockquote.insertAdjacentElement("beforebegin", div);

}

function BlockquoteToAdmonition() {
    let bs = document.getElementsByTagName("blockquote");
    for (let b of bs) {
        try { OneBlockquoteToAdmonition(b); } catch (e) { console.log(e); }
    }
}

BlockquoteToAdmonition();

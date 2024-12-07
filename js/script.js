var enterName = document.getElementById("bookmarkName");
var enterURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var deleteBtns;
var visitBtns;
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
var bookmarks = [];

if (localStorage.getItem("bookmarksList")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
    for (var x = 0; x < bookmarks.length; x++) {
        displayBookmark(x);
    }
}

// =====> Display Function and adding click event to visit and delete buttons

function displayBookmark(indexOfWebsite) {
    var userURL = bookmarks[indexOfWebsite].siteURL;
    var httpsRegex = /^https?:\/\//g;
    if (httpsRegex.test(userURL)) {
        validURL = userURL;
        fixedURL = validURL
            .split("")
            .splice(validURL.match(httpsRegex)[0].length)
            .join("");
    } else {
        var fixedURL = userURL;
        validURL = `https://${userURL}`;
    }
    var newBookmark = `
              <tr>
                <td>${indexOfWebsite + 1}</td>
                <td>${bookmarks[indexOfWebsite].enterName}</td>              
                <td>
                  <button class="btn btn-visit" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete pe-2" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
    tableContent.innerHTML += newBookmark;

    // =====> Adding Click Event to All delete buttons every time a new bookmark being added

    deleteBtns = document.querySelectorAll(".btn-delete");
    if (deleteBtns) {
        for (var j = 0; j < deleteBtns.length; j++) {
            deleteBtns[j].addEventListener("click", function (e) {
                deleteBookmark(e);
            });
        }
    }

    // =====> Adding Click Event to All visit buttons every time a new bookmark being added

    visitBtns = document.querySelectorAll(".btn-visit");
    if (visitBtns) {
        for (var l = 0; l < visitBtns.length; l++) {
            visitBtns[l].addEventListener("click", function (e) {
                visitWebsite(e);
            });
        }
    }
}

// =====> Clear Input Function

function clearInput() {
    enterName.value = "";
    enterURL.value = "";
}

// =====> Capitalize Function ==> take string and makes it capitalize

function capitalize(str) {
    let strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
}

// =====> Submit Function

submitBtn.addEventListener("click", function () {
    if (
        enterName.classList.contains("is-valid") &&
        enterURL.classList.contains("is-valid")
    ) {
        var bookmark = {
            enterName: capitalize(enterName.value),
            enterURLL: enterURL.value,
        };
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
        displayBookmark(bookmarks.length - 1);
        clearInput();
        enterName.classList.remove("is-valid");
        enterURL.classList.remove("is-valid");
    } else {
        boxModal.classList.remove("d-none");
    }
});

// =====> Delete Function

function deleteBookmark(e) {
    tableContent.innerHTML = "";
    var deletedIndex = e.target.dataset.index;
    bookmarks.splice(deletedIndex, 1);
    for (var k = 0; k < bookmarks.length; k++) {
        displayBookmark(k);
    }
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

// =====> Visit Function

function visitWebsite(e) {
    var websiteIndex = e.target.dataset.index;
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarks[websiteIndex].enterURL)) {
        open(bookmarks[websiteIndex].enterURL);
    } else {
        open(`https://${bookmarks[websiteIndex].enterURL}`);
    }
}



var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

enterName.addEventListener("input", function () {
    validate(enterName, nameRegex);
});

enterURL.addEventListener("input", function () {
    validate(enterURL, urlRegex);
});

function validate(element, regex) {
    var testRegex = regex;
    if (testRegex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}

//Close Modal 

function closeModal() {
    boxModal.classList.add("d-none");
}

// 3 ways to close modal => close button -  Esc key - clicking outside modal

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        closeModal();
    }
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("box-info")) {
        closeModal();
    }
});
console.log("hallo");

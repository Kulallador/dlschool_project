var fileTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png'
]

var imgDiv = document.getElementById("image")

function validFileType(file) {
    for(var i = 0; i < fileTypes.length; i++) {
        if(file.type === fileTypes[i]) {
            return true;
        }
    }

    return false;
}

function getImageCard(path, name) {
    return `<div class="m-3">
        <img src="${path}" class="img-fluid rounded-3 shadow-lg border-dark imgCard">
    </div>`
}

formElem.onsubmit = async (e) => {
    e.preventDefault();
    if (formElem.myFile.files[0] == null){
        alert("Empty file");
        return;
    }

    if (!validFileType(formElem.myFile.files[0])) {
        alert("Bad file");
        return
    }

    let response = await fetch('/uploadimage', {
        method: 'POST',
        body: new FormData(formElem)
    });

    let result = await response.json();
    resultImage = getImageCard(result.resultImage, "Result");

    prewievLabel.hidden = true;
    imgDiv.innerHTML = resultImage;
    return false;
};
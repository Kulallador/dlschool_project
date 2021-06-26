var fileTypes = [
    'image/jpeg',
    'image/pjpeg',
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
        <ul>
            <li>
            <img src="${path}" class="img-fluid rounded-3 shadow-lg border-dark imgCard">
            </li>
            <li>
            <label class="text-center">${name}</label>
            </li>
    </div>`
}

formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/uploadimage', {
    method: 'POST',
    body: new FormData(formElem)
    });

    let result = await response.json();
    // img = document.createElement("img")

    // img.src = result.image
    // img.width = 400
    // img.height = 300
    // img.className = "img-fluid border rounded-3 shadow-lg mb-4 border border-dark"
    sourceImage = getImageCard(result.sourceImage, "Source");
    resultImage = getImageCard(result.resultImage, "Result")

    prewievLabel.hidden = true;
    imgDiv.innerHTML = sourceImage + resultImage;
    // imgDiv.appendChild(img);
    return false;
};

function sendImage() {
    input = document.getElementById("myFile");
    if (input.files[0] == null) {
        alert("Empty file");
        return;
    } 

    file = input.files[0];
    if (!validFileType(file)) {
        alert("Bad format")
        return;
    }


    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/uploadimage", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    };
    xhr.send(file);
} 
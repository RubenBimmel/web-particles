var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

const editorForm = document.getElementById('editor');
editorForm.addEventListener('submit', event => {
    event.preventDefault();
    let formData = Object.fromEntries(new FormData(editorForm));
    console.log(formData);
});

var canvas = document.getElementById("canvas");
var instance = new Instance(canvas, {});
instance.emit({});
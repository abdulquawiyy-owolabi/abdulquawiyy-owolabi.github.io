document.addEventListener("DOMContentLoaded", function() {
    fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placement').innerHTML=data;

    })
    fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placement').innerHTML=data;
})
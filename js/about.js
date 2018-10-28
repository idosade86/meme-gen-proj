function showDetails(elPerson){
    var name = elPerson.id;
    document.querySelector(`.${name}-photo`).classList.toggle('open');
    document.querySelector(`.${name}`).classList.toggle('open');
}
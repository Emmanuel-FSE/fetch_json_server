document.addEventListener("DOMContentLoaded", function(){
    fetchNames();
});

function fetchNames(){
    fetch("http://localhost:3000/characters")
    .then(res => res.json())
    .then(data => renderNames(data))
}
let clickedId;

function renderNames(names){
    names.forEach(name => {
        const nameDiv = document.querySelector("#character-bar");
        let spanTag = document.createElement("span");
        spanTag.textContent = name.name;
        spanTag.setAttribute("id", name.id);
        nameDiv.appendChild(spanTag);
        spanTag.addEventListener("click", function(e){
            document.querySelector("#name").textContent = name.name;
            document.querySelector("#image").setAttribute("src", name.image);
            document.querySelector("#vote-count").textContent = name.votes;
            clickedId = e.target.id;


        let input = document.querySelector("#votes-form")
        input.addEventListener("submit", function(e){
        e.preventDefault();
        let newVotes = {
            votes : parseInt(e.target.votes.value) + parseInt(name.votes)
        } 
            console.log(newVotes)
            console.log(name.votes)
            if(clickedId === clickedId){
            fetch(`http://localhost:3000/characters/${clickedId}`, {
            method: "PATCH",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(newVotes)
            });
            }
        })
        })
    });
}

 document.querySelector("#reset-btn").addEventListener("click", function(){
    let votes = {
        votes: 0
    }
    fetch(`http://localhost:3000/characters/${clickedId}`, {
        method: "PATCH",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(votes)
    });
})
        

let inputForm = document.querySelector("#character-form")
inputForm.addEventListener("submit",function(e){
    e.preventDefault();
    let details = {
        name: e.target.name.value,
        image: e.target.image_url.value,
        votes: 0
    }

    fetch("http://localhost:3000/characters", {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(details)
    });
})

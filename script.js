// Globalne tablice i hasło admina
let submissions = [];
let news = [
    {title: "Rozpoczęcie zapisów do Mam Talent", content: "Od 16.02.2025 rozpoczynają się zapisy do szkolnej edycji programu Mam Talent. Zachęcamy wszystkich uczniów do zgłaszania swoich talentów!"}
];
let events = [];
let ideas = [];
const adminPassword = "SamorzadUczniowskiSP2haslo";

// Nawigacja między zakładkami
window.showSection = function(id) {
    document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
    const sec = document.getElementById(id);
    if(sec) sec.classList.remove('hidden');
}

// Panel administratora
window.login = function() {
    const pass = document.getElementById("password").value;
    if(pass === adminPassword) {
        document.getElementById("loginDiv").classList.add("hidden");
        document.getElementById("adminPanel").classList.remove("hidden");
        renderSubmissions();
        renderNews();
        renderEvents();
        renderIdeas();
        loadTabContent();
    } else {
        document.getElementById("loginMsg").innerText = "Nieprawidłowe hasło!";
    }
}

// Mam Talent – zgłoszenia
window.submitForm = function() {
    const startDate = new Date("2026-02-16");
    if(new Date() < startDate) {
        alert("Zapisy do szkolnej edycji Mam Talent rozpoczną się 16.02.2026.");
        return;
    }
    const imie = document.getElementById("imie").value;
    const klasa = document.getElementById("klasa").value;
    const kategoria = document.getElementById("kategoria").value;
    const opis = document.getElementById("opis").value;
    const link = document.getElementById("link").value;

    submissions.push({imie, klasa, kategoria, opis, link, status:"oczekuje"});
    alert("Zgłoszenie wysłane!");
    document.getElementById("form").reset();
    renderSubmissions();
}

function renderSubmissions() {
    const table = document.getElementById("submissionsTable");
    table.innerHTML = `<tr>
        <th>Imię i nazwisko</th>
        <th>Klasa</th>
        <th>Kategoria</th>
        <th>Opis występu</th>
        <th>Link</th>
        <th>Status</th>
        <th>Akcja</th>
    </tr>`;
    submissions.forEach((s,index)=>{
        const row = table.insertRow();
        row.insertCell(0).innerText = s.imie;
        row.insertCell(1).innerText = s.klasa;
        row.insertCell(2).innerText = s.kategoria;
        row.insertCell(3).innerText = s.opis;
        row.insertCell(4).innerHTML = s.link?`<a href="${s.link}" target="_blank">link</a>`:"";
        row.insertCell(5).innerText = s.status;
        row.insertCell(6).innerHTML = `<button onclick="changeStatus(${index},'zaakceptowany')">Zaakceptuj</button>
                                       <button onclick="changeStatus(${index},'odrzucony')">Odrzuć</button>`;
    });
}

window.changeStatus = function(index,status) {
    submissions[index].status = status;
    renderSubmissions();
}

// Pomysły
window.submitIdea = function() {
    const name = document.getElementById("ideaName").value;
    const category = document.getElementById("ideaCategory").value;
    const description = document.getElementById("ideaDescription").value;
    if(name && description){
        ideas.push({name, category, description});
        alert("Twój pomysł został wysłany!");
        document.getElementById("ideaForm").reset();
        renderIdeas();
    }
}

function renderIdeas() {
    const table = document.getElementById("ideasTable");
    if(!table) return;
    table.innerHTML = `<tr>
        <th>Imię i nazwisko</th>
        <th>Kategoria</th>
        <th>Opis pomysłu</th>
    </tr>`;
    ideas.forEach(i=>{
        const row = table.insertRow();
        row.insertCell(0).innerText = i.name;
        row.insertCell(1).innerText = i.category;
        row.insertCell(2).innerText = i.description;
    });
}

// Aktualności
window.addNews = function() {
    const title = document.getElementById("newsTitle").value;
    const content = document.getElementById("newsContent").value;
    if(title && content){
        news.push({title, content});
        renderNews();
        document.getElementById("newsTitle").value="";
        document.getElementById("newsContent").value="";
    }
}

function renderNews() {
    const newsList = document.getElementById("newsList");
    newsList.innerHTML = "";
    news.forEach(n=>{
        const div = document.createElement("div");
        div.className="card fade-in";
        div.innerHTML=`<h4>${n.title}</h4><p>${n.content}</p>`;
        newsList.appendChild(div);
    });
}

// Wydarzenia
window.addEventListenerEvent = function(){
    const title = document.getElementById("eventTitle").value;
    const date = document.getElementById("eventDate").value;
    const content = document.getElementById("eventContent").value;
    if(title && date && content){
        events.push({title,date,content});
        renderEvents();
        document.getElementById("eventTitle").value="";
        document.getElementById("eventDate").value="";
        document.getElementById("eventContent").value="";
    }
}

function renderEvents(){
    const eventList = document.getElementById("eventList");
    eventList.innerHTML="";
    events.forEach(e=>{
        const div = document.createElement("div");
        div.className="card fade-in";
        div.innerHTML=`<h4>${e.title} - ${e.date}</h4><p>${e.content}</p>`;
        eventList.appendChild(div);
    });
}

// Edycja zakładek
window.loadTabContent = function(){
    const selected = document.getElementById("tabSelector").value;
    document.getElementById("tabEditor").value = document.getElementById(selected).innerHTML;
}

window.saveTabContent = function(){
    const selected = document.getElementById("tabSelector").value;
    const newContent = document.getElementById("tabEditor").value;
    document.getElementById(selected).innerHTML = newContent;
    alert("Treść zakładki została zaktualizowana!");
}

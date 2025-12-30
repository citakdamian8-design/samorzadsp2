import { db } from './firebase-config.js';
import { collection, doc, setDoc, getDoc, getDocs, addDoc, updateDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const adminPassword = "SamorzadUczniowskiSP2haslo";

window.showTab = function(tabId){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  const el = document.getElementById(tabId);
  if(el) el.classList.add('active');
}

window.showAdmin = function(){
  showTab('loginDiv');
}

window.login = async function(){
  const pass = document.getElementById("password").value;
  if(pass===adminPassword){
    document.getElementById("loginDiv").style.display="none";
    document.getElementById("adminPanel").style.display="block";
    loadAllData();
  } else {
    document.getElementById("loginMsg").innerText="Nieprawidłowe hasło!";
  }
}

async function loadAllData(){
  const tabs = ["homeText","skladText","mamtalentText","pomyslyText","kontaktText"];
  for(const tab of tabs){
    const docSnap = await getDoc(doc(db,"tabs",tab));
    if(docSnap.exists()){
      const el = document.getElementById(tab);
      if(el) el.innerHTML=docSnap.data().content;
    }
  }
  renderNews();
  renderIdeas();
  renderSubmissions();
}

window.saveTabContent = async function(){
  const selected = document.getElementById("tabSelector").value;
  const content = document.getElementById("tabEditor").value;
  await setDoc(doc(db,"tabs",selected),{content});
  const el = document.getElementById(selected);
  if(el) el.innerHTML=content;
  alert("Treść zakładki zaktualizowana!");
}

// Aktualności
window.addNews = async function(){
  const title = document.getElementById("newsTitle").value;
  const content = document.getElementById("newsContent").value;
  if(title && content){
    await addDoc(collection(db,"news"),{title,content,timestamp:Date.now()});
    document.getElementById("newsTitle").value="";
    document.getElementById("newsContent").value="";
    renderNews();
  }
}

async function renderNews(){
  const list = document.getElementById("newsList");
  if(!list) return;
  list.innerHTML="";
  const q = query(collection(db,"news"),orderBy("timestamp","desc"));
  const snapshot = await getDocs(q);
  snapshot.forEach(docSnap=>{
    const n = docSnap.data();
    const div = document.createElement("div");
    div.className="card fade-in";
    div.innerHTML=`<h4>${n.title}</h4><p>${n.content}</p>`;
    list.appendChild(div);
  });
}

// Pomysły
window.submitIdea = async function(){
  const content = document.getElementById("ideaContent").value;
  if(content){
    await addDoc(collection(db,"ideas"),{content,timestamp:Date.now()});
    document.getElementById("ideaContent").value="";
    renderIdeas();
  }
}

async function renderIdeas(){
  const list = document.getElementById("ideasList");
  if(!list) return;
  list.innerHTML="";
  const q = query(collection(db,"ideas"),orderBy("timestamp","desc"));
  const snapshot = await getDocs(q);
  snapshot.forEach(docSnap=>{
    const i = docSnap.data();
    const div = document.createElement("div");
    div.className="card fade-in";
    div.innerText=i.content;
    list.appendChild(div);
  });
}

// Mam Talent – zgłoszenia
window.submitForm = async function(){
  const startDate = new Date("2026-02-16");
  if(new Date()<startDate){
    alert("Zapisy rozpoczną się 16.02.2026.");
    return;
  }

  const imie=document.getElementById("imie").value;
  const klasa=document.getElementById("klasa").value;
  const kategoria=document.getElementById("kategoria").value;
  const opis=document.getElementById("opis").value;
  const link=document.getElementById("link").value;

  await addDoc(collection(db,"submissions"),{imie,klasa,kategoria,opis,link,status:"oczekuje"});
  document.getElementById("form").reset();
  renderSubmissions();
}

async function renderSubmissions(){
  const table = document.getElementById("submissionsTable");
  if(!table) return;
  table.innerHTML=`<tr><th>Imię</th><th>Klasa</th><th>Kategoria</th><th>Opis</th><th>Link</th><th>Status</th><th>Akcja</th></tr>`;
  const snapshot = await getDocs(collection(db,"submissions"));
  snapshot.forEach(docSnap=>{
    const s=docSnap.data();
    const row = table.insertRow();
    row.insertCell(0).innerText=s.imie;
    row.insertCell(1).innerText=s.klasa;
    row.insertCell(2).innerText=s.kategoria;
    row.insertCell(3).innerText=s.opis;
    row.insertCell(4).innerHTML=s.link?`<a href="${s.link}" target="_blank">link</a>`:"";
    row.insertCell(5).innerText=s.status;
    row.insertCell(6).innerHTML=`<button onclick="changeStatus('${docSnap.id}','zaakceptowany')">Zaakceptuj</button>
                                  <button onclick="changeStatus('${docSnap.id}','odrzucony')">Odrzuć</button>`;
  });
}

window.changeStatus = async function(id,status){
  await updateDoc(doc(db,"submissions",id),{status});
  renderSubmissions();
}

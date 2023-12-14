// Variabili globali
let registro = {
    materia: "",
    studenti: [],
    studenteSelezionato: null
  };

  // Funzione per creare un nuovo registro di classe
  function creaNuovoRegistro() {
    const materia = document.getElementById("materia").value;
    if (materia.trim() !== "") {
      registro.materia = materia;
      alert(`Nuovo registro creato per la materia: ${materia}`);
    } else {
      alert("Inserisci il nome della materia.");
    }
  }

  // Funzione per aggiungere uno studente
  function aggiungiStudente() {
    const nome = document.getElementById("nome").value;
    const cognome = document.getElementById("cognome").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;

    if (nome.trim() !== "" && cognome.trim() !== "" && email.trim() !== "" && telefono.trim() !== "") {
      const nuovoStudente = { nome, cognome, email, telefono };
      registro.studenti.push(nuovoStudente);
      aggiornaSelezioneStudenti();
      resettaCampiAggiuntaStudente();
      aggiornaTabellaStudenti();
      aggiornaTotaleStudenti();
    } else {
      alert("Completa tutti i campi dello studente.");
    }
  }

  // Funzione per eliminare uno studente
  function eliminaStudente() {
    if (registro.studenteSelezionato !== null) {
      registro.studenti.splice(registro.studenteSelezionato, 1);
      aggiornaSelezioneStudenti();
      resettaCampiModificaStudente();
      aggiornaTabellaStudenti();
      aggiornaTotaleStudenti();
    } else {
      alert("Seleziona uno studente da eliminare.");
    }
  }

  // Funzione per selezionare uno studente
  function selezionaStudente() {
    const indiceStudente = document.getElementById("studenti").value;
    registro.studenteSelezionato = indiceStudente !== "" ? parseInt(indiceStudente) : null;

    if (registro.studenteSelezionato !== null) {
      const studente = registro.studenti[registro.studenteSelezionato];
      document.getElementById("modifica-nome").value = studente.nome;
      document.getElementById("modifica-cognome").value = studente.cognome;
      document.getElementById("modifica-email").value = studente.email;
      document.getElementById("modifica-telefono").value = studente.telefono;
    } else {
      resettaCampiModificaStudente();
    }
  }

  // Funzione per modificare le informazioni di uno studente
  function modificaStudente() {
    if (registro.studenteSelezionato !== null) {
      const nome = document.getElementById("modifica-nome").value;
      const cognome = document.getElementById("modifica-cognome").value;
      const email = document.getElementById("modifica-email").value;
      const telefono = document.getElementById("modifica-telefono").value;

      if (nome.trim() !== "" && cognome.trim() !== "" && email.trim() !== "" && telefono.trim() !== "") {
        registro.studenti[registro.studenteSelezionato] = { nome, cognome, email, telefono };
        aggiornaTabellaStudenti();
        resettaCampiModificaStudente();
      } else {
        alert("Completa tutti i campi dello studente.");
      }
    } else {
      alert("Seleziona uno studente da modificare.");
    }
  }

  // Funzione per aggiornare la lista degli studenti nella selezione
  function aggiornaSelezioneStudenti() {
    const selezione = document.getElementById("studenti");
    selezione.innerHTML = "<option value=''></option>";

    for (let i = 0; i < registro.studenti.length; i++) {
      selezione.innerHTML += `<option value="${i}">${registro.studenti[i].nome} ${registro.studenti[i].cognome}</option>`;
    }
  }

  // Funzione per aggiornare la tabella degli studenti
  function aggiornaTabellaStudenti() {
    const tabella = document.getElementById("tabellaStudenti");
    tabella.innerHTML = "<tr><th>Nome</th><th>Cognome</th><th>Email</th><th>Telefono</th><th>Azioni</th></tr>";

    registro.studenti.sort((a, b) => a.nome.localeCompare(b.nome));

    for (let i = 0; i < registro.studenti.length; i++) {
      tabella.innerHTML += `
        <tr>
          <td>${registro.studenti[i].nome}</td>
          <td>${registro.studenti[i].cognome}</td>
          <td>${registro.studenti[i].email}</td>
          <td>${registro.studenti[i].telefono}</td>
          <td><button onclick="selezionaStudenteDaTabella(${i})">Modifica</button></td>
        </tr>`;
    }
  }

  // Funzione per selezionare uno studente dalla tabella
  function selezionaStudenteDaTabella(indice) {
    document.getElementById("studenti").value = indice;
    selezionaStudente();
  }

  // Funzione per aggiornare il totale degli studenti
  function aggiornaTotaleStudenti() {
    document.getElementById("totaleStudenti").innerText = registro.studenti.length;
  }

  // Funzione per resettare i campi di aggiunta studente
  function resettaCampiAggiuntaStudente() {
    document.getElementById("nome").value = "";
    document.getElementById("cognome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefono").value = "";
  }

  // Funzione per resettare i campi di modifica studente
  function resettaCampiModificaStudente() {
    document.getElementById("modifica-nome").value = "";
    document.getElementById("modifica-cognome").value = "";
    document.getElementById("modifica-email").value = "";
    document.getElementById("modifica-telefono").value = "";
  }
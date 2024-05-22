const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const Greeting = require('./Greeting.ts'); // Importiere das Greeting-Modell

mongoose.connect(
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/Greetings?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

// Füge einige Begrüßungen zur Datenbank hinzu
async function addGreetings(){
  try {
    await Greeting.create({ text: 'Hallo' });
    await Greeting.create({ text: 'Servus' });
    await Greeting.create({ text: 'Guten Tag' });
    await Greeting.create({ text: 'Hallöchen' });
    await Greeting.create({ text: 'Grüß Gott' });
    console.log('Begrüßungen wurden erfolgreich hinzugefügt');
  } catch (err) {
    console.error('Fehler beim Hinzufügen von Begrüßungen:', err);
  }
};

// Funktion zum Abrufen eines zufälligen Eintrags aus der Datenbank
async function getRandomGreeting () {
    try {
      const count = 5; // Anzahl der Dokumente in der Sammlung ermitteln
      const randomIndex = Math.floor(Math.random() * count); // Zufälligen Index generieren
      const randomGreeting = await Greeting.findOne().skip(randomIndex); // Zufälligen Eintrag abrufen
      return randomGreeting;
    } catch (err) {
      console.error('Fehler beim Abrufen einer zufälligen Begrüßung:', err);
    }
};


app.use(cors());
// let greetings = ['Hallo', 'Servus', 'Guten Tag', 'Hallöchen', 'Grüß Gott'];

// Definiere eine Routenbehandlung für die Wurzel-URL
app.get('/get', async (req, res) => {
    // Verbindung zur MongoDB-Datenbank herstellen
    // mongoose.connect('mongodb://mongodb:27017/greedings-mongo', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // })
    // .then(() => {
    //     console.log('Erfolgreich mit der MongoDB-Datenbank verbunden');
    //     if(!oncesDone){
    //         addGreetings(); // Füge Begrüßungen zur Datenbank hinzu
    //         oncesDone = true;
    //     }
    //     greeting = getRandomGreeting(); // Rufe die Funktion zum Abrufen eines zufälligen Eintrags auf, nachdem die Verbindung hergestellt wurde
    // })
    // .catch((err) => {
    //     console.error('Fehler beim Verbinden mit der MongoDB-Datenbank:', err);
    // });
    let greeting = getRandomGreeting();
    res.send(greeting);
});

// Starte den Server und lausche auf dem angegebenen Port
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
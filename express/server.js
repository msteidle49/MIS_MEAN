const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
// Der port der Schnittstelle
const port = 3000;

// Definiert ein Schema für die Begrüßungen
const greetingSchema = new mongoose.Schema({
  text: String
});

// Verbindung mit der Datenbank aufbauen
mongoose.connect(
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/mongodb-1?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Erstellt ein Mongoose-Modell basierend auf dem Schema
const Greeting = mongoose.model('Greetings', greetingSchema);

// Fügt einige Begruessungen zur Datenbank hinzu
async function addGreetings(){
  try {
    await Greeting.create([
      { text: 'Hallo' },
    { text: 'Servus' },
    { text: 'Guten Tag' },
    { text: 'Hallöchen' },
    { text: 'Grüß Gott' }]);
    console.log('Begrüßungen wurden erfolgreich hinzugefügt');
  } catch (err) {
    console.error('Fehler beim Hinzufügen von Begrüßungen:', err);
  }
};

addGreetings();

app.use(cors());

// Definiere eine Routenbehandlung für die Wurzel-URL
app.get('/get', async (req, res) => {
  // zufaellige Begruessung finden und der Schnittstelle zur verfuegung stellen
  try {
    const randomIndex = Math.floor(Math.random() * 5); // Zufälligen Index generieren
    const randomGreeting = await Greeting.find(); // Zufälligen Eintrag abrufen
    res.send(randomGreeting[randomIndex].text);
  } catch (err) {
    console.error('Fehler beim Abrufen einer zufälligen Begrüßung:', err);
  }
});

// Starte den Server und lausche auf dem angegebenen Port
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}/`);
});
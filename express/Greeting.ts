const mongoose = require('mongoose');

// Definiere ein Schema für die Begrüßungen
const greetingSchema = new mongoose.Schema({
  text: String
});

// Erstelle ein Mongoose-Modell basierend auf dem Schema
const Greeting = mongoose.model('Greetings', greetingSchema);


module.exports = Greeting; // Exportiere das Modell für den Zugriff in anderen Dateien

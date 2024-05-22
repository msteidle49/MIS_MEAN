import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'angular-docker';
  @ViewChild('nameForm') nameForm: NgForm | undefined;
  name: string = ''; // Variable, um den eingegebenen Namen zu speichern
  greeting: string | undefined;
  
  constructor(private http: HttpClient) {}

  submitForm(): void {
    if (this.nameForm) {
      this.name = this.nameForm.value.name;
    }
    // Hier kannst du die Logik implementieren, um die Daten an den Server zu senden
    // Zum Beispiel: eine HTTP-Anfrage an den Express.js-Server

    // Hier wird ein Beispiel einer POST-Anfrage mit dem eingegebenen Namen als Datenkörper gezeigt
    this.http.get<string>('http://localhost:3000/get')
      .subscribe(response => {
        this.greeting = response;
      }, error => {
        console.error('Fehler beim Abrufen der Daten:', error);
      });
  }
}

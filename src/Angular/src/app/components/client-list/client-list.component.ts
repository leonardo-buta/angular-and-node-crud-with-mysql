import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients?: Client[];
  currentClient?: Client = undefined;
  currentIndex = -1;
  totalClients = 0;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getclients();
  }

  getclients(): void {
    this.clientService.getAll()
      .subscribe(data => {
        this.clients = data.result;
        this.totalClients = data.count;
      },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.getclients();
    this.currentClient = new Client();
    this.currentIndex = -1;
  }

  setActiveClient(client: Client, index: number): void {
    this.currentClient = client;
    this.currentIndex = index;
  }
}

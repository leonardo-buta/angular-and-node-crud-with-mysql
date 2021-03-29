import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  currentClient: Client = new Client();
  message = '';

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    public modal: NgbActiveModal,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getClient(this.route.snapshot.params.id);
  }
                                                                                       
  getClient(id: string): void {
    this.clientService.get(id)
      .subscribe(
        data => {
          this.currentClient = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  updateClient(): void {
    this.clientService.update(this.currentClient.id, this.currentClient)
      .subscribe(
        response => {
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }

  deleteClient(): void {
    this.clientService.delete(this.currentClient.id)
      .subscribe(
        () => {
          this.modal.dismiss();
          this.router.navigate(['/clients']);
        },
        error => {
          console.log(error);
        }
      )
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}

import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'xc-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})

export class ConfirmModalComponent implements OnInit {

  modalHeader: string = 'Confirm';
  modalBody: string = 'Are you sure you want to take this action?';
  confirmButtonText: string = 'Confirm';
  cancelButtonText: string = 'Cancel';

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {}

  closeModal(value) {
    this.activeModal.close(value);
  }
}


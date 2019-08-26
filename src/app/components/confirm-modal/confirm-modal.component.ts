import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})

export class ConfirmModalComponent implements OnInit {

  modalHeader = 'Confirm';
  modalBody = 'Are you sure you want to take this action?';
  confirmButtonText = 'Confirm';
  cancelButtonText = 'Cancel';

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {}

  closeModal(value) {
    this.activeModal.close(value);
  }
}


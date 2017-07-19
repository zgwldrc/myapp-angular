import {Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-messagebox',
  templateUrl: 'messagebox.component.html',
  styleUrls: ['messagebox.component.css']
})
export class MessageboxComponent implements OnInit {
  @Input() msg:string;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}

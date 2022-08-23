import { Component, OnInit } from '@angular/core';
import { VariablesService } from 'src/app/globals/variables.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  constructor(private vari: VariablesService) { }

  ngOnInit(): void {
    this.vari.posclick=2
  }

}

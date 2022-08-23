import { Component, OnInit } from '@angular/core';
import { VariablesService } from 'src/app/globals/variables.service';

@Component({
  selector: 'app-mypatients',
  templateUrl: './mypatients.component.html',
  styleUrls: ['./mypatients.component.scss']
})
export class MypatientsComponent implements OnInit {

  constructor(private vari: VariablesService) { }

  ngOnInit(): void {
    this.vari.posclick=3
  }

}

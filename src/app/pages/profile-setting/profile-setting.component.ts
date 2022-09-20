import { Component, OnInit } from '@angular/core';
import { VariablesService } from 'src/app/globals/variables.service';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent implements OnInit {

  email=""
  prenom=""
  nom=""
  tel=""

  constructor(private vari: VariablesService) {
    
  }

  ngOnInit(): void {
    this.email=this.vari.personne.email
    this.prenom=this.vari.personne.prenom
    this.nom=this.vari.personne.nom
    this.tel=this.vari.personne.tel
  }

}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesService } from 'src/app/globals/variables.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tel=""
  mdp=""

  apiServiceUrl = environment.apiBaseUrl

  constructor(private http: HttpClient, private router: Router, private vari: VariablesService) { }

  ngOnInit(): void {
    this.vari.idpers=0
    sessionStorage.removeItem("idpers")                                         
  }

  login(){
    this.http.post<any>(`${this.apiServiceUrl}/medecin/login`, {
      "tel":this.tel,
      "mdp":this.mdp
    }).subscribe(
      (response: any)=>{
        if(response!=null){
          sessionStorage.setItem("idpers", response.idmedecin)
          this.vari.idpers=response.idmedecin
          this.vari.personne=response
          sessionStorage.setItem("user", JSON.stringify(response))
          this.router.navigateByUrl("/dashboard")
        }else{
          console.log(response)
        }
      },(error: HttpErrorResponse)=>{

      }
    )
  }

}

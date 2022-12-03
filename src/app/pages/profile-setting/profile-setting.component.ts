import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { VariablesService } from 'src/app/globals/variables.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent implements OnInit {

  apiServiceUrl = environment.apiBaseUrl

  medecinDirectory = environment.medecinDirectory
  cliniqueDirectory = environment.cliniqueDirectory

  email=""
  prenom=""
  nom=""
  tel=""
  biographie=""
  clinique_nom=""
  clinique_adresse=""
  clinique_latitude=""
  clinique_longitude=""
  genre=""
  date=""
  image=""
  imageAsBase64=""
  cliniquesAsB64=[]
  cliniqueImages=[]
  maxFiles =5
  
  constructor(private toastr: ToastrManager,public vari: VariablesService,private router: Router, private datepipe: DatePipe,private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.email=this.vari.personne.email
    this.prenom=this.vari.personne.prenom
    this.nom=this.vari.personne.nom
    this.tel=this.vari.personne.tel
    this.biographie=this.vari.personne.biographie
    this.genre=this.vari.personne.genre
    this.date=this.vari.personne.date.substring(0,10)
    this.clinique_adresse=this.vari.personne.structure.adresse
    this.clinique_nom=this.vari.personne.structure.nom
    this.clinique_latitude=this.vari.personne.structure.latitude
    this.clinique_longitude=this.vari.personne.structure.longitude
    this.cliniqueImages = this.vari.personne.structure.imageStructures
  }

  convertImageToBase64String(id: string){
    let inputFile = <HTMLInputElement>document.getElementById(id);
    let reader = new FileReader();
    // @ts-ignore
    if (inputFile.files.length>0){
      // @ts-ignore
      reader.readAsDataURL(inputFile.files[0]);
      reader.onloadend = ()=>{
          // @ts-ignore
          this.imageAsBase64=(reader.result.toString());//ceci est l'image1 en base64
      }   
      console.log(this.imageAsBase64)
    }
  }

  convertListImageToBase64String(){
    let inputFile = <HTMLInputElement>document.getElementById("cliniques");
    
    // @ts-ignore
    if (inputFile.files.length>0){
      // @ts-ignore
      for(let file of inputFile.files){
         // @ts-ignore
        let reader = new FileReader();
         // @ts-ignore
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            // @ts-ignore
            this.cliniquesAsB64.push(reader.result.toString().split(',')[1]);//ceci est l'image1 en base64
        }   
      }
      console.log(this.cliniquesAsB64)
    }
  }

  deleteFileAt(index: number){
    this.cliniquesAsB64.splice(index,1)
  }

  saveChange(){
    this.http.put<any>(`${this.apiServiceUrl}/medecin/edit/`+this.vari.personne.idmedecin,{
      "idmedecin":this.vari.personne.idmedecin,
      "prenom":this.prenom,
      "nom":this.nom,
      "email":this.email,
      "tel":this.tel,
      "mdp":this.vari.personne.mdp,
      "idservice":this.vari.personne.idservice,
      // "profil":this.vari.personne.profil,
      "profil":this.imageAsBase64.split(',')[1],
      "date":this.date,
      "genre":this.genre,
      "biographie":this.biographie,
      "structure":{
        "id":this.vari.personne.structure.id,
        "latitude":this.clinique_latitude,
        "longitude":this.clinique_longitude,
        "nom":this.clinique_nom,
        "adresse":this.clinique_adresse
      }
    }).subscribe(
      (response: any)=>{
        if(response!=null){
          // this.saveImagesClinique(this.vari.personne.structure.id)
          sessionStorage.setItem("idpers", response.idmedecin)
          this.vari.idpers=response.idmedecin
          this.vari.personne=response
          sessionStorage.setItem("user", JSON.stringify(response))
          this.showSuccess("Reussi", "Enregistrement éffectué avec succés")
          // console.log(response)
        }else{
          this.showError('Erreur serveur', "Veuillez réessayer !")
        }
      },(error: HttpErrorResponse)=>{
        this.showError("Erreur serveur", error.message)
      }
    )
  }

  saveImagesClinique(structure: number){
    this.http.post<any>(`${this.apiServiceUrl}/imageClinique/edit/`+structure,this.cliniquesAsB64).subscribe(
      (response: any)=>{
        if(response!=null){
          this.saveChange()
        }else{
          this.showError('Erreur serveur', "Veuillez réessayer !")
        }
      },(error: HttpErrorResponse)=>{
        this.showError("Erreur serveur", error.message)
      }
    )
  }

  showSuccess(title: string, desc: string){
    this.toastr.successToastr(desc, title, {
      position: 'top-center'
    });
  }

  showWarning(title: string, desc: string){
    this.toastr.warningToastr(desc, title, {
      position: 'top-center'
    });
  }

  showError(title: string, desc: string){
    this.toastr.errorToastr(desc, title, {
      position: 'top-center'
    });
  }

}

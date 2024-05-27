import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ErrorService {

  errorSubject: Subject<string>;

  constructor(private toastr: ToastrService) { 
    this.errorSubject = new Subject();
  }

  emmitError(errorMsg: string){
    this.toastr.error(errorMsg, 'Error'); 
    console.log("Error emitted successfully:", errorMsg);
  }
}

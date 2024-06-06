import { Component, OnInit } from '@angular/core';
import { Regiao } from '../../interfaces/regiao';
import { RegiaoService } from '../../services/regiao.service';

@Component({
  selector: 'app-regiao',
  standalone: true,
  imports: [],
  templateUrl: './regiao.component.html',
  styleUrl: './regiao.component.css'
})
export class RegiaoComponent implements OnInit{
  regioes: Regiao[] = [];

  constructor(private regiaoService: RegiaoService) {
  }
  ngOnInit(): void {
    this.list();
   }


    list(): void {
       this.regiaoService.list().subscribe((regioes) => (this.regioes = regioes));
    }
}

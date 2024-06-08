import { Component, Input, OnInit, input } from '@angular/core';
import { Regiao } from '../../interfaces/regiao';
import { RegiaoService } from '../../services/regiao.service';
import { CommonModule } from '@angular/common';
import { Especie } from '../../interfaces/especie';
import { StatusDeConservacao } from '../../enums/status-de-conservacao';
import { FormsModule } from '@angular/forms';
import { NivelDePoluicao } from '../../enums/nivel-de-poluicao';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {

  regioes: Regiao[] = [];
  regioesOpcoes: String[] = [];
  especies: Especie[] = [];
  statusConservacao: String[] = Object.values(StatusDeConservacao);
  niveisPoluicao: String[] = Object.values(NivelDePoluicao);
  contadorTemp = 0;
  contadorPh = 0;

  regiaoFilter: String = 'All';
  especieFilter: String = 'All';
  statusConservacaoFilter: String = 'All';
  temperaturaAguaFilter: string = '';
  nivelPoluicaoFilter: String = 'All';
  pHFilter: string = '';
  regioesFiltrada: Regiao[] = [];

  constructor(private regiaoService: RegiaoService) { }

  ngOnInit(): void {
    this.list();
    this.regioes.forEach(regiao => {
      if (!this.regioesOpcoes.includes(regiao.regiao)) {
        this.regioesOpcoes.push(regiao.regiao);
      }
    });
  }


  list(): void {
    this.regiaoService.list().subscribe((regioes) => (this.regioes = regioes));
    this.regioes.forEach(regiao => {
      regiao.especies.forEach(especie => {
        if (!this.especies.some(e => e.nome === especie.nome)) {
          this.especies.push(especie);
        }
      });
    });
  }


  getFiltrar() {
    this.getFiltrarRegiao();
    this.getFiltroNomeEspecie();
    this.getFiltroStatusConservacao();
    this.getFiltroPoluicao();
    this.getFiltroTemperaturaAgua();
    this.getFiltroPH();
    this.alertarFiltros();
    this.contadorTemp = 0;
    this.contadorPh = 0;
  }
  getFiltrarRegiao(): void {
    if (this.regiaoFilter === 'All') {
      this.regioesFiltrada = this.regioes;
    } else {
      this.regioesFiltrada = this.regioes.filter(regiao => regiao.regiao === this.regiaoFilter);
    }
  }
  getFiltroStatusConservacao(): void {
    if (this.statusConservacaoFilter === 'All') {
    } else {
      this.regioesFiltrada = this.regioesFiltrada.filter(regiao =>
        regiao.especies.some(especie => especie.status === this.statusConservacaoFilter)
      );
    }
  }
  getFiltroNomeEspecie(): void {
    if (this.especieFilter === 'All') {
      this.regioesFiltrada = this.regioesFiltrada;
    } else {
      this.regioesFiltrada = this.regioesFiltrada.filter(regiao =>
        regiao.especies.some(especie => especie.nome === this.especieFilter)
      );
    }
  }

  getFiltroPoluicao(): void {
    if (this.nivelPoluicaoFilter === 'All') {
      this.regioesFiltrada = this.regioesFiltrada;
    } else {
      this.regioesFiltrada = this.regioesFiltrada.filter(regiao => regiao.nivelPoluicao === this.nivelPoluicaoFilter);
    }
  }
  getFiltroTemperaturaAgua(): void {
    if (this.temperaturaAguaFilter === '') {
      this.regioesFiltrada = this.regioesFiltrada;
    }
    else {
      let temperaturaAguaFilterNumber = parseFloat(this.temperaturaAguaFilter);

      let regiaoTemperaturaExata = this.regioesFiltrada.find(regiao => parseFloat(regiao.temperaturaAgua) === temperaturaAguaFilterNumber);

      if (regiaoTemperaturaExata) {
        this.regioesFiltrada = [regiaoTemperaturaExata];
      } else {
        let regiaoTemperaturaProxima = this.regioesFiltrada.reduce((prev, curr) => {
          this.contadorTemp++;
          return (Math.abs(parseFloat(curr.temperaturaAgua) - temperaturaAguaFilterNumber) < Math.abs(parseFloat(prev.temperaturaAgua) - temperaturaAguaFilterNumber) ? curr : prev);
        });
        this.regioesFiltrada = [regiaoTemperaturaProxima];
      }
    }
  }
  getFiltroPH(): void {

    if (this.pHFilter === '') {
      this.regioesFiltrada = this.regioesFiltrada;
    }
    else {
      let pHFilterNumber = parseFloat(this.pHFilter);

      let regiaoPHExato = this.regioesFiltrada.find(regiao => parseFloat(regiao.pH) === pHFilterNumber);

      if (regiaoPHExato) {
        this.regioesFiltrada = [regiaoPHExato];
      } else {
        let regiaoPHProximo = this.regioesFiltrada.reduce((prev, curr) => {
          this.contadorPh++;
          return (Math.abs(parseFloat(curr.pH) - pHFilterNumber) < Math.abs(parseFloat(prev.pH) - pHFilterNumber) ? curr : prev);
        });
        this.regioesFiltrada = [regiaoPHProximo];
      }
    }
  }

  alertarFiltros(): void {
    if (this.contadorTemp > 0) {
      alert('Não encontramos uma região com a temperatura exata, mas encontramos a região mais próxima!');
    }
    if (this.contadorPh > 0) {
      alert('Não encontramos uma região com o pH exato, mas encontramos a região mais próxima!');
    }
  }
}
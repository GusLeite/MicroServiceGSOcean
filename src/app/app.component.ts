import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegiaoComponent } from './components/regiao/regiao.component';
import { FilterComponent } from './components/filter/filter.component';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RegiaoComponent,FilterComponent,TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'OceanDataApi';
}

import { Component, OnInit } from '@angular/core';
import { PacienteService } from './patients.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'taller2';

  pacientes: any;
  categorias: any;
  dietas: any;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.getPacientes();
    this.getCategorias();
    this.getDietas();
  }

  getPacientes(): void {
    this.pacienteService.getPacientes().subscribe((pacientes) => (this.pacientes = pacientes));
  }

  getCategorias(): void {
    this.pacienteService.getCategorias().subscribe((categorias) => (this.categorias = categorias));
  }

  getDietas(): void {
    this.pacienteService.getDietas().subscribe((dietas) => (this.dietas = dietas));
  }

  calculateIMC(patient: any): void {
    const weight = patient.peso;
    const height = patient.estatura / 100;
    const imc = weight / (height * height);
    const state =
      imc < 18.5
        ? 'Peso bajo'
        : imc >= 18.5 && imc < 25
        ? 'Ideal'
        : imc >= 25 && imc < 30
        ? 'Sobrepeso'
        : imc >= 30 && imc < 35
        ? 'Obesidad'
        : imc >= 35 && imc < 40
        ? 'Obesidad Severa'
        : 'Obesidad Morbida';

    patient.imc = imc.toFixed(2);
    patient.estado = state;

    // Buscar información en categorías y dietas según el estado del paciente
    const categoria = this.categorias.find((c: any) => c.Estado === state);
    const dietas = this.dietas.filter((dieta: any) => dieta.Categoria === categoria?.codigo);

    if (categoria) {
      // Mostrar información de la categoría correspondiente
      patient.categoria = {
        nombre: categoria.Estado,
        descripcion: `Límite inferior: ${categoria.limInferior}, Límite superior: ${categoria.LimSuperior}`
      };
    }

    if (dietas) {
      // Mostrar información de las dietas correspondientes con un map para mostrarlas todas
      patient.dietas = dietas.map((dieta: any) => {
        return {
          nombre: dieta.Categoria,
          descripcion: dieta.Dieta
        };
      });
    }
  }

  selectedPatient: any;
  showModal = false;
  selectedDieta: any;

  openModal(patient: any): void {
    this.calculateIMC(patient);
    this.selectedPatient = patient;
    this.selectedDieta = this.dietas.find((dieta: any) => dieta.Categoria === patient.categoria?.codigo);
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  Reset(patient: any) {
    patient.imc = null;
    patient.estado = null;
  }

}

import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: false
})
export class PerfilComponent implements OnInit {

  fecha: string = new Date().toISOString().split('T')[0];
  objetivos: any[]=[];
  objetivosUsuario: any[] = [];
  objetivoEditandoId: number | null = null;

  medidas: any[] = [];
  medidaEditandoId: number | null = null;
  fechaHoy: string = new Date().toISOString().slice(0, 10);

  perfilForm: any = {
    fec_nac: this.fecha,
    altura: 0
  };

  objetivoForm: any = {
    accion: '',
    valor: 0,
    id_objetivo: null
  };

  medidaForm: any = {
    fecha: this.fechaHoy,
    nombre_medida: '',
    unidad_medida: '',
    valor: 0
  };

  constructor(private perfilService: PerfilService) {}

  ngOnInit() {
    this.obtenerObjetivos();
    this.obtenerObjetivosUsuario();
    this.obtenerMedidas();
  }

  guardarPerfil() {
    this.perfilService.createPerfil(this.perfilForm).subscribe({
      next: (response) => {
        console.log('Perfil guardado correctamente', response);
      },
      error: (err) => {
        console.error('Error al guardar perfil', err);
      }
      });
  }
  
  guardarObjetivo() {
    if (this.objetivoEditandoId !== null) {
      this.perfilService.updateObjetivo(this.objetivoEditandoId, this.objetivoForm).subscribe({
        next: () => {
          console.log('Objetivo actualizado correctamente');
          this.objetivoEditandoId = null;
          this.objetivoForm = { accion: '', valor: 0, id_objetivo: null };
          this.obtenerObjetivosUsuario();
        },
        error: (err) => {
          console.error('Error al actualizar objetivo', err);
        }
      });
    } else {
      this.perfilService.createObjetivo(this.objetivoForm).subscribe({
        next: () => {
          console.log('Objetivo guardado correctamente');
          this.objetivoForm = { accion: '', valor: 0, id_objetivo: null };
          this.obtenerObjetivosUsuario();
        },
        error: (err) => {
          console.error('Error al guardar objetivo', err);
        }
      });
    }
  }

  obtenerObjetivos(){
    this.perfilService.getObjetivos().subscribe((data) => {
      this.objetivos = data;
      console.log(this.objetivos); // BORRAR
    })
    
  }
  
  obtenerObjetivosUsuario() {
    this.perfilService.getObjetivosUsuario().subscribe({
      next: (data) => {
        this.objetivosUsuario = data;
        console.log(this.objetivosUsuario); // BORRAR
      },
      error: (err) => {
        console.error('Error al obtener objetivos del usuario', err);
      }
    });
  }

  editarObjetivo(obj: any) {
    this.objetivoForm = {
      accion: obj.accion,
      valor: obj.valor,
      id_objetivo: obj.id_objetivo
    };
    this.objetivoEditandoId = obj.id;
  }
  
  eliminarObjetivo(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este objetivo?')) {
      this.perfilService.deleteObjetivo(id).subscribe({
        next: () => {
          console.log('Objetivo eliminado correctamente');
          this.obtenerObjetivosUsuario();
        },
        error: (err) => {
          console.error('Error al eliminar objetivo', err);
        }
      });
    }
  }

  
  obtenerMedidas() {
    this.perfilService.getMedidas().subscribe({
      next: (data) => {
        this.medidas = data;
        console.log(this.medidas); // BORRAR
      },
      error: (err) => {
        console.error('Error al obtener medidas del usuario', err);
      }
    });
  }
  
  guardarMedida() {
    if (this.medidaEditandoId !== null) {
      console.log(this.medidaEditandoId, this.medidaForm); // BORRAR
      this.perfilService.updateMedida(this.medidaEditandoId, this.medidaForm).subscribe({
        next: () => {
          console.log('Medida actualizada correctamente');
          this.medidaEditandoId = null;
          this.medidaForm = { fecha: this.fechaHoy, nombre_medida: '', unidad_medida: '', valor: 0 };
          this.obtenerMedidas();
        },
        error: (err) => {
          console.error('Error al actualizar medida', err);
        }
      })
    } else {
      this.perfilService.postMedida(this.medidaForm).subscribe({
        next: () => {
          console.log('Medida guardada correctamente');
          this.medidaForm = { fecha: this.fechaHoy, nombre_medida: '', unidad_medida: '', valor: 0 };
          this.obtenerMedidas();
        },
        error: (err) => {
          console.error('Error al guardar medida', err);
        }
      })
    }
  }
  
  postMedidaId(id: number, medida: number) {
    this.perfilService.postMedidaId(id, {medida}).subscribe({
      next: () => {
        console.log('Medida guardada correctamente');
        this.obtenerMedidas();
      },
      error: (err) => {
        console.error('Error al guardar medida', err);
      }
    });
  }
  
  editarMedida(medida: any) {
    this.medidaForm = {
      fecha: medida.fecha,
      nombre_medida: medida.nombre_medida,
      valor: medida.valor,
      unidad_medida: medida.unidad_medida
    };
    this.medidaEditandoId = medida.id;
  }
  
  eliminarMedida(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta medida?')) {
      this.perfilService.deleteMedida(id).subscribe({
        next: () => {
          console.log('Medida eliminada correctamente');
          this.obtenerMedidas();
        },
        error: (err) => {
          console.error('Error al eliminar medida', err);
        }
      });
    }
  }
}

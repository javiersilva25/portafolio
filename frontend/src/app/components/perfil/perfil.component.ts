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

  perfilForm: any = {
    fec_nac: this.fecha,
    altura: 0
  };

  objetivoForm: any = {
    accion: '',
    valor: 0,
    id_objetivo: null
  };

  constructor(private perfilService: PerfilService) {}

  ngOnInit() {
    this.obtenerObjetivos();
    this.obtenerObjetivosUsuario();
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
      // Modo edición
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
      // Modo creación
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
      console.log(this.objetivos);
    })
    
  }
  
  obtenerObjetivosUsuario() {
    this.perfilService.getObjetivosUsuario().subscribe({
      next: (data) => {
        this.objetivosUsuario = data;
        console.log(this.objetivosUsuario);
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
}

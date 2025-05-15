import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import { ModalController } from '@ionic/angular';
import { EstadisticasComponent } from '../estadisticas/estadisticas.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: false
})
export class PerfilComponent implements OnInit {

  objetivos: any[]=[];
  objetivosUsuario: any[] = [];
  objetivoEditandoId: number | null = null;

  medidas: any[] = [];
  medidaEditandoId: number | null = null;
  fechaHoy: string = new Date().toISOString().slice(0, 10);
  nuevoValor: number = 0; 

  perfilForm: any = {
    edad: 0,
    peso: 0,
    altura: 0,
    sexo: '',
    actividad: ''
  };
  perfilExiste = false;

  caloriasFinales: number = 0;


  metabolismoBasal: number = 0;
  caloriasRequeridas: number = 0;


  objetivoForm: any = {
    peso_objetivo: 0,
    velocidad: 'pausado',
    id_objetivo: 1
  };  

  medidaForm: any = {
    fecha: this.fechaHoy,
    nombre_medida: '',
    unidad_medida: '',
    valor: 0
  };

  perfilId: number | null = null;

  constructor(private perfilService: PerfilService,
    private modalController: ModalController
  ) {}

  async abrirModal() {
    const modal = await this.modalController.create({
      component: EstadisticasComponent
    });
    await modal.present();
  }

  ngOnInit() {
    this.obtenerPerfil();
    this.obtenerObjetivos();
    this.obtenerObjetivosUsuario();
    this.obtenerMedidas();
    this.calcularMetabolismoBasal();
    this.calcularCaloriasRequeridas();
    this.calcularCaloriasFinalesPorObjetivo();

  }

  actualizarFecha(event: any) {
    const valor = event.detail.value; 
    this.perfilForm.fec_nac = valor?.slice(0, 10); 
  }

  guardarPerfil() {
    this.calcularMetabolismoBasal();
    this.calcularCaloriasRequeridas();
  
    if (this.perfilId !== null) {
      console.log("Perfil ID actual:", this.perfilId);
      console.log("📤 Enviando perfil:", this.perfilForm);
      this.perfilService.updatePerfil(this.perfilId, this.perfilForm).subscribe({
        next: (response) => {
          console.log('Perfil actualizado correctamente', response);
        },
        error: (err) => {
          console.error('Error al actualizar perfil', err);
        }
      });
    } else {
      console.log("Perfil ID actual:", this.perfilId);
      console.log("📤 Enviando perfil:", this.perfilForm);
  
      this.perfilService.createPerfil(this.perfilForm).subscribe({
        next: (response) => {
          console.log('Perfil creado correctamente', response);
          this.perfilId = response.id;
          this.obtenerPerfil();
        },
        error: (err) => {
          console.error('Error al crear perfil', err);
        }
      });
    }
  }
  
  

  obtenerPerfil() {
    this.perfilService.getPerfil().subscribe({
      next: (data) => {
        this.perfilExiste = true;
        this.perfilForm = data;
        this.perfilId = data.id;
        this.calcularMetabolismoBasal();
        this.calcularCaloriasRequeridas();
        this.calcularCaloriasFinalesPorObjetivo();
      },
      error: (err) => {
        this.perfilExiste = false;
        console.error('Error al obtener perfil', err);
      }
    });    
  }
  
  guardarObjetivo() {
    if (this.objetivoEditandoId !== null) {
      this.perfilService.updateObjetivo(this.objetivoEditandoId, this.objetivoForm).subscribe({
        next: () => {
          console.log('Objetivo actualizado correctamente');
          this.objetivoEditandoId = null;
          this.objetivoForm = { peso_objetivo: 0, velocidad: 'pausado', id_objetivo: 1 };
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
          this.objetivoForm = { peso_objetivo: 0, velocidad: 'pausado', id_objetivo: 1 };
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
        this.calcularCaloriasFinalesPorObjetivo();
      },
      error: (err) => {
        if (err.status === 404) {
          this.objetivosUsuario = [];
          this.caloriasFinales = this.caloriasRequeridas;
        } else {
          console.error('Error al obtener objetivos del usuario', err);
        }
      }
    });
  }
  

  editarObjetivo(obj: any) {
    this.objetivoForm = {
      peso_objetivo: obj.peso_objetivo,
      velocidad: obj.velocidad,
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
        // this.medidas = this.agruparMedidasPorNombre(data);
        console.log(this.medidas); // BORRAR
      },
      error: (err) => {
        console.error('Error al obtener medidas del usuario', err);
      }
    });
  }

  /*
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

  agruparMedidasPorNombre(medidas: any[]): any[] {
    const grupos: { [key: string]: any[] } = {};
  
    for (const medida of medidas) {
      const nombre = medida.nombre_medida;
      if (!grupos[nombre]) {
        grupos[nombre] = [];
      }
      grupos[nombre].push(medida);
    }

    return Object.values(grupos);
  }

  */

  guardarMedidaPorNombre(nombre_medida: string, medida: any) {
    // Verificar si el valor fue ingresado
    if (this.nuevoValor === 0) {
      console.error('Por favor ingresa un valor');
      return;
    }

    // Preparar la medida con el nuevo valor
    const nuevaMedida = {
      nombre_medida: 'peso',
      unidad_medida: 'kg',
      valor: this.nuevoValor,  // Establecer el valor ingresado
      fecha: this.fechaHoy // o la fecha que elijas
    };

    // Llamar al servicio para guardar la medida
    this.perfilService.postMedidaPorNombre(nombre_medida, nuevaMedida).subscribe({
      next: () => {
        console.log('Medida guardada correctamente');
        this.obtenerMedidas();
        this.nuevoValor = 0; // Limpiar el campo de entrada después de guardar
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

  calcularMetabolismoBasal() {
    const { edad, altura, peso, sexo } = this.perfilForm;
    if (sexo === 'H') {
      this.metabolismoBasal = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
    } else if (sexo === 'M') {
      this.metabolismoBasal = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
    }
  }

  calcularCaloriasRequeridas() {
    const { actividad } = this.perfilForm;
    let factorActividad = 1.2;

    switch (actividad) {
      case 'Poco':
        factorActividad = 1.2;
        break;
      case 'Moderado':
        factorActividad = 1.55;
        break;
      case 'Mucho':
        factorActividad = 1.9;
        break;
    }

    this.caloriasRequeridas = this.metabolismoBasal * factorActividad;
  }

  calcularCaloriasFinalesPorObjetivo() {
    this.calcularMetabolismoBasal();
    this.calcularCaloriasRequeridas();
  
    const objetivo = this.objetivosUsuario.length > 0
      ? this.objetivosUsuario[this.objetivosUsuario.length - 1]
      : null;
  
    if (!objetivo || !this.perfilForm.peso) {
      this.caloriasFinales = this.caloriasRequeridas;
      return;
    }
  
    const pesoActual = this.perfilForm.peso;
    const pesoObjetivo = objetivo.peso_objetivo;
    const velocidad = objetivo.velocidad;
  
    const diferencia = pesoObjetivo - pesoActual;
    let ajuste = 0;
  
    if (diferencia > 0) {
      ajuste = velocidad === 'rapido' ? 600 : 300;
    } else if (diferencia < 0) {
      ajuste = velocidad === 'rapido' ? -600 : -300;
    }
  
    this.caloriasFinales = this.caloriasRequeridas + ajuste;
  }
  

}

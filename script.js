const { createApp } = Vue

  createApp({
    data() {
      return {
        recordatorios: JSON.parse(localStorage.getItem('recordatorios')) || [],
        texto: ""
      }
    },
    methods: {
      cambiarPrioridad(entrada, prioridad){
        entrada.prioridad = prioridad;
        localStorage.setItem('recordatorios', JSON.stringify(this.recordatorios))
      },

      nuevaNota(){
        let long = this.recordatorios.length;
        let info = {
          id: long + 1,
          titulo: this.texto,
          hecho: false,
          prioridad: 3,
          fecha: Date.now()
        };
        this.recordatorios.push(info);
        this.texto = "";
        localStorage.setItem('recordatorios', JSON.stringify(this.recordatorios));
      },

      borrarNota(entrada){
        let index = this.recordatorios.indexOf(entrada);
        this.recordatorios.splice(index, 1);
        localStorage.setItem('recordatorios', JSON.stringify(this.recordatorios));
      },

      checkNota(entrada){
        entrada.hecho = !entrada.hecho;
        localStorage.setItem('recordatorios', JSON.stringify(this.recordatorios));
      },

      borrarNotasCompletadas(){
        let arrayFilt = this.recordatorios.filter((entrada) => !entrada.hecho);
        this.recordatorios = arrayFilt;
        localStorage.setItem('recordatorios', JSON.stringify(this.recordatorios));
      }
    },
    computed: {
      totalEntradasNoRealizadas(){
        return this.recordatorios.filter((recordatorio) => recordatorio.hecho == false).length;
      },
      totalEntradas(){
        return this.recordatorios.length;
      },
      entradasFiltradas(){

        // La funcion toLowerCase() es para que la busqueda sea insensible a mayusculas y minusculas
        
        let arrayFilt = this.recordatorios.filter((entrada) => entrada.titulo.toLowerCase().includes(this.texto.toLowerCase()));
        return arrayFilt.sort(function(a, b) {
          return b.prioridad - a.prioridad;
        });
      }
    }
  }).mount('#app')
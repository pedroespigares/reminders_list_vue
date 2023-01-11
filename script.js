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
        if(prioridad == "low"){
          entrada.prioridad = 1;
        } else if(prioridad == "medium"){
          entrada.prioridad = 2;
        } else if(prioridad == "high"){
          entrada.prioridad = 3
        }
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
        let arrayFilt = this.recordatorios.filter((entrada) => entrada.titulo.includes(this.texto));
        return arrayFilt.sort(function(a, b) {
          return b.prioridad - a.prioridad;
        });
      }
    }
  }).mount('#app')
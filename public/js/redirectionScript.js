

function counter() {
    let countdown = 3;
    let timerDiv = document.getElementById("timer");
    
    
    const ruta = () =>{
      let messagePath= window.location.href ;
      let indexPath= "http://localhost:3000/"
      let categoriesPath="http://localhost:3000/categorias"
      
      // if(messagePath==categoriesPath){
      //   return indexPath
      // }
      // return categoriesPath

      return messagePath==categoriesPath? indexPath:categoriesPath
    }
  
    let timer = setInterval(function () {
      timerDiv.innerHTML = `Regresando a la lista en: ${countdown}s`;
      countdown--;
      if (countdown === 0) {
        clearInterval(timer);
        window.location.href =ruta()
      }
    }, 1000);
  }
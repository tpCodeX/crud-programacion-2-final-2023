

function counter() {

    let countdown = 3;
    let timerDiv = document.getElementById("timer");
    let originalPath=window.location.href.toString();
    originalPath=originalPath.split("/");
    let newPath=`http://localhost:3000/${originalPath[3]}`
    let timer = setInterval(function () {
      timerDiv.innerHTML = `Regresando a la lista en: ${countdown}s`;
      countdown--;
      if (countdown === 0) {
        clearInterval(timer);
        window.location.href=newPath
      }
    }, 1000);
  }
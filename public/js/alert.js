export function showAlert(message, type) {
    var alertContainer = document.getElementById('alert-container');
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert');
  
    switch(type) {
      case 'success':
        alertElement.classList.add('alert-success');
        break;
      case 'warning':
        alertElement.classList.add('alert-warning');
        break;
      case 'error':
        alertElement.classList.add('alert-error');
        break;
      default:
        alertElement.classList.add('alert-info');
    }
  
    alertElement.textContent = message;
    alertContainer.appendChild(alertElement);
  
    setTimeout(() => {
      hideAlert(alertElement);
    }, 10000);
  }
  
 export function hideAlert(alertElement) {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.removeChild(alertElement);
  }
  
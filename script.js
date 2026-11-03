// CONFIGURACIÓN DE WHATSAPP
// Número internacional sin +, espacios ni guiones.
// Ejemplo: 59170000000

const WHATSAPP_NUMBER = "";

const form = document.getElementById("bookingForm");
const dateInput = document.getElementById("date");
const message = document.getElementById("formMessage");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

// FECHA MÍNIMA: HOY

function localISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

dateInput.min = localISODate(new Date());

// MENÚ MÓVIL

menuToggle.addEventListener("click", () => {
  const opened = mainNav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(opened)
  );
});

mainNav.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    mainNav.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});

// ENVIAR A WHATSAPP

function sendWhatsApp(text) {

  if (!/^[0-9]{10,15}$/.test(WHATSAPP_NUMBER)) {

    message.textContent =
      "Demo: configura el número de WhatsApp en script.js para probar el envío.";

    return;
  }

  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

// FORMULARIO DE RESERVA

form.addEventListener("submit", event => {

  event.preventDefault();

  const name = document
    .getElementById("patientName")
    .value.trim();

  const service = document
    .getElementById("service")
    .value;

  const date = dateInput.value;

  const time = document
    .getElementById("time")
    .value;

  const phone = document
    .getElementById("phone")
    .value.trim();

  if (!name || !service || !date || !time || !phone) {

    message.textContent =
      "Completa todos los campos para continuar.";

    return;
  }

  if (date < localISODate(new Date())) {

    message.textContent =
      "Selecciona una fecha igual o posterior a hoy.";

    return;
  }

  if (!/^[0-9+\s()-]{7,20}$/.test(phone)) {

    message.textContent =
      "Revisa el número de contacto.";

    return;
  }

  const dateFormatted =
    date.split("-").reverse().join("/");

  const text =
    "Hola, quisiera solicitar una consulta.\n\n" +
    "Nombre: " + name + "\n" +
    "Servicio: " + service + "\n" +
    "Fecha preferida: " + dateFormatted + "\n" +
    "Horario preferido: " + time + "\n" +
    "Teléfono: " + phone + "\n\n" +
    "Entiendo que esta es una solicitud y que el horario debe ser confirmado.";

  sendWhatsApp(text);

});
# Clínica Online

## Descripción

Este proyecto trata de imitar las el funcionamiento y la gestión de una clínica real, los roles principales del sistema son el `Administrador`, `Especialista` y   `Paciente`.

## Instalación

1. Clona el repositorio: `git clone https://github.com/tu-usuario/tu-repositorio.git`
2. Navega al directorio del proyecto: `cd nombre-del-proyecto`
3. Instala las dependencias: `npm install`

## Módulos

### Home:
Este será home de la aplicación, donde se encontrará el detalle de su propósito y demás infromación. Aquí mismo el usuario podrá tener acceso para iniciar sesión o registrarse.
<img src="https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81qu17djPBoopEJ7yRXI_8N8UfZiLCx2zahyJ5WXY7KGtzdhXpmAfmfDAeZE7FjlSLwQRIZK1qXTi0McBHNgGNV1nGY1=w1920-h937">

- Login: Aquí el usuario no identificado podra inicar sesión. En los botones de la izquierda se cuenta con acceso directo con ciertos usuarios del sistema, para demostrar el funcionamiento de la aplicación. Es importante que el usuario si es `Especialista` este previamente aprobado por el `Administrador` y con su mail verificado, en caso de ser `Paciente` solo tendrá que verificar su mail con la notificación que le llega por mail.

<img src="https://lh3.google.com/u/0/d/11NeiB-G_R2lqCARfsovoZM0HUS3fwihw=w1920-h937-iv1">

- Register: Aquí el usuario no identificado se podrá registrar, una vez registrado, tendrá que verificar sus mail y depende su rol, procederá de las formas explicadas en el punto anterior.

Como Paciente:
<img src="https://lh3.google.com/u/0/d/1vjffIzEjp0cqj05xTVghOVE7IVqTqAX4=w1429-h937-iv1">

Como Especialista:
<img src="https://lh3.google.com/u/0/d/1WwuKL_jtl5_oKBaQw1zZfA0LfbH0Jeah=w809-h937-iv1">


### Especialista:
Si el usuario es especialista, tendrá acceso a las siguientes funcionalidades:
- Verificar su Agenda: Aquí podra verificar que días y en que horarios atiende una especialidad.
<img src="https://lh3.google.com/u/0/d/1HoEm1ADcnj-aD7C5gcX0aiKXBjUtGB93=w1920-h937-iv1">

- Crear una Agenda: Aquí podrá asignar una especialidad de las existentes a un día específico, estos requísitos están atados a los requerimientos del trabajo práctico.

<img src="https://lh3.google.com/u/0/d/19qlgDGXJECerPoC056N94hlqiU7CMll-=w809-h937-iv1">


- Crear un Turno: Aquí podra asignar turnos desde el día de la fecha en que quiera hasta 15 días después. Ejemplo, si en su agenda especifica que atiende pediatria los Lunes de 09:00 a 19:00, podrá seleccionar un Lunes desde el día que está interactuando con el sistema hasta 15 días. En la foto el `Especialista` es pediatra los Miércoles y el día que se hizo el testeo es el `Lunes 12/06/2023`.

<img src="https://lh3.google.com/u/0/d/1VjuqfFbs3saOkvEj3u32McNuqezJ4BCp=w809-h937-iv1">


- Mis Turnos: En esta sección, el Especialista podrá ver sus turnos y el estado que tienen los mismos, para el poder `Aceptarlos` o  `Rechazarlos` y estos mismos sufrirán un cambio de estado (Funcionalidad pendiente a terminar).

<img src="https://lh3.google.com/u/0/d/1tVNeaFF23dRRamr7wl9towDnG-oQZ3R7=w809-h937-iv1">


#### Paciente:

- Mis Turnos: Aquí el paciente podrá ver sus turnos, con su estado.
<img src="https://lh3.google.com/u/0/d/1RQ_5DoKSYqASu8rS59ECpIXE1naJ5RDD=w1429-h937-iv1">

- Crear Turno: Aquí el paciente podrá sacar un turno, según la disponabilidad del especialista.

<img src="https://lh3.google.com/u/0/d/1V-0c_64w5PybuBV8A9RS3trvhveggROT=w1429-h937-iv1">


### Adminsitrador:

- Admisión: Aquí el usuario con perfil `Administrador` podrá admitir el acceso o no a los usuarios del sistema.

<img src="https://lh3.google.com/u/0/d/1IvEtkX-HKohHTX_a6Ymkvr9KhCL1CgFe=w1429-h937-iv1">

- Agregar Adminsitrador: Aquí el usuario con perfil `Administrador` podrá generar más usuarios de tipo `Adminsitrador`.

<img src="https://lh3.google.com/u/0/d/1ndRgbU3g78kWeStoIs_Hawpdod8329ku=w1429-h937-iv1">

## Contribución

1. Crea un fork del repositorio.
2. Crea una rama para tu contribución: `git checkout -b mi-contribucion`
3. Realiza los cambios y realiza commit: `git commit -m "Descripción de los cambios"`
4. Envía los cambios a tu repositorio: `git push origin mi-contribucion`
5. Abre una solicitud de extracción en GitHub.

## Estructura del proyecto

Para este proyecto, se conformó siguiendo una abstracción propia de `Atomic Design` separando todos los componentes, módulos, entre otros. en su orden correcto por responsabilidades.

<img src="https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81pTYnqy4HQntgkSwKlBRka6_GwpuZB99Et7aezz_LYwU9u2bnbFxVHleWievsdbhogDErxylhYIx-9yu-S_dhwtkUU3iQ=w1920-h937">


## Profesores

Franco Lippi.
Agustín Friadenrich.
Augusto Morelli.
Mario Rampi.

# Travis:
[Travis](https://travis-ci.com) es un servicio que el profesor ha recomendado, es un servicio de integración continua famosa, con buena documentación y la estructura de su archivo de configuración es sencilla de entender.
Es el primer servicio de integración continua que he configurado. Para utilizarlo simplemente tienes que darte de alta en
[Travis](https://travis-ci.com) y activar el repositorio (directamente en Travis)([Sigue estos pasos](https://travis-ci.com/getting_started)).
Después de activar el repositorio, tienes que configurar un fichero .travis.yml que indica las acciones que se realizarán en Travis.

## Mi fichero .travis.yml:
[Este fichero .travis.yml](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/.travis.yml) es el fichero de configuración para la integración continua.

Al principio especifico que utilice la imagen minimal, con esta línea:
```bash
$ language: minimal
```
Esta imagen está optimizado para ser más rápido y para usar menos espacio de disco, ya que solamente contiene Docker, python, algunas herramientas de red, herramientas de control de versiones y herramientas esenciales. No contiene nada más.

Ahora indico que se va a probar en dos distribuciones de linux, en [Focal](https://docs.travis-ci.com/user/reference/focal/) y en [Xenial](https://docs.travis-ci.com/user/reference/xenial/), he intentado usar osx y windows pero parece ser que Travis no los apoya ([OSX](https://github.com/travis-ci/travis-ci/issues/5738), [Windows](https://travis-ci.community/t/docker-linux-containers-on-windows/301/8)):
```bash
$ jobs:
  include:
    - os: linux
      dist: focal
    - os: linux
      dist: xenial
```
Ahora defino una variable de entorno que guarda la ruta del directorio de trabajo:
```bash
$ env:
  - HOME_DIR: ${HOME}/build/WolfYe98/Proyecto_IV_Bate
```
He visto que ```$TRAVIS_BUILD_DIR``` es la ruta absoluta del directorio donde el repositorio se está construyendo, es la misma que ```$HOME_DIR``` en este caso, entonces se podría usar también.

Al final ejecuto el test con el contenedor Docker:
```bash
$ script:
    - docker run -t -v $HOME_DIR:/test wolfye98/proyecto_iv_bate
```
```docker run``` descarga la imagen si dicha imagen no está en el local, entonces no tenemos que usar pull.

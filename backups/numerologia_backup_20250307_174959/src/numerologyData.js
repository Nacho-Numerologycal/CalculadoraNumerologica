/************************************************************
 * numerologyData.js
 *
 * Este archivo contiene:
 *  - El objeto numerologyInfo con la información detallada
 *    de cada número (0 a 9).
 *  - Las funciones de cálculo de números (reduceNumber, etc.).
 *  - El mapeo idealNumberMapping para la tabla ideal.
 *
 * NOTA IMPORTANTE:
 *   - Debes pegar “a mano” la información completa de cada
 *     número (0 a 9) en los lugares marcados como "TODO".
 *   - Respeta las propiedades (centro, reto, arquetipo, etc.).
 *   - Si te falta alguna propiedad porque no la usas, puedes
 *     borrarla; pero si la usas en la app, déjala vacía o
 *     rellénala con tu texto.
 ************************************************************/

/**
 * Objeto que almacena la información de cada número.
 * Rellena en cada "TODO" los textos completos de la numerología.
 */
export const numerologyInfo = {
  // -------------------------------------------------------
  // Número 0
  // -------------------------------------------------------
  0: {
    // TODO: Pega aquí cada campo de texto específico del número 0
    centro: "Todas las posibilidades, la conexión directa con la energía de la posición en la que se encuentra, Potencial ilimitado, Inicio de ciclo de vida, Eternidad, Manifestación del universo creador, Punto de partida, Voluntad, Inconsciente colectivo, Conexión con todo. Todas las oportunidades, la vida viviéndose a sí misma a través de mi experiencia.  ",
    reto: "El vacío, la nada, la falta, necesidad, abandono, abuso, desmerecimiento, sin valor propio, sin identidad, sin sentido, sin propósito, Lo que se esconde, lo que no se quiere ver, lo que no reconozco en mí, espejos del yo. Inabarcable.  ",
    arquetipo: "La misma esencia del arquetipo. O su voluntad.",
    energia: "Todas las energías, ninguna energía.",
    aprendizaje: "Aprender a manifestar quien es, a encontrar en su interior otras posibilidades, a adaptarse a lo que pasa, a materializarse o a desaparecer, a conectarse con la fuente, a vivirse desde el arquetipo mismo, a no ser abusado por no saber quien es ni lo que quiere, a aceptar el vacío y el abismo inconmensurable.",
    conclusion: "Al situarnos en el 0, nos encontramos en el punto donde todo puede surgir y todo puede desaparecer. Esta energía nos invita a reconocer nuestra presencia en el gran lienzo de la existencia, recordándonos que el vacío no es ausencia de creación, sino el preludio de infinitas posibilidades. Cuando nos permitimos entrar en este espacio de 'nada', a menudo emergen visiones, impulsos creativos y semillas de nuevas experiencias. A nivel terapéutico y transpersonal, el 0 nos habla de la humildad de reconocernos parte de un todo mayor, reforzando la idea de que cada historia comienza desde un punto neutro. La lección principal radica en abrazar el potencial puro, entendiendo que el vacío también puede ser fuente de enorme poder interior."
  },

  // -------------------------------------------------------
  // Número 1
  // -------------------------------------------------------
  1: {  
    centro: "Yo, ego, identidad, consciencia, padre, paternal, paternidad, energía masculina, masculinidad, ser hombre, integrar mi energía masculina, lado derecho, impulso, protagonismo, decisión, acción, comparación, diferencia, novedad, capacidad de mando y dirección, líder, innovador, original, exclusivo, emprendedor, independiente, autónomo, ímpetu, competitivo, justo, idealista, atrevido, lanzado, audaz, primerizo, principiante, potencial ilimitado, inicio de ciclo de vida, progresión, crecimiento, mirada al futuro, ir hacia adelante, unidad con el universo, punto de partida, intuición, espiritualidad, mando, gobierno, tomar las riendas de mi vida, determinación, pionero, ambición consciente, autoestima, progreso, expansión, conquista pionero, el porvenir. Cuidar y proteger los límites.",  
    reto: "Infantilismo, ideas fijas, impulsividad, nerviosismo, egocentrismo, orgullo, soberbia, autoritarismo, agresividad, despotismo, impaciencia, intolerancia. Debe aprender a compartir y colaborar. Miedo a estar solo, incomprensión. Inseguridad, miedo a decidir o a las repercusiones de la decisión, perdida de conexión.",  
    arquetipo: "Padre, Rey, jefe, el temerario, el déspota autoritario, el mentor, el líder, el emprendedor, el loco, el pionero, el impulsivo, el inocente, el novato.",  
    energia: "Masculina, Yang, paternal, fuerte, activa, expansiva, independiente, creativa, progresiva. Intrusiva y dañina por exceso.",  
    aprendizaje: "Deberá buscar su identidad con cada decisión, encontrando su propio camino interior. Aprender a compartir y trabajar en equipo. No culpabilizarse por cambiar de camino sin acabarlo. Aprender a canalizar la energía emprendedora y de liderazgo para no sufrir estrés, ansiedad y nervios.",  
    edad: "0 a 1 año. Primera etapa de la vida de la persona donde se empieza a estructurar la psique y el Yo.",  
    talentos: "Innovar, emprender, liderar, sorprenderse, abrir caminos y empezar proyectos, la intuición, decidir, experimentar.",  
    caminoDeVida: "Decidir quién soy a cada paso, generar mi propia autonomía, ser auténtico, atreverme a liderar, superar el egocentrismo.",  
    proposito: "Claridad de lo que quiero, alineamiento con la vida, no necesitar ser nadie a pesar de serlo, auténtica identidad, ser yo mismo, diferenciarme del resto, encontrar mi camino, decidir quién quiero ser.",  
    mental: "Mente emprendedora, calculadora de beneficios, impulsiva, rápida, utópica, desconfiada, competitiva, ágil, decididora, maniquea, absolutista, el mal menor, intuitiva, realista, atrevida.",  
    emocionalRelaciones: "Emoción espontánea, sorprendida, exaltada, repentina, muy polarizada y algo extremista. Impulsividad y desorientación, valiente. Necesidad de autoafirmación",  
    trabajo: "Emprendimiento y liderazgo, autonomía, ejecutiva, innovación, identidad.",  
    familia: "Identidad y autonomía. Padre. Masculinidad, patriarcado, imposición, castración, autoridad. Diferenciarme y encontrar mi propio camino. Cabeza de familia, responsabilidad autoimpuesta, encadenado, sin alternativa.",  
    territorio: "Herencias, decisiones, machismos, destierros, emprendimientos fallidos, pérdidas por impulsos. Muerte repentina o abandono del padre de familia del patriarca.",  
    energetico: "Impulso, emprendimiento, expansión, identidad, ir hacia delante, conquista, incursión.",  
    creativo: "Emprendimiento, liderazgo, encontrar recursos, decidir quién soy y qué hacer.",  
    sexual: "Activo, decidido, impaciente, inocente, tolerante, curioso, abierto a nuevas experiencias. Algo egoísta.",  
    conclusion: "El 1 representa la chispa inicial de la conciencia individual: la afirmación de 'yo soy'. Es la fuerza que nos anima a tomar la iniciativa y a plantarnos en el mundo con determinación."  
  },  
  2: {  
    centro: "Dar, incondicionalidad, generosidad, abundancia, las relaciones, ser madre, tener madre, maternidad, materialidad, pareja y amistad, ser mujer, integrar mi energía femenina, escuchadora, tranquilidad, empatía, mediador, sensible, equilibrado y equitativo. Genera confianza y comodidad en su presencia. Cooperación, diplomacia, considerada, matrona o ayudar a nacer, engendrar, proteger, cuidar del otro, dualidad, receptividad, tacto, sensibilidad, empatía, serenidad, paz, completitud.",  
    reto: "Dependencia, egoísmo, olvido de sí mismo, dogmatismo (blanco o negro), imitación, pasividad, apatía, letargo, pesimismo, falta de confianza en sí mismo, depresión, indecisión, cobardía, complejo de inferioridad, rol de víctima, vivir a la sombra de los demás, sumisión, agresiva-pasiva, sibilina, Femme Fatal. Dar y esperar a cambio, dar tanto que me vacío, el rencor, la dependencia, abuso.",  
    arquetipo: "Madre, compañera, escuchador, amigo leal, la intuición, lo inconsciente, lo femenino, la reina.",  
    energia: "Femenina, Ying, maternal, suave, delicada, introvertida, permeable, atractiva, fluida, profunda, protectora, devastadora por exceso.",  
    aprendizaje: "Deberá aprender a no necesitar ni depender para hacer su vida, a no dejarse pisotear ni querer controlar la situación para no sufrir. Aprender la abundancia y dar incondicional.",  
    edad: "De antes de 0 a 3 años.",  
    talentos: "Generosidad, empatía, escucha activa, compatibilidad, trabajo en equipo, lealtad, confianza",  
    caminoDeVida: "Crear, compartir, hacer proyectos en común (maternidad), no compararse tanto ni desvalorizarse encontrando su propia voz. Conocerme al conocer a otros. No victimizarse.",  
    proposito: "Ser una persona auténtica y generosa, dar protegiendo sus límites, aceptar y perdonar. Maternidad y relaciones.",  
    mental: "Mente generosa, colaborativa, tranquila, neurona espejo, flexible, abierta, pensamiento alternativo (blanco o negro)",  
    emocionalRelaciones: "Relaciones, Emoción directa, cómplice, amable, leal, sensible, enamoradiza, vergonzosa, pasiva, algo melancólica, miedo, culpa y desvalorización, preocupada",  
    trabajo: "Cooperación, equipo, mano derecha, 2º, dar.",  
    familia: "Maternidad, pareja, relación, abuso, depender",  
    territorio: "Deudas, imposiciones, robos, sin cabeza de familia, anulación.",  
    energetico: "Compatible, dar, protectora, enganche, crear",  
    creativo: "Equilibrio, paz, confort, dar, sentirse querida",  
    sexual: "Complaciente, abierta, de 1 pareja, sensual, sumisa Pasiva.",  
    conclusion: "El 2 representa el principio de la dualidad y la cooperación. Su energía femenina invita a crear vínculos desde la empatía y la escucha, promoviendo la unión y la generosidad mutua."  
  },  
  3: {  
    centro: "Artístico, espontáneo, sociable, divertido, puente, inspiración, creativo, imaginativo, espíritu lúdico, alegre, expresivo, optimista, abundante, muy sensible y con un gran poder de seducción. Representa a los hermanos, la amistad, el niño interior, lo social, el entusiasmo, la versatilidad, la inquietud, el desparpajo, sin vergüenza, extrovertido, buen rollo, influyente, despreocupado, fluir, divertirse, reírse, disfrutar.",  
    reto: "Duda, verborrea/mutismo, irresponsabilidad con tendencia escapista, extravagante, frívolo, superficial, se aburre con facilidad, impaciente, arriesgado, intolerante, muy criticón, caprichoso, mentiroso, inconcluso y celoso. Miente a los demás o a sí mismo por no aceptar su parte de responsabilidad en lo que pasa. Todo bajo sus reglas. El reconocimiento. Peter Pan no quiere madurar.",  
    arquetipo: "Masculina, El hijo, el príncipe, la princesa, el artista, cantante, el mediador, el optimista, el infantil, histriónico, parlanchín, niño interior, bromista, bufón, el mentiroso, el embaucador. El puer aeternus.",  
    energia: "Expansiva, vibrante, comunicativa, creativa, alegre, entusiasta, juvenil, dinámica, inspiradora, expresiva, social, lúdica, versátil, adaptable, efervescente, contagiosa, motivadora, radiante, chispeante, estimulante, carismática, magnética.",  
    aprendizaje: "Deberá aprender a canalizar su energía creativa de manera constructiva, evitando la dispersión y la superficialidad. Es importante que desarrolle la constancia y la disciplina para llevar a cabo sus proyectos hasta el final. Además, debe trabajar en la honestidad consigo mismo y con los demás, asumiendo responsabilidades y evitando la tendencia a evadir situaciones incómodas. Aprender a escuchar y a considerar las opiniones ajenas enriquecerá sus relaciones y su crecimiento personal.",  
    edad: "3 a 7 años.",  
    talentos: "Generosidad, empatía, escucha activa, compatibilidad, trabajo en equipo, lealtad, confianza",  
    caminoDeVida: "Expresar su creatividad y optimismo, inspirar a otros con su entusiasmo, desarrollar habilidades de comunicación y autoexpresión, aprender a equilibrar la alegría con la responsabilidad, cultivar relaciones sociales significativas, explorar diversas formas de arte y cultura, mantener una actitud positiva ante los desafíos, buscar oportunidades para el crecimiento personal, compartir su visión única del mundo, contribuir al bienestar de la comunidad.",  
    proposito: "Desarrollar y compartir su creatividad innata, utilizar su capacidad de comunicación para inspirar y motivar a otros, encontrar alegría y satisfacción en la autoexpresión, contribuir al mundo a través de sus talentos artísticos, fomentar la conexión y la comunidad a través de la sociabilidad, mantener una perspectiva optimista y entusiasta, servir como un faro de luz y positividad, explorar y manifestar su imaginación sin límites, equilibrar la espontaneidad con la responsabilidad, dejar una huella positiva en las vidas de quienes lo rodean.",  
    mental: "Mente ágil, creativa, curiosa, innovadora, comunicativa, expresiva, adaptable, versátil, imaginativa, optimista, entusiasta, sociable, persuasiva, ingeniosa, lúdica, espontánea, abierta, receptiva, dinámica, efervescente.",  
    emocionalRelaciones: "Emoción efervescente, alegre, entusiasta, expresiva, comunicativa, sociable, optimista, espontánea, lúdica, versátil, adaptable, creativa, imaginativa, cariñosa, afectuosa, empática, inspiradora, motivadora, contagiosa, radiante.",  
    trabajo: "Áreas relacionadas con la comunicación, el arte y la creatividad. Profesiones como escritor, actor, músico, publicista, periodista, diseñador gráfico, orador motivacional, relaciones públicas, maestro de artes, organizador de eventos, influencer, community manager, guionista, director creativo, fotógrafo, ilustrador, animador, locutor, presentador, comediante.",  
    familia: "Relaciones dinámicas y comunicativas, fomento de la expresión individual, ambiente alegre y creativo, apoyo en actividades artísticas, celebración de logros personales, promoción de la sociabilidad, estímulo de la imaginación, participación en eventos culturales, creación de tradiciones lúdicas, equilibrio entre la libertad y la responsabilidad.",  
    territorio: "Espacios abiertos y luminosos, decoración colorida y artística, áreas dedicadas a la creatividad, presencia de elementos que inspiran alegría, ambientes que fomentan la interacción social, lugares para el entretenimiento y la diversión, conexión con la naturaleza, espacios para la meditación y la reflexión, entornos que promueven la flexibilidad y la adaptabilidad, zonas que invitan a la exploración y el descubrimiento.",  
    energetico: "Energía vibrante y en constante movimiento, con una necesidad innata de actividad y cambio.",  
    creativo: "Creatividad expresada a través de la exploración de diferentes artes, culturas y experiencias; tendencia a innovar y experimentar.",  
    sexual: "En el ámbito sexual, el número 3 se caracteriza por su vivacidad emocional y juego. Disfruta de una vida íntima llena de energía y creatividad, buscando hacerla interesante y satisfactoria.",  
    conclusion: "La energía del 3 se asocia con la expresión genuina de la alegría de vivir. Es el número que potencia la risa, el juego y la creatividad espontánea, invitando a reconectar con el niño interior para vivir con mayor ligereza."  
  },  
  4: {  
    centro: "Materialización, Transgeneracional, referencia, estabilidad, materia, casa, cuerpo, trabajo, orden, disciplina, perseverancia y constancia. Confianza. Excelencia mental, productivo, no rompe la palabra dada. Equilibrio, seguridad. Vocación de servicio, el bocado, los recursos, la autovalidación, autoexamen. Metódicos, confiables, meticulosos, leales, responsables, pacientes, comprueban y depuran cada error, sistemáticos, protectores, defensores, congregadores, rutinarios, armonizadores, valor seguro, tradición. El número 4 está asociado con la inteligencia, el esfuerzo, la honestidad y un gran sentido de generosidad.",  
    reto: "Acumulación, autoritarismo, rigidez, testarudez, avaricia, intolerancia, pesimismo, estrechez de miras, tendencia al drama, querer hacerse querer demostrando a los demás la propia eficiencia.",  
    arquetipo: "Cocinero, gestor, contable, servicio, referente, inmutable, tradicional, desconfiado, araño, constructor, capacitador.",  
    energia: "Masculina, estable, estructurada, práctica, mantenimiento de sistemas.",  
    aprendizaje: "Desarrollar flexibilidad, adaptabilidad y apertura al cambio.",  
    edad: "De 7 a 12 años, etapa en la que se busca consolidar la carrera profesional y establecer bases sólidas en la vida personal y laboral.",  
    talentos: "Organización, planificación, capacidad para construir y mantener estructuras, fiabilidad, atención al detalle, habilidades administrativas y capacidad para trabajar de manera constante hacia objetivos a largo plazo. Son personas ordenadas que valoran la estabilidad y estructura, con una gran capacidad para resolver problemas y organizarse bien. Mantenimiento de sistemas.",  
    caminoDeVida: "Indica una trayectoria enfocada en la construcción de bases sólidas, la búsqueda de estabilidad y el logro de metas a través del trabajo arduo y la perseverancia. Su misión de vida se basa en desarrollar su capacidad de trabajo, estableciendo rutinas y prestando atención a los detalles.",  
    proposito: "Se relaciona con la misión de establecer estructuras duraderas, promover el orden y la disciplina, y servir como pilar de confianza y seguridad para los demás.",  
    mental: "Mente analítica, lógica, enfocada en detalles y procedimientos. Tendencia a planificar meticulosamente y a abordar problemas de manera práctica y estructurada.",  
    emocionalRelaciones: "Busca relaciones estables y seguras. Puede mostrar afecto a través de acciones concretas y confiables más que mediante expresiones emocionales efusivas. Valora la lealtad y la consistencia en sus vínculos. Sin embargo, pueden ser inflexibles y les cuesta expresar sus sentimientos, lo que podría llevar a que su pareja se sienta poco atendida.",  
    trabajo: "Destaca en roles que requieren organización, precisión y responsabilidad. Profesiones como ingeniería, arquitectura, contabilidad, administración y gestión de proyectos son adecuadas. Son prácticos, metódicos y responsables, orientados hacia el logro de metas tangibles y el establecimiento de estructuras sólidas en sus vidas.",  
    familia: "Asume el rol de proveedor y protector, buscando crear un entorno seguro y estructurado para sus seres queridos.",  
    territorio: "Valora propiedades y activos tangibles, viendo en ellos una manifestación de seguridad y estabilidad.",  
    energetico: "Posee una energía intensa y enfocada, con una fuerte motivación para alcanzar metas y superar desafíos.",  
    creativo: "Creatividad aplicada de manera práctica, como en la construcción, el diseño estructural o la mejora de sistemas existentes.",  
    sexual: "Enfoque tradicional y constante, valorando la estabilidad y la confianza en la intimidad.",  
    conclusion: "El 4 es la raíz que sostiene el árbol de nuestra vida, la base firme desde la cual podemos expandirnos sin perder el equilibrio."  
  },  
  5: {  
    centro: "Energía, cruzar fronteras, salir de la zona de confort, comunicación, libertad, vida, intensidad, cambio, aventura, rapidez, velocidad, adrenalina, acción y sexualidad. Representa al extranjero, viajar, otras culturas; son prácticos, aborrecen la rutina y el trabajo aburrido. El cinco es el comunicador que viene a movilizar el mundo. Les atrae lo distinto, lo diferente, y es crucial que escuchen su voz interior. Curiosos, les encanta aprender y experimentar; disfrutan de la buena ropa, la buena comida y, en definitiva, del buen vivir. Adaptabilidad, curiosidad, versatilidad, todoterreno, filosofía, maneras diferentes de pensar y ver el mundo.",  
    reto: "Miedo, huir de la responsabilidad y el compromiso, impaciencia, irritabilidad, violencia, inestabilidad, inconstancia, insatisfacción, indiferencia y necesidad de libertad que puede volverles rebeldes. Deberán tener cuidado con el libertinaje, las adicciones (alcohol, drogas, sexo, juego…); pueden ser nerviosos y criticones; les da miedo sentirse vulnerables, y el miedo en general. Por eso, pueden ser personas controladoras e inestables.",  
    arquetipo: "Guerrero, adolescencia, caballero, rebelde sin causa, justiciero.",  
    energia: "Masculina, dinámica, inquieta, versátil, orientada al cambio y a la exploración constante.",  
    aprendizaje: "Desarrollar estabilidad y responsabilidad, aprender a comprometerse y a manejar la libertad de manera constructiva. Evitar caer en excesos y vicios, y cultivar la paciencia y la constancia.",  
    edad: "de 12 a 16 años. Etapa de la adolescencia y juventud temprana, donde predomina la búsqueda de identidad, la exploración, la rebeldía y el deseo de independencia.",  
    talentos: "Comunicación efectiva, adaptabilidad, capacidad para motivar e inspirar a otros, ingenio, creatividad, habilidades sociales y facilidad para aprender nuevos idiomas y culturas.",  
    caminoDeVida: "Indica una trayectoria enfocada en la búsqueda de libertad personal, experiencias diversas y crecimiento a través del cambio y la adaptación.",  
    proposito: "Se relaciona con la misión de promover la libertad, el cambio positivo y la expansión de horizontes, tanto propios como de los demás.",  
    mental: "Mente ágil, curiosa, abierta a nuevas ideas y perspectivas. Tendencia a pensar de manera no convencional y a buscar soluciones innovadoras.",  
    emocionalRelaciones: "Busca relaciones que ofrezcan libertad y espacio personal. Valora la espontaneidad y la emoción, pero puede tener dificultades con el compromiso a largo plazo.",  
    trabajo: "Destaca en roles que requieren versatilidad, comunicación y adaptabilidad. Profesiones como periodismo, ventas, turismo, publicidad y entretenimiento son adecuadas.",  
    familia: "Puede asumir roles que aporten dinamismo y novedad al núcleo familiar, aunque debe trabajar en mantener la estabilidad y el compromiso.",  
    territorio: "Se siente atraído por lugares diversos y cambiantes; disfruta explorando nuevos entornos y culturas.",  
    energetico: "Energía vibrante y en constante movimiento, con una necesidad innata de actividad y cambio.",  
    creativo: "Creatividad expresada a través de la exploración de diferentes artes, culturas y experiencias; tendencia a innovar y experimentar.",  
    sexual: "Enfoque apasionado y aventurero, buscando experiencias diversas y emocionantes; valora la libertad y puede evitar relaciones posesivas o restrictivas.",  
    conclusion: "La vibración del 5 nos anima a romper barreras y a descubrir la inmensa riqueza que se esconde en la diversidad."  
  },  
  6: {  
    centro: "Pasión, responsabilidad, sensibilidad y empatía, armonía, emoción, amor, tribu, comunidad, grupo, familia, servicio, decoración, estética, estilo, amabilidad, generosidad, ayuda, protección, sanación. Los enamorados, la familia, la tribu, mi círculo cercano, pasar del yo al nosotros, la salud, el cuidado. Compasión y protección de los suyos.",  
    reto: "Posesión, celos, hiperresponsabilidad, perfeccionismo, autoestima baja, dependencia, sentimiento de abandono, falta de amor, no conseguir lo que se piensa que se merece, autocrítica, sensación de no ser querido.",  
    arquetipo: "Familia, enamorados, corte, cuidadora, sanadora, terapeuta.",  
    energia: "Femenina, nutridora, equilibrada, orientada al bienestar y la cohesión del grupo.",  
    aprendizaje: "Desarrollar límites saludables, equilibrar la entrega a los demás con el autocuidado, evitar la sobreprotección y fomentar la independencia tanto propia como de los seres queridos.",  
    edad: "De 16 a 35. Etapa adulta joven, donde se consolidan las relaciones familiares y comunitarias, y se asumen responsabilidades en el cuidado de otros.",  
    talentos: "Habilidad para crear ambientes armoniosos, capacidad de mediación y resolución de conflictos, destreza en actividades artísticas y estéticas, vocación de servicio y apoyo emocional.",  
    caminoDeVida: "Indica una trayectoria enfocada en la búsqueda de armonía en las relaciones, responsabilidad hacia los demás y la creación de un entorno familiar estable y amoroso.",  
    proposito: "Se relaciona con la misión de servir a la comunidad, promover el amor incondicional y ser un pilar de apoyo y sanación para quienes lo rodean.",  
    mental: "Mente orientada a la empatía, con pensamiento enfocado en el bienestar colectivo y la resolución pacífica de problemas.",  
    emocionalRelaciones: "Busca relaciones profundas y significativas, valora la lealtad y el compromiso, y tiende a expresar amor a través de actos de servicio y cuidado.",  
    trabajo: "Destaca en profesiones relacionadas con la enseñanza, la medicina, la terapia, el diseño de interiores y cualquier ámbito que implique servicio y apoyo a otros.",  
    familia: "Asume roles centrales en la dinámica familiar, actuando como cuidador principal y fuente de unión entre los miembros.",  
    territorio: "Se siente atraído por espacios acogedores y estéticamente agradables, buscando siempre mejorar su entorno para el bienestar de todos.",  
    energetico: "Energía constante y equilibrada, con una fuerte inclinación hacia actividades que promuevan la salud y el bienestar.",  
    creativo: "Talento para las artes, especialmente en áreas que embellecen el entorno y fomentan la armonía, como la música, la pintura y la decoración.",  
    sexual: "Enfoque afectuoso y comprometido, buscando conexiones emocionales profundas y valorando la intimidad como una expresión del amor y la unión.",  
    conclusion: "El 6 representa la fuerza cohesionadora del amor y la responsabilidad afectiva. Su influencia impulsa a crear entornos de armonía y cuidado mutuo."  
  },  
  7: {  
    centro: "Mente, claridad, consciencia; conocimiento, personas lógicas, racionales y cultas; vínculo materia-espíritu; magnético y enigmático; analista brillante; transmutador; escéptico de mente abierta y espiritual; estudioso, hogareño, diplomático; reflexión; fe y salto al vacío; introversión, introspección, primera espiritualidad. Análisis, perfeccionismo, planificación y estrategia. Canalizadores.",  
    reto: "Ruido mental, frialdad, hiperracionalidad; parecer estar en babia o ausente; temperamental y explosivo en ocasiones; obsesivo mental, retorcido, pesimista; aislados; parálisis por análisis.",  
    arquetipo: "El bibliotecario, el alquimista, el ermitaño bohemio, el psicólogo, el buscador.",  
    energia: "Masculina, introspectiva, mística, orientada hacia la búsqueda de la verdad y la comprensión profunda.",  
    aprendizaje: "Desarrollar confianza en la intuición y en la sabiduría interior. Aprender a equilibrar la mente analítica con la espiritualidad y la sensibilidad emocional. Evitar el aislamiento excesivo y fomentar conexiones significativas con los demás.",  
    edad: "De 35 a 45. Etapa de madurez y reflexión, donde se busca un entendimiento más profundo de la vida y del propósito personal.",  
    talentos: "Investigación, análisis profundo, intuición aguda, capacidad para enseñar y compartir conocimientos, habilidades filosóficas y espirituales.",  
    caminoDeVida: "Indica una trayectoria enfocada en la búsqueda de conocimiento, la introspección y el desarrollo espiritual.",  
    proposito: "Se relaciona con la misión de comprender las verdades más profundas de la existencia y compartir esa sabiduría con otros.",  
    mental: "Mente analítica, introspectiva, con inclinación hacia la contemplación y la investigación de lo desconocido.",  
    emocionalRelaciones: "Busca conexiones profundas y significativas, aunque puede mostrar reserva emocional. Valora la autenticidad y la comprensión mutua en sus relaciones.",  
    trabajo: "Destaca en roles que requieren investigación, análisis y profundidad de pensamiento. Profesiones como científico, filósofo, escritor, investigador y maestro son adecuadas.",  
    familia: "Puede asumir roles de guía y consejero, proporcionando sabiduría y perspectiva a los miembros de la familia.",  
    territorio: "Prefiere entornos tranquilos y contemplativos que fomenten la reflexión y el crecimiento espiritual.",  
    energetico: "Energía enfocada en la introspección y el crecimiento espiritual, con una tendencia hacia la meditación y la contemplación.",  
    creativo: "Creatividad manifestada en formas que exploran lo desconocido, como la escritura, la filosofía y las artes místicas.",  
    sexual: "Enfoque reservado y profundo, buscando conexiones que trasciendan lo físico y se alineen con una unión espiritual y emocional; valora la intimidad como una expresión sagrada del amor universal.",  
    conclusion: "El 7 es el puente entre la razón y la espiritualidad, guiando la búsqueda de conocimiento y la expansión de la conciencia."  
  },  
  8: {  
    centro: "Administrador, manifestador, poder, magia, visión, dinero, éxito, fama, talentos, transformación, transmutación y cambio; carisma, fuerza, empuje, presencia; administración; justicia, ambición, disciplina, culto al cuerpo y ejercicio físico, competitivo, equilibrar, encontrar recursos de donde no hay, práctico, eficiente y pragmático. Atentos, presentes, aprovechan cualquier oportunidad.",  
    reto: "Impotencia, manipulación, soberbia, abuso de poder, despotismo, codicia, materialismo, arrogancia, tiranía, agresividad, violencia, crueldad; sentimiento de superioridad y falta de escrúpulos; necesidad de reconocimiento profesional.",  
    arquetipo: "El administrador, el CEO, el arquitecto, el mago, el conseguidor, el visionario, el arrogante, ególatra, narcisista.",  
    energia: "Masculina, dinámica, orientada a la acción y a la consecución de objetivos materiales y espirituales.",  
    aprendizaje: "Desarrollar la humildad, la empatía y el equilibrio entre lo material y lo espiritual. Aprender a utilizar el poder y la autoridad de manera ética y responsable, evitando caer en el materialismo excesivo y la arrogancia.",  
    edad: "De 45 a 60 años. Etapa de madurez, donde se busca la consolidación profesional y personal, y se asumen roles de liderazgo y responsabilidad.",  
    talentos: "Habilidad para gestionar recursos, liderazgo natural, capacidad para manifestar objetivos, visión estratégica, determinación y perseverancia.",  
    caminoDeVida: "Indica una trayectoria enfocada en el logro de metas materiales y espirituales, con un énfasis en la autodisciplina, la ambición y la capacidad para influir positivamente en el entorno.",  
    proposito: "Se relaciona con la misión de equilibrar el mundo material y espiritual, utilizando el poder y la influencia para el bien común y el crecimiento personal.",  
    mental: "Mente analítica, orientada a la planificación y a la toma de decisiones estratégicas. Capacidad para visualizar el panorama general sin perder de vista los detalles.",  
    emocionalRelaciones: "Busca relaciones que aporten estabilidad y apoyo mutuo. Puede tender a ser dominante, por lo que es esencial cultivar la empatía y la comprensión hacia las necesidades de los demás.",  
    trabajo: "Destaca en roles de liderazgo y gestión, como ejecutivos, empresarios, administradores y cargos públicos.",  
    familia: "Asume el papel de proveedor y protector, buscando asegurar el bienestar y la estabilidad económica del núcleo familiar.",  
    territorio: "Valora propiedades y activos tangibles, viendo en ellos una manifestación de éxito y seguridad.",  
    energetico: "Posee una energía intensa y enfocada, con una fuerte motivación para alcanzar metas y superar desafíos.",  
    creativo: "Creatividad aplicada a la innovación en negocios, estrategias financieras y proyectos que requieren una visión a largo plazo.",  
    sexual: "Enfoque apasionado y vigoroso, con una inclinación hacia relaciones intensas y profundas.",  
    conclusion: "El 8 simboliza el poder consciente y la capacidad de transformar la realidad a través de la acción ética. Es un recordatorio de que la verdadera grandeza surge al equilibrar la fuerza interna con la humildad y el compromiso social."  
  },  
  9: {  
    centro: "Humanitario, altruista, sabio, ayudador; sanadores, terapeutas, intuitivos y perceptivos; muy enigmáticos y místicos, profundos, francos, callados, generosos, calmados, difíciles de engañar; buscadores de sabiduría y tolerantes; tienen mucha presencia y han venido a aprender a soltar. Intuitivos, vivos, perspicaces, médiums. Universales. Representa la culminación de ciclos, la plenitud y la realización espiritual. Asociado con la compasión, la humanidad y la conexión espiritual. Simboliza la paciencia, la tolerancia y los desenlaces. Número de la perfección y la verdad universal.",  
    reto: "Ingenuo, fanático, terco, ansioso, escéptico; tiene que trabajar la insatisfacción, la inconstancia, la desconexión, el aislamiento, la marginación, la vagancia, la ausencia, el apego y la tendencia a la depresión; aceptar su condición. Puede enfrentar desafíos relacionados con el desapego, el perdón y la liberación de resentimientos. Tendencia a cargar con responsabilidades ajenas, lo que puede generar agotamiento emocional. Necesidad de equilibrar el idealismo con la realidad práctica.",  
    arquetipo: "El místico, el sabio, Merlín, el gurú, el ego espiritual. El filántropo, el maestro espiritual, el visionario humanitario, el artista inspirado, el líder compasivo.",  
    energia: "Masculina/Femenina, andrógina, universal, compasiva, orientada al servicio desinteresado y a la elevación espiritual.",  
    aprendizaje: "Desarrollar el desapego y la capacidad de cerrar ciclos. Aprender a equilibrar el servicio a los demás con el autocuidado. Cultivar la paciencia y la tolerancia, y evitar el sacrificio personal excesivo. Fomentar la conexión espiritual y la búsqueda de la verdad universal.",  
    edad: "De 60 en adelante. Etapa de madurez y plenitud, donde se busca la realización personal y la contribución al bienestar colectivo.",  
    talentos: "Empatía profunda, capacidad de sanación, liderazgo espiritual, creatividad artística, sabiduría intuitiva, habilidad para inspirar y guiar a otros hacia el crecimiento personal y colectivo.",  
    caminoDeVida: "Indica una trayectoria enfocada en el servicio humanitario, la búsqueda de la verdad espiritual y la realización de proyectos que beneficien a la humanidad.",  
    proposito: "Se relaciona con la misión de enseñar, sanar y elevar la conciencia colectiva, promoviendo la compasión y la comprensión universal.",  
    mental: "Mente amplia y filosófica, inclinada hacia el pensamiento abstracto y la contemplación profunda. Tendencia a analizar el propósito de la vida y las conexiones espirituales.",  
    emocionalRelaciones: "Busca relaciones basadas en la autenticidad, la profundidad emocional y la conexión espiritual. Puede mostrar amor de manera desinteresada y universal, a veces sacrificando necesidades personales por el bienestar de otros.",  
    trabajo: "Destaca en roles que implican servicio a la comunidad, enseñanza, sanación y artes creativas. Profesiones como terapeuta, consejero, artista, maestro espiritual y trabajador social son adecuadas.",  
    familia: "Asume el rol de guía y apoyo emocional, promoviendo la armonía y el crecimiento espiritual dentro del núcleo familiar.",  
    territorio: "Se siente atraído por lugares que fomenten la paz, la reflexión y la conexión con lo trascendental; puede inclinarse por entornos naturales o espacios dedicados a la meditación y el estudio espiritual.",  
    energetico: "Energía serena y equilibrada, con una fuerte conexión con lo espiritual; capacidad para revitalizar a otros a través de su presencia calmada.",  
    creativo: "Creatividad orientada hacia la expresión artística que inspire y eleve la conciencia; talento en disciplinas como la música, la poesía, la pintura y la escritura.",  
    sexual: "Enfoque trascendental y profundo, buscando una unión que trascienda lo físico y conecte en niveles espirituales y emocionales; valora la intimidad como una expresión sagrada del amor universal.",  
    conclusion: "El 9 representa la sabiduría universal y la culminación de ciclos, invitándonos a soltar lo que ya no sirve y a servir a la humanidad con compasión."  
  },
    // -------------------------------------------------------
  // Número 11
  // -------------------------------------------------------
  11: {
    centro: "Intuición, inspiración, visión espiritual. Representa la evolución más elevada del 1 y el 2. Persona sumamente intuitiva, con gran liderazgo y dotes de mando, capaz de aconsejar y guiar. Es un puente entre lo divino y lo humano, con la palabra como principal herramienta de transformación. Sociable pero reservada, pragmática pero elevada, logra sacar la mejor versión de cada uno y transmutar emociones negativas en positivas.",
    reto: "Si no canaliza su intensa energía ni la equilibra, puede acumular tensión nerviosa y estrés. Tiende a ser poco práctico o excesivamente soñador. Riesgo de caer en un ego espiritual desmesurado, desconectándose de la realidad y creyéndose por encima del bien y del mal. Puede manipular con la palabra y caer en la vanidad, la victimización, la celopatía y la dependencia. Debe aprender a manejar su vulnerabilidad emocional y evitar la impaciencia.",
    arquetipo: "El Maestro de la Palabra, el consejero, el guía espiritual, el visionario inspirador que integra grupos antagónicos y lidera con su don comunicativo.",
    energia: "Elevada, vanguardista, colaboradora; combina la fuerza individual del 1 con la sensibilidad y entrega del 2 para servir a un propósito superior.",
    aprendizaje: "Aprender a vivir en coherencia con su gran intuición, manteniéndose conectado con la realidad cotidiana. Canalizar su liderazgo y don de la palabra para servir a los demás sin caer en manipulación o vanidad. Equilibrar la vida espiritual con la práctica diaria.",
    talentos: "Poder de convicción, inspiración, liderazgo, dotes de mando, carisma social, mente abierta y conciliadora, capacidad para transmutar emociones con la palabra.",
    caminoDeVida: "Servir a la sociedad como puente espiritual, guiando y motivando a otros. Compartir su experiencia y sabiduría de forma práctica y elevada, promoviendo la colaboración y el bien común.",
    proposito: "Ser un faro de luz y un canal de mensajes espirituales que ayuden a la humanidad. Elevar la consciencia colectiva a través de la palabra y el ejemplo.",
    mental: "Mente visionaria, abierta, capaz de integrar y conciliar posturas opuestas. Riesgo de desconexión con la realidad si se deja llevar por su propio ‘cuento’ sin aterrizar las ideas.",
    emocionalRelaciones: "Sociable pero con límites claros. Puede mostrarse celoso o victimizarse en la pareja. Necesita aprender a manejar la sensibilidad y la vulnerabilidad para no depender afectivamente.",
    trabajo: "Maestro, psicólogo, terapeuta, guía espiritual, profesor, diplomático, mentor. Cualquier rol donde pueda aconsejar, inspirar y acompañar.",
    familia: "Suele traer armonía y visión elevada. Puede actuar como mediador y referente. Debe cuidar no imponerse con un supuesto ‘saber superior’ o invalidar la cotidianeidad de los demás.",
    territorio: "",
    energetico: "De gran intensidad; si no lo gestiona, deriva en estrés y tensión nerviosa. Cuando fluye, es capaz de mover grupos y elevar su vibración.",
    creativo: "Especial talento para la comunicación y la transmutación emocional. Maneja silencios y palabras con gran destreza para transformar realidades.",
    sexual: "Puede derivar en celos o dependencia si no hay un enfoque maduro de su intensa energía emocional. Requiere sinceridad y autenticidad para no caer en manipulaciones.",
    conclusion: "El 11 simboliza al maestro que guía desde la palabra y la intuición. Es la conexión viva entre lo divino y lo terrenal, capaz de inspirar y elevar, siempre que mantenga la humildad y la coherencia en su vida cotidiana."
  },

  // -------------------------------------------------------
  // Número 22
  // -------------------------------------------------------
  22: {
    centro: "El Maestro Constructor. Evolución elevada del 2 y del 4, combina la entrega y vocación de servicio con la capacidad práctica de materializar grandes proyectos para el beneficio colectivo. Se apoya en su fuerte intuición y su arraigado sentido práctico, gestionando recursos con maestría y naturalidad.",
    reto: "Puede obcecarse demasiado en la tarea y perder de vista si realmente aporta al bien común. Riesgo de avaricia y acumulación de bienes bajo la excusa de servir a los demás. La seguridad material y la desconfianza se convierten en su ‘criptonita’ espiritual. Puede caer en un complejo de inferioridad o en el síndrome del impostor. Debe vigilar la historia que se cuenta a sí mismo y aprender a no victimizarse cuando algo no sale como esperaba.",
    arquetipo: "El gran organizador y gestor, el referente nato. El estratega que revoluciona situaciones consideradas imposibles, el agente de cambio pragmático.",
    energia: "Fuerte, estable, visionaria y solidaria. Despierta confianza y armonía con su sola presencia. Capaz de arraigar lo espiritual a la tierra de manera práctica.",
    aprendizaje: "Equilibrar su enorme vocación de servicio y construcción con la capacidad de fluir sin forzar. Aprender a desapegarse de personas, creencias y bienes materiales. Mantenerse humilde y coherente en su rol de maestro, sin caer en el ego espiritual o en el autoengaño.",
    talentos: "Planificación y gestión a gran escala, asombrosa memoria y cálculo mental, liderazgo servicial, organización estratégica, capacidad de armonizar y equilibrar energía en su entorno.",
    caminoDeVida: "Materializar proyectos transformadores y estables que beneficien a la humanidad. Ser un referente de servicio útil y pragmático, con la mente abierta para encontrar soluciones eficaces ante cada reto.",
    proposito: "Construir un mundo mejor que el que encontró. Manifestar ideas y estructuras revolucionarias que mejoren la vida de todos, sin buscar protagonismo personal.",
    mental: "Flexible, adaptativa, busca siempre la solución más coherente. Gran claridad estratégica y memoria certera. Cuando flaquea, aparece la desconfianza y la autoexigencia extrema.",
    emocionalRelaciones: "Empático, cercano, escucha activa y genuina. Puede sentir miedo a no tener suficientes recursos, volviéndose inseguro o desconfiado. Requiere poner límites para no vaciar su propia energía.",
    trabajo: "Destaca en organización, administración, dirección de proyectos de gran envergadura. Aplica su entrega y pragmatismo a roles de gestión, construcción, diseño y liderazgo.",
    familia: "Se convierte en pilar de confianza, sostén y seguridad. Puede volcarse tanto en la ‘gran obra’ que olvide su propio cuidado y el de la familia, si no vigila su equilibrio.",
    territorio: "",
    energetico: "Manantial abundante de dar; su sola presencia puede armonizar y estabilizar espacios. Siempre dispuesto a generar recursos y soluciones.",
    creativo: "Integra la dimensión espiritual y el servicio en cada proyecto práctico. Su creatividad se basa en encontrar estrategias y estructuras nuevas allá donde parecen imposibles.",
    sexual: "Necesita confianza y equilibrio emocional para entregarse. Puede someterse a estrés si siente que la estabilidad material peligra, afectando su intimidad.",
    conclusion: "El 22 simboliza la habilidad de construir, de forma pragmática, aquello que eleve la vibración colectiva. Es el maestro que entrega su energía y recursos al servicio de una humanidad más armónica y evolucionada."
  },

  // -------------------------------------------------------
  // Número 33
  // -------------------------------------------------------
  33: {
    centro: "El Maestro del Sacrificio Universal. Evolución espiritual del 3 y el 6, representa la vibración amorosa más elevada, más allá del simple enamoramiento. Se consagra al amor incondicional y al servicio desinteresado, irradiando alegría y energía positiva allá donde va. Une lo material y lo espiritual a través del arte, la expresión y la creatividad.",
    reto: "Puede caer en dependencia emocional y adicciones, dramatizando y victimizándose ante conflictos propios. Se sacrifica incluso cuando la causa no lo merece. Alta sensibilidad que deriva en trastornos conductuales si no se cuida. Debe aprender desapego material y armonía emocional para evitar abusos de terceros. Riesgo de gran ego espiritual y de generar personajes de ‘gurú carismático’ alejados de la autenticidad.",
    arquetipo: "El maestro del amor incondicional, el gran sanador que anima y levanta al que sufre, el artista iluminado que transforma la densidad en luz.",
    energia: "Positiva, inagotable, compasiva. Capaz de cambiar el curso de situaciones difíciles con su sola presencia. Sensible y empática, propensa a captar o somatizar lo ajeno.",
    aprendizaje: "Descubrir el verdadero sentido del sacrificio bien entendido y no perderse en entregas que no suman. Alinear su alta vibración a proyectos y causas que generen un cambio genuino. Aprender a ser asertivo y a equilibrar la sensibilidad para no volverse dependiente o ser manipulado.",
    talentos: "Gran capacidad de amar y de inspirar a amar. Puede animar y motivar a cualquiera, transmutando la energía densa en liviana. Don para el arte, la expresión, la mediación y la sanación emocional.",
    caminoDeVida: "Servir y ayudar, pero sobre todo inspirar a otros a hacer lo mismo. Ser un faro de amor universal que transforme de forma real y trascendente. Expandir la solidaridad a nivel colectivo.",
    proposito: "Elevar la vibración del entorno por medio del amor incondicional y la entrega genuina. Unir lo material y lo espiritual a través de la expresión y la alegría.",
    mental: "Creativa, imaginativa, muy sensible a influencias externas. Si se bloquea, puede confundir fantasía con realidad y perder su propósito elevado.",
    emocionalRelaciones: "Muy empático y entregado al otro. Tiende a dramatizar si se siente rechazado o poco valorado. Puede ser manipulador emocional si se tuerce su energía. Necesita equilibrio para no ‘ahogarse’ en la intensidad.",
    trabajo: "Cualquier ámbito donde pueda transmitir su energía sanadora y creativa: artes, terapia, educación, motivación grupal. Su presencia impulsa positivamente a los demás.",
    familia: "Le gusta nutrir, alegrar y unir; sin embargo, puede absorber el dolor de su círculo y sufrirlo en carne propia. Ha de aprender límites claros para no agotar su energía.",
    territorio: "",
    energetico: "Enorme potencia amorosa y transformadora. Puede cambiar por completo la atmósfera de un lugar con su sola llegada. Cuando se desequilibra, se sumerge en el drama y la victimización.",
    creativo: "La creación artística y la expresión personal son vías principales para canalizar su alta vibración y su mensaje de amor universal.",
    sexual: "Intenso y emotivo, busca la fusión amorosa profunda. Riesgo de dependencia, celos o confusiones si su sensibilidad no está bien gestionada.",
    conclusion: "El 33 representa la mayor expresión de amor incondicional y servicio. Es el maestro que, con su alegría, compasión y creatividad, nos recuerda que el sacrificio genuino puede transformar el mundo."
  },

  // -------------------------------------------------------
  // Número 44
  // -------------------------------------------------------
  44: {
    centro: "El Maestro Manifestador. Evolución elevada del 4 y el 8. Conecta la prosperidad y la administración de recursos con una visión profunda y global para cambiar el mundo. Representa fuerza, carisma y autoridad consciente, un liderazgo que no desea imponerse, sino lograr que todo fluya para alcanzar objetivos transformadores.",
    reto: "Puede volverse demasiado ambicioso y materialista, manipulando el entorno a su favor. Buscan fama y prestigio, escalando posiciones a cualquier precio. La rigidez y el afán de control pueden limitar su potencial. Exceso de trabajo sin enfoque espiritual, que deriva en problemas físicos o pérdidas repentinas. Deben trabajar la avaricia y la desconfianza, evitando forzar las situaciones para su propio beneficio.",
    arquetipo: "El gran visionario y estratega, el líder carismático, el constructor de realidades que asume la responsabilidad del poder. El administrador con ‘toque mágico’ para hacer posibles proyectos imposibles.",
    energia: "Vigorosa, disciplinada, enfocada en manifestar grandes logros. Templo físico y mental: cuida el cuerpo con la misma dedicación que entrena la mente. Carisma que irradia poder y cercanía a la vez.",
    aprendizaje: "Encontrar el equilibrio entre el éxito material y la contribución espiritual. Aprender a delegar y a cooperar desde la humildad. Manejar la presión interna por alcanzar metas, sin perder de vista la dimensión humana y colectiva de sus actos.",
    talentos: "Visión global, mente estratégica, disciplina, fortaleza física y mental, capacidad de manifestar recursos y dirigir equipos, don para detectar oportunidades, carisma que motiva a los demás.",
    caminoDeVida: "Construir proyectos y organizaciones con impacto global, dejando un mundo mejor que aquel en el que nació. Liderar con justicia y equidad, pero sin apegarse al poder una vez cumplida la misión.",
    proposito: "Servir a la humanidad a gran escala, manifestando oportunidades y recursos allí donde parecían imposibles. Equilibrar autoridad y humildad para que el poder sea una herramienta de transformación positiva.",
    mental: "Estratégica, calculadora y visionaria. Puede derivar en rigidez y excesivo control si no se nutre de valores espirituales y solidaridad real.",
    emocionalRelaciones: "Conecta profundamente y genera un halo de poder cercano. Riesgo de primar el interés propio y de desconfiar de quienes no siguen su ritmo. Cuando fluye, protege y cuida con gran intensidad.",
    trabajo: "Sobresale en altos cargos, liderando empresas, instituciones o proyectos que exijan fortaleza, visión y eficiencia. Delegar con maestría y asumir responsabilidades son su fuerte.",
    familia: "Cumple un rol de protector y gestor de la estabilidad familiar. Debe vigilar no imponerse con autoritarismo ni dejar que su trabajo lo absorba completamente.",
    territorio: "",
    energetico: "Impresionante: puede manifestar recursos y oportunidades ‘de la nada’. Cuando se desorienta, pierde la conexión con su propósito profundo y se vuelve un mero acumulador de bienes.",
    creativo: "Aplica la creatividad estratégica para la innovación en negocios y proyectos de gran magnitud. Con su determinación, impulsa ideas que otros descartarían.",
    sexual: "Vigoroso, pasional, a veces controlador. Necesita confianza y estabilidad para disfrutar plenamente. El estrés y la ambición excesiva pueden mermar su capacidad de entrega real.",
    conclusion: "El 44 encarna la capacidad de transformar la realidad a gran escala con un liderazgo sólido y carismático. Su misión es usar su poder, disciplina y visión para levantar proyectos que beneficien al conjunto, sin sucumbir a la seducción del ego y el mero éxito material."
  },  
};  


/************************************************************
 * FUNCIONES DE CÁLCULO Y MAPEO
 * Aquí se exportan las funciones y objetos que uses en la app.
 ************************************************************/

/**
 * Suma las cifras de un número hasta que sea <= 9.
 */
export function reduceNumber(num) {
  // Si es undefined, null o NaN, devolver 0
  if (num === undefined || num === null || isNaN(num)) return 0;
  
  // Convertir a número
  const numValue = Number(num);
  
  // Si ya es un dígito, devolverlo
  if (numValue >= 0 && numValue <= 9) return numValue;
  
  // Calcular la suma de los dígitos
  const sum = String(numValue)
    .split('')
    .reduce((acc, digit) => acc + parseInt(digit), 0);
  
  // Recursión hasta obtener un dígito
  return sum > 9 ? reduceNumber(sum) : sum;
}

/**
 * Reduce un número a un dígito (1-9) pero preserva números maestros.
 * Ejemplo: 25 -> 2+5 = 7, pero 11, 22, 33, 44 se mantienen.
 */
export function reduceNumberPreserveMaster(num) {
  // Si es undefined, null o NaN, devolver 0
  if (num === undefined || num === null || isNaN(num)) return 0;
  
  // Convertir a número
  const numValue = Number(num);
  
  // Si ya es un dígito, devolverlo
  if (numValue >= 0 && numValue <= 9) return numValue;
  
  // Preservar números maestros
  if (numValue === 11 || numValue === 22 || numValue === 33 || numValue === 44) {
    return numValue;
  }
  
  // Calcular la suma de los dígitos
  const sum = String(numValue)
    .split('')
    .reduce((acc, digit) => acc + parseInt(digit), 0);
  
  // Verificar si el resultado es un número maestro
  if (sum === 11 || sum === 22 || sum === 33 || sum === 44) {
    return sum;
  }
  
  // Recursión hasta obtener un dígito o número maestro
  return sum > 9 ? reduceNumberPreserveMaster(sum) : sum;
}

/**
 * Devuelve la diferencia absoluta de a y b, salvo
 * que si b = 0 -> se devuelve a, y si a = b -> 0.
 */
export function subtractWithRules(a, b) {
  if (b === 0) return a;
  if (a === b) return 0;
  return Math.abs(a - b);
}

/**
 * Mapeo numérico usado en la Tabla Ideal.
 * Ajusta estas claves si tu app las renombra.
 */
export const idealNumberMapping = {
  masculineNumber: 1,
  feminineNumber: 2,
  challengeNumber: 3,
  workFamilyNumber: 4,
  energeticNumber: 5,
  emotionalNumber: 6,
  mentalNumber: 7,
  talentNumber: 8,
  personalityNumber: 9
};

/**
 * Calcula exceso y falta entre un número "ideal" y
 * el "real" que obtuvimos con reduceNumber.
 */
export function calculateExcessAndMissing(ideal, real) {
  if (ideal === real) {
    return { excess: 0, missing: 0 };
  }
  if (real > ideal) {
    const excess = real - ideal;
    const missing = 9 - excess;
    return { excess, missing };
  } else {
    const missing = ideal - real;
    const excess = 9 - missing;
    return { excess, missing };
  }
}

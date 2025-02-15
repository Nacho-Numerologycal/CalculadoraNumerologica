import React, { useState } from 'react';
import { Calculator, X } from 'lucide-react';

const numerologyInfo: Record<number, {
  centro: string;
  reto: string;
  arquetipo: string;
  energia: string;
  aprendizaje: string;
  edad?: string;
  talentos?: string;
  caminoDeVida?: string;
  proposito?: string;
  mental?: string;
  emocionalRelaciones?: string;
  trabajo?: string;
  familia?: string;
  territorio?: string;
  energetico?: string;
  creativo?: string;
  sexual?: string;
  conclusion?: string;
}> = {
  0: {
    centro: "Todas las posibilidades, la conexión directa con la energía de la posición en la que se encuentra, Potencial ilimitado, Inicio de ciclo de vida, Eternidad, Manifestación del universo creador, Punto de partida, Voluntad, Inconsciente colectivo, Conexión con todo. Todas las oportunidades, la vida viviéndose a sí misma a través de mi experiencia.",
    reto: "El vacío, la nada, la falta, necesidad, abandono, abuso, desmerecimiento, sin valor propio, sin identidad, sin sentido, sin propósito, Lo que se esconde, lo que no se quiere ver, lo que no reconozco en mí, espejos del yo. Inabarcable.",
    arquetipo: "La misma esencia del arquetipo. O su voluntad.",
    energia: "Todas las energías, ninguna energía. Una paradoja que nos insta a reconocer que en la totalidad reside la potencialidad de cada energía individual.",
    aprendizaje: "Aprender a manifestar quien es, a encontrar en su interior otras posibilidades, a adaptarse a lo que pasa, a materializarse o a desaparecer, a conectarse con la fuente, a vivirse desde el arquetipo mismo, a no ser abusado por no saber quien es ni lo que quiere, a aceptar el vacío y el abismo inconmensurable.",
    conclusion: "Al situarnos en el 0, nos encontramos en el punto donde todo puede surgir y todo puede desaparecer. Esta energía nos invita a reconocer nuestra presencia en el gran lienzo de la existencia, recordándonos que el vacío no es ausencia de creación, sino el preludio de infinitas posibilidades."
  },
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
    territorio: "Valora la propiedad y el mantenimiento de espacios físicos que representen seguridad y estabilidad.",
    energetico: "Energía constante y sostenida, enfocada en la realización de tareas y proyectos a largo plazo.",
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
    sexual: "Enfoque reservado y profundo, buscando conexiones que trasciendan lo físico y se alineen con una unión espiritual y emocional.",
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
  }
};

function reduceNumber(num: number): number {
  if (num <= 9) return num;
  return reduceNumber(
    String(num)
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit), 0)
  );
}

function subtractWithRules(a: number, b: number): number {
  if (b === 0) return a;
  if (a === b) return 0;
  return Math.abs(a - b);
}

const Modal = ({ number, onClose }: { number: number; onClose: () => void }) => {
  const info = numerologyInfo[number];
  if (!info) return null;

  const Section = ({ title, content }: { title: string; content?: string }) => {
    if (!content) return null;
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-indigo-600 mb-2">{title}</h3>
        <p className="text-gray-700 leading-relaxed">{content}</p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Número {number}</h2>
        
        <div className="space-y-8">
          <Section title="Centro" content={info.centro} />
          <Section title="Reto" content={info.reto} />
          <Section title="Arquetipo" content={info.arquetipo} />
          <Section title="Energía" content={info.energia} />
          <Section title="Aprendizaje" content={info.aprendizaje} />
          {info.edad && <Section title="Edad" content={info.edad} />}
          {info.talentos && <Section title="Talentos" content={info.talentos} />}
          {info.caminoDeVida && <Section title="Camino de Vida" content={info.caminoDeVida} />}
          {info.proposito && <Section title="Propósito" content={info.proposito} />}
          {info.mental && <Section title="Mental" content={info.mental} />}
          {info.emocionalRelaciones && <Section title="Emocional y Relaciones" content={info.emocionalRelaciones} />}
          
          {(info.trabajo || info.familia || info.territorio) && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-indigo-600 mb-4">Trabajo, Familia y Territorio</h3>
              {info.trabajo && <Section title="Trabajo" content={info.trabajo} />}
              {info.familia && <Section title="Familia" content={info.familia} />}
              {info.territorio && <Section title="Territorio" content={info.territorio} />}
            </div>
          )}
          
          {(info.energetico || info.creativo || info.sexual) && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-indigo-600 mb-4">Energético, Creativo y Sexual</h3>
              {info.energetico && <Section title="Energético" content={info.energetico} />}
              {info.creativo && <Section title="Creativo" content={info.creativo} />}
              {info.sexual && <Section title="Sexual" content={info.sexual} />}
            </div>
          )}
          
          {info.conclusion && (
            <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
              <p className="text-gray-700 italic leading-relaxed">{info.conclusion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [birthDate, setBirthDate] = useState('');
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [results, setResults] = useState<Record<string, number | null>>({
    personal: null,
    feminine: null,
    masculine: null,
    mental: null,
    emotional: null,
    talent: null,
    work: null,
    energetic: null,
    challenge: null,
    lifePath: null,
    purpose: null,
  });

  const calculateNumerology = (date: string) => {
    const [year, month, day] = date.split('-').map(Number);
    
    const personal = reduceNumber(day);
    const feminine = reduceNumber(month);
    const masculine = reduceNumber(year);
    const mental = reduceNumber(personal + masculine);
    const emotional = reduceNumber(personal + feminine);
    const talent = reduceNumber(mental + emotional);
    const work = subtractWithRules(personal, feminine);
    const energetic = subtractWithRules(personal, masculine);
    const challenge = subtractWithRules(work, energetic);
    const lifePath = reduceNumber(day + month + year);
    const purpose = reduceNumber(personal + lifePath);

    setResults({
      personal,
      feminine,
      masculine,
      mental,
      emotional,
      talent,
      work,
      energetic,
      challenge,
      lifePath,
      purpose,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
    if (e.target.value) {
      calculateNumerology(e.target.value);
    }
  };

  const NumberBox = ({ 
    number, 
    label, 
    shape = 'circle',
    color = 'indigo',
    className = '' 
  }: { 
    number: number | null, 
    label: string, 
    shape?: 'circle' | 'diamond' | 'triangle',
    color?: string,
    className?: string 
  }) => {
    const shapeClasses = {
      circle: 'rounded-full',
      diamond: 'rotate-45 transform',
      triangle: 'clip-path-triangle'
    };

    const colorClasses = {
      indigo: 'border-blue-300 bg-blue-50 hover:bg-blue-100',
      purple: 'border-purple-300 bg-purple-50 hover:bg-purple-100',
      blue: 'border-sky-300 bg-sky-50 hover:bg-sky-100',
      green: 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100',
      red: 'border-red-300 bg-red-50 hover:bg-red-100',
      orange: 'border-orange-300 bg-orange-50 hover:bg-orange-100',
      pink: 'border-pink-300 bg-pink-50 hover:bg-pink-100',
      teal: 'border-teal-300 bg-teal-50 hover:bg-teal-100',
    };

    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div 
          className={`w-16 h-16 flex items-center justify-center border-2 ${colorClasses[color]} ${shapeClasses[shape]} cursor-pointer transition-colors duration-200`}
          onClick={() => number !== null && setSelectedNumber(number)}
        >
          <span className={`text-2xl font-bold ${shape === 'diamond' ? '-rotate-45' : ''}`}>
            {number ?? '-'}
          </span>
        </div>
        <div className="text-xs font-medium text-gray-600 mt-2 text-center">
          {label}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Calculadora de Numerología</h1>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={handleDateChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            />
          </div>
        </div>

        {birthDate && (
          <div className="flex flex-col items-center gap-20">
            {/* Top Level */}
            <div className="flex justify-between w-full max-w-2xl">
              <NumberBox 
                number={results.purpose} 
                label="Nº DE PROPÓSITO" 
                shape="triangle"
                color="red"
              />
              <NumberBox 
                number={results.talent} 
                label="Nº TALENTO" 
                color="green"
              />
              <NumberBox 
                number={results.lifePath} 
                label="Nº CAMINO DE VIDA" 
                shape="diamond"
                color="orange"
              />
            </div>
            
            {/* Mental & Emotional Level */}
            <div className="flex justify-center gap-32">
              <NumberBox 
                number={results.emotional} 
                label="Nº EMOCIONAL" 
                color="purple"
              />
              <NumberBox 
                number={results.mental} 
                label="Nº MENTAL" 
                color="blue"
              />
            </div>
            
            {/* Base Numbers */}
            <div className="flex justify-between w-full max-w-2xl">
              <NumberBox 
                number={results.feminine} 
                label="Nº ENERGÍA FEMENINA" 
                color="indigo"
              />
              <NumberBox 
                number={results.personal} 
                label="Nº PERSONAL" 
                color="indigo"
              />
              <NumberBox 
                number={results.masculine} 
                label="Nº ENERGÍA MASCULINA" 
                color="indigo"
              />
            </div>
            
            {/* Work & Energetic */}
            <div className="flex justify-center gap-32">
              <NumberBox 
                number={results.work} 
                label="Nº TRABAJO" 
                color="teal"
              />
              <NumberBox 
                number={results.energetic} 
                label="Nº ENERGÉTICO" 
                color="pink"
              />
            </div>
            
            {/* Challenge */}
            <div>
              <NumberBox 
                number={results.challenge} 
                label="Nº RETO" 
                color="purple"
              />
            </div>
          </div>
        )}

        {selectedNumber !== null && (
          <Modal 
            number={selectedNumber} 
            onClose={() => setSelectedNumber(null)} 
          />
        )}
      </div>
    </div>
  );
}

export default App;

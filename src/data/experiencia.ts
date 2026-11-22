/*
  Datos de "La experiencia" (escena I) y "IA aplicada" (escena II).

  CONFIDENCIALIDAD: este repositorio y el sitio son publicos. De la practica solo se publica
  el tipo de trabajo y tecnologias genericas. No anadir nombres de sistemas internos,
  servidores, rutas, personas, tickets ni cifras de operacion.
*/

import type { Idioma } from '../i18n/ui';

type Bilingue = Record<Idioma, string>;

export interface Bloque {
  /** Id del icono del sprite (sin el #). */
  icono: string;
  titulo: Bilingue;
  texto: Bilingue;
  /** Evidencia publica que respalda el bloque (opcional). */
  evidencia?: { nombre: string; url: string };
}

export const EMPRESA = 'Makro Supermayorista';

export const HERRAMIENTAS_PRACTICA: readonly string[] = [
  'Python',
  'SQL Server',
  'Oracle',
  'SQLite',
  'APScheduler',
  'Node.js',
  'Excel',
];

export const APORTES_PRACTICA: readonly Bloque[] = [
  {
    icono: 'ic-flow',
    titulo: { es: 'Orquestación', en: 'Orchestration' },
    texto: {
      es: 'Servicio en Python con programación horaria, cola, reintentos y procesos aislados.',
      en: 'Python service with scheduling, queueing, retries and isolated processes.',
    },
  },
  {
    icono: 'ic-database',
    titulo: { es: 'Datos', en: 'Data' },
    texto: {
      es: 'Cruces entre SQL Server y Oracle en solo lectura, con informes en Excel.',
      en: 'Read-only reconciliation across SQL Server and Oracle, reported in Excel.',
    },
  },
  {
    icono: 'ic-chart',
    titulo: { es: 'Trazabilidad', en: 'Traceability' },
    texto: {
      es: 'Registro de cada ejecución para que ningún fallo pase en silencio.',
      en: 'Every run is logged, so no failure goes unnoticed.',
    },
  },
  {
    icono: 'ic-doc',
    titulo: { es: 'Ingeniería', en: 'Engineering' },
    texto: {
      es: 'Levantamiento con usuarios, requisitos y decisiones de arquitectura documentadas.',
      en: 'User discovery, requirements and documented architecture decisions.',
    },
  },
];

export const PRACTICAS_IA: readonly Bloque[] = [
  {
    icono: 'ic-plug',
    titulo: { es: 'Servidores MCP', en: 'MCP servers' },
    texto: {
      es: 'Construyo servidores que dan datos y herramientas a los modelos. El de Ethos usa OAuth 2.1 y aísla los datos por usuario.',
      en: 'I build servers that give models data and tools. The one in Ethos uses OAuth 2.1 and isolates data per user.',
    },
    evidencia: { nombre: 'Ethos', url: 'https://github.com/KawKuroi/Ethos' },
  },
  {
    icono: 'ic-agents',
    titulo: { es: 'Agentes', en: 'Agents' },
    texto: {
      es: 'Diseñé un CLI de ocho agentes especializados que se coordinan con documentación compartida, sin guardar el chat.',
      en: 'I designed a CLI of eight specialised agents that coordinate through shared documentation, with no chat state.',
    },
    evidencia: { nombre: 'Efesto', url: 'https://github.com/KawKuroi/Efesto' },
  },
  {
    icono: 'ic-layers',
    titulo: { es: 'Skills y subagentes', en: 'Skills & subagents' },
    texto: {
      es: 'Empaqueto flujos repetibles: desarrollo por fases, commits, documentación y escaneo de secretos, con permisos acotados.',
      en: 'I package repeatable workflows: phased development, commits, docs and secret scanning, with scoped permissions.',
    },
  },
  {
    icono: 'ic-search',
    titulo: { es: 'Ingeniería de contexto', en: 'Context engineering' },
    texto: {
      es: 'Entrego al modelo solo lo necesario y lo mido: en Ethos cada consulta reporta cuántos KB viajan del total.',
      en: 'I give the model only what it needs and measure it: in Ethos each query reports how many KB travel out of the total.',
    },
  },
];

export const HERRAMIENTAS_IA: readonly string[] = [
  'Claude Code',
  'MCP',
  'FastMCP',
  'Gemini',
  'Vercel AI SDK',
];

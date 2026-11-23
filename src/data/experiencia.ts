/*
  Datos de "La experiencia" (escena I) e "IA aplicada" (escena II).

  CONFIDENCIALIDAD: el repositorio y el sitio son publicos. De la practica se publica el tipo de
  trabajo y tecnologias genericas. No anadir nombres de sistemas internos, servidores, rutas,
  personas, tickets ni cifras de operacion.
*/

import type { Idioma } from '../i18n/ui';

type Bilingue = Record<Idioma, string>;

export interface Bloque {
  /** Id del icono del sprite (sin el #). */
  icono: string;
  titulo: Bilingue;
  texto: Bilingue;
  /** Repositorio publico que respalda el bloque (opcional). */
  github?: { nombre: string; url: string };
}

export const EMPRESA = 'Makro Supermayorista';

export const HERRAMIENTAS_PRACTICA: Record<Idioma, readonly string[]> = {
  es: ['Copilot Studio', 'Power Automate', 'SharePoint', 'Microsoft Teams', 'ServiceNow', 'Claude Code', 'Python', 'PowerShell', 'SQL Server', 'Oracle', 'Eventos de Windows', 'Servidores locales'],
  en: ['Copilot Studio', 'Power Automate', 'SharePoint', 'Microsoft Teams', 'ServiceNow', 'Claude Code', 'Python', 'PowerShell', 'SQL Server', 'Oracle', 'Windows events', 'Local servers'],
};

/** Lo que hace el Centro de Automatizaciones. */
export const APORTES_PRACTICA: readonly Bloque[] = [
  {
    icono: 'ic-chart',
    titulo: { es: 'Reportes automáticos', en: 'Automated reports' },
    texto: {
      es: 'Genera y entrega reportes programados por correo y mensajería.',
      en: 'Builds and delivers scheduled reports by email and messaging.',
    },
  },
  {
    icono: 'ic-ticket',
    titulo: { es: 'Casos automáticos', en: 'Automatic tickets' },
    texto: {
      es: 'Crea casos en la plataforma de gestión de tickets.',
      en: 'Creates cases in the ticketing platform.',
    },
  },
  {
    icono: 'ic-share',
    titulo: { es: 'SharePoint', en: 'SharePoint' },
    texto: {
      es: 'Trabaja con sitios y listas de SharePoint.',
      en: 'Works with SharePoint sites and lists.',
    },
  },
  {
    icono: 'ic-database',
    titulo: { es: 'Bases de datos', en: 'Databases' },
    texto: {
      es: 'Consulta SQL Server y Oracle y se conecta con otros sistemas.',
      en: 'Queries SQL Server and Oracle and connects to other systems.',
    },
  },
  {
    icono: 'ic-users',
    titulo: { es: 'Roles', en: 'Roles' },
    texto: {
      es: 'Acceso por roles desde su propia interfaz web.',
      en: 'Role based access from its own web interface.',
    },
  },
  {
    icono: 'ic-flow',
    titulo: { es: 'Orquestación', en: 'Orchestration' },
    texto: {
      es: 'Programación, reintentos y registro de cada ejecución.',
      en: 'Scheduling, retries and a log of every run.',
    },
  },
];

/** Proyectos con IA dentro de la practica (descritos sin detalles internos). */
export const IA_PRACTICA: readonly Bloque[] = [
  {
    icono: 'ic-chat',
    titulo: { es: 'Bot de Teams', en: 'Teams bot' },
    texto: {
      es: 'Bot en Copilot Studio que recibe solicitudes de varias áreas y las encola con Power Automate y SharePoint.',
      en: 'Copilot Studio bot that takes requests from several teams and queues them with Power Automate and SharePoint.',
    },
  },
  {
    icono: 'ic-user-off',
    titulo: { es: 'Usuarios con computer use', en: 'Users with computer use' },
    texto: {
      es: 'Agentes que operan una plataforma de BI como una persona para desactivar y habilitar usuarios.',
      en: 'Agents that operate a BI platform like a person to deactivate and enable users.',
    },
  },
  {
    icono: 'ic-spark',
    titulo: { es: 'Agente de soporte', en: 'Support agent' },
    texto: {
      es: 'Agente de Copilot que guía al equipo paso a paso ante cada alerta, con skills compartidas con Claude Code.',
      en: 'Copilot agent that guides the team step by step on each alert, with skills shared with Claude Code.',
    },
  },
  {
    icono: 'ic-doc',
    titulo: { es: 'Manuales con IA', en: 'AI manuals' },
    texto: {
      es: 'Skills que generan manuales y documentos de Word con el formato de la empresa.',
      en: 'Skills that produce manuals and Word documents in the company format.',
    },
  },
];

export const PRACTICAS_IA: readonly Bloque[] = [
  {
    icono: 'ic-agents',
    titulo: { es: 'Agentes', en: 'Agents' },
    texto: {
      es: 'Diseño agentes y equipos de agentes que planifican, programan y verifican su propio trabajo.',
      en: 'I design agents and agent teams that plan, code and check their own work.',
    },
    github: { nombre: 'Efesto', url: 'https://github.com/KawKuroi/Efesto' },
  },
  {
    icono: 'ic-plug',
    titulo: { es: 'Servidores MCP', en: 'MCP servers' },
    texto: {
      es: 'Creo servidores MCP que conectan modelos con datos y herramientas reales, protegidos con OAuth 2.1.',
      en: 'I build MCP servers that connect models to real data and tools, secured with OAuth 2.1.',
    },
    github: { nombre: 'Ethos', url: 'https://github.com/KawKuroi/Ethos' },
  },
  {
    icono: 'ic-chat',
    titulo: { es: 'IA en la empresa', en: 'AI at work' },
    texto: {
      es: 'Llevo la IA al día a día: bots en Teams, agentes con computer use y flujos con Copilot Studio y Power Automate.',
      en: 'I bring AI into daily work: Teams bots, computer use agents and flows with Copilot Studio and Power Automate.',
    },
  },
  {
    icono: 'ic-layers',
    titulo: { es: 'Skills y contexto', en: 'Skills and context' },
    texto: {
      es: 'Escribo skills que funcionan igual en Claude Code y en Copilot, y kits de agentes para equipos completos.',
      en: 'I write skills that work the same in Claude Code and Copilot, and agent kits for whole teams.',
    },
  },
];

export const HERRAMIENTAS_IA: readonly string[] = [
  'Claude Code',
  'Codex',
  'Copilot Studio',
  'Power Automate',
  'MCP',
  'Playwright',
  'Gemini',
];

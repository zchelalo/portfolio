import type { ImageMetadata } from 'astro'
import ncAgenda from '@/assets/projects/neuraclinic/agenda.png'
import ncAgendaMobile from '@/assets/projects/neuraclinic/agenda-mobile.png'
import ncAssessment from '@/assets/projects/neuraclinic/assessment.png'
import ncInstruments from '@/assets/projects/neuraclinic/instruments.png'
import ncLanding from '@/assets/projects/neuraclinic/landing.png'
import ncLandingFlow from '@/assets/projects/neuraclinic/landing-flow.png'
import ncNote from '@/assets/projects/neuraclinic/note.png'
import ncNoteMobile from '@/assets/projects/neuraclinic/note-mobile.png'
import ncPatients from '@/assets/projects/neuraclinic/patients.png'
import ncPatientsMobile from '@/assets/projects/neuraclinic/patients-mobile.png'
import ncRecord from '@/assets/projects/neuraclinic/record.png'
import ncRecordMobile from '@/assets/projects/neuraclinic/record-mobile.png'
import clArticle from '@/assets/projects/comledge/article.png'
import clArticleContent from '@/assets/projects/comledge/article-content.png'
import clArticleContentMobile from '@/assets/projects/comledge/article-content-mobile.png'
import clArticleTypes from '@/assets/projects/comledge/article-types.png'
import clArticles from '@/assets/projects/comledge/articles.png'
import clArticlesMobile from '@/assets/projects/comledge/articles-mobile.png'
import clHome from '@/assets/projects/comledge/home.png'
import clHomeMobile from '@/assets/projects/comledge/home-mobile.png'
import clRoles from '@/assets/projects/comledge/roles.png'
import clSections from '@/assets/projects/comledge/sections.png'
import clSectionsMobile from '@/assets/projects/comledge/sections-mobile.png'
import clUsers from '@/assets/projects/comledge/users.png'
import ceDashboard from '@/assets/projects/cestia/dashboard.png'
import ceExpenses from '@/assets/projects/cestia/expenses.png'
import ceExpensesMobile from '@/assets/projects/cestia/expenses-mobile.png'
import ceGroup from '@/assets/projects/cestia/group.png'
import ceGroupMobile from '@/assets/projects/cestia/group-mobile.png'
import ceHistory from '@/assets/projects/cestia/history.png'
import ceHistoryMobile from '@/assets/projects/cestia/history-mobile.png'
import ceInvitations from '@/assets/projects/cestia/invitations.png'
import ceList from '@/assets/projects/cestia/list.png'
import ceListMobile from '@/assets/projects/cestia/list-mobile.png'
import ceMembers from '@/assets/projects/cestia/members.png'
import cePurchaseDialog from '@/assets/projects/cestia/purchase-dialog.png'
import type { Localized } from './types'

export type GalleryItem = {
  image: ImageMetadata
  alt: Localized
  caption: Localized
  mobile?: boolean
}

export type GalleryGroup = {
  title: Localized
  items: GalleryItem[]
  layout?: 'grid' | 'mobile'
}

export const heroImages: Record<string, ImageMetadata> = {
  neuraclinic: ncLanding,
  comledge: clHome,
  cestia: ceList,
}

export const heroAlts: Record<string, Localized> = {
  neuraclinic: {
    es: 'Landing pública de NeuraClinic',
    en: 'NeuraClinic public landing',
  },
}

export const galleries: Record<string, GalleryGroup[]> = {
  neuraclinic: [
    {
      title: { es: 'La landing', en: 'The landing' },
      items: [
        {
          image: ncLanding,
          alt: {
            es: 'Landing pública de NeuraClinic en español',
            en: 'NeuraClinic public landing in Spanish',
          },
          caption: {
            es: 'La landing presenta el producto y el recorrido clínico.',
            en: 'The landing presents the product and the clinical flow.',
          },
        },
        {
          image: ncLandingFlow,
          alt: {
            es: 'Sección de recorrido clínico de la landing de NeuraClinic',
            en: 'Clinical flow section of the NeuraClinic landing',
          },
          caption: {
            es: 'El recorrido explica cómo se conectan agenda, expediente y seguimiento.',
            en: 'The flow explains how scheduling, records and follow-up connect.',
          },
        },
      ],
    },
    {
      title: { es: 'Expediente y notas', en: 'Records and notes' },
      items: [
        {
          image: ncRecord,
          alt: {
            es: 'Expediente de una paciente ficticia en NeuraClinic',
            en: 'A fictional patient record in NeuraClinic',
          },
          caption: {
            es: 'Expediente con datos de identificación, contacto y pestañas clínicas.',
            en: 'Record with identification, contact and clinical tabs.',
          },
        },
        {
          image: ncNote,
          alt: {
            es: 'Nota de sesión abierta en NeuraClinic con contenido de demostración',
            en: 'An open session note in NeuraClinic with demonstration content',
          },
          caption: {
            es: 'Nota de sesión con estructura de motivo, observaciones y seguimiento.',
            en: 'Session note structured around reason, observations and follow-up.',
          },
        },
      ],
    },
    {
      title: { es: 'Agenda y pacientes', en: 'Schedule and patients' },
      items: [
        {
          image: ncAgenda,
          alt: {
            es: 'Agenda mensual de NeuraClinic con citas de demostración',
            en: 'NeuraClinic monthly schedule with demonstration appointments',
          },
          caption: {
            es: 'Agenda mensual con citas y estados, generada con datos ficticios.',
            en: 'Monthly schedule with appointments and statuses, generated with fictional data.',
          },
        },
        {
          image: ncPatients,
          alt: {
            es: 'Listado de pacientes de NeuraClinic con búsqueda y exportación',
            en: 'NeuraClinic patient list with search and export controls',
          },
          caption: {
            es: 'Listado de pacientes con búsqueda, filtros y exportación.',
            en: 'Patient list with search, filters and export.',
          },
        },
      ],
    },
    {
      title: { es: 'Evaluaciones e instrumentos', en: 'Assessments and instruments' },
      items: [
        {
          image: ncAssessment,
          alt: {
            es: 'Evaluación psicológica de demostración en NeuraClinic',
            en: 'A demonstration psychological assessment in NeuraClinic',
          },
          caption: {
            es: 'Evaluación con instrumento, respuestas y resultado de demostración.',
            en: 'Assessment with instrument, answers and a demonstration result.',
          },
        },
        {
          image: ncInstruments,
          alt: {
            es: 'Instrumentos de evaluación en NeuraClinic',
            en: 'Assessment instruments in NeuraClinic',
          },
          caption: {
            es: 'Instrumentos reutilizables para construir y aplicar evaluaciones.',
            en: 'Reusable instruments for building and applying assessments.',
          },
        },
      ],
    },
    {
      title: { es: 'En móvil', en: 'On mobile' },
      layout: 'mobile',
      items: [
        {
          image: ncAgendaMobile,
          alt: {
            es: 'Vista móvil de la agenda de NeuraClinic',
            en: 'NeuraClinic schedule on mobile',
          },
          caption: {
            es: 'La agenda conserva su estructura en pantallas pequeñas.',
            en: 'The schedule keeps its structure on small screens.',
          },
          mobile: true,
        },
        {
          image: ncPatientsMobile,
          alt: {
            es: 'Listado de pacientes de NeuraClinic en móvil',
            en: 'NeuraClinic patient list on mobile',
          },
          caption: {
            es: 'Pacientes y búsqueda en una pantalla pequeña.',
            en: 'Patients and search on a small screen.',
          },
          mobile: true,
        },
        {
          image: ncRecordMobile,
          alt: {
            es: 'Expediente de una paciente ficticia en móvil',
            en: 'A fictional patient record on mobile',
          },
          caption: {
            es: 'El expediente conserva sus secciones en móvil.',
            en: 'The record keeps its sections on mobile.',
          },
          mobile: true,
        },
        {
          image: ncNoteMobile,
          alt: {
            es: 'Nota de sesión abierta en móvil',
            en: 'An open session note on mobile',
          },
          caption: {
            es: 'La nota mantiene título, contenido y exportación.',
            en: 'The note keeps its title, content and export.',
          },
          mobile: true,
        },
      ],
    },
  ],
  comledge: [
    {
      title: { es: 'Artículo de ejemplo', en: 'Example article' },
      items: [
        {
          image: clArticle,
          alt: {
            es: 'Artículo «Guía de incorporación al equipo» abierto en el editor',
            en: '“Team onboarding guide” article open in the editor',
          },
          caption: {
            es: 'Artículo publicado con título, estado y contenido editable.',
            en: 'A published article with its title, status and editable content.',
          },
        },
        {
          image: clArticleContent,
          alt: {
            es: 'Contenido del artículo de ejemplo con lista y tabla',
            en: 'Example article content with a list and a table',
          },
          caption: {
            es: 'El artículo combina pasos, una tabla y recursos enlazados.',
            en: 'The article combines steps, a table and linked resources.',
          },
        },
      ],
    },
    {
      title: { es: 'Biblioteca y administración', en: 'Library and administration' },
      items: [
        {
          image: clHome,
          alt: {
            es: 'Inicio del espacio de conocimiento con artículos recientes',
            en: 'Knowledge workspace home with recent articles',
          },
          caption: {
            es: 'Inicio con artículos recientes y el trabajo bajo tu responsabilidad.',
            en: 'Home with recent articles and the work you own.',
          },
        },
        {
          image: clArticles,
          alt: {
            es: 'Listado de artículos con búsqueda y filtros',
            en: 'Article list with search and filters',
          },
          caption: {
            es: 'Búsqueda por título, tipo, nivel y sección.',
            en: 'Search by title, type, level and section.',
          },
        },
        {
          image: clSections,
          alt: {
            es: 'Administración de secciones de Comledge',
            en: 'Comledge section administration',
          },
          caption: {
            es: 'Secciones para ordenar la navegación del conocimiento.',
            en: 'Sections that organize knowledge navigation.',
          },
        },
        {
          image: clUsers,
          alt: {
            es: 'Administración de usuarios de Comledge con búsqueda y paginación',
            en: 'Comledge user administration with search and pagination',
          },
          caption: {
            es: 'Usuarios activos, búsqueda y paginación por cursor.',
            en: 'Active users, search and cursor pagination.',
          },
        },
      ],
    },
    {
      title: { es: 'Acceso y configuración', en: 'Access and configuration' },
      items: [
        {
          image: clRoles,
          alt: {
            es: 'Roles y permisos en Comledge',
            en: 'Roles and permissions in Comledge',
          },
          caption: {
            es: 'Roles que agrupan capacidades y permisos.',
            en: 'Roles that group capabilities and permissions.',
          },
        },
        {
          image: clArticleTypes,
          alt: {
            es: 'Tipos de artículo en Comledge',
            en: 'Article types in Comledge',
          },
          caption: {
            es: 'Tipos de artículo y su comportamiento editorial.',
            en: 'Article types and their editorial behavior.',
          },
        },
      ],
    },
    {
      title: { es: 'En móvil', en: 'On mobile' },
      layout: 'mobile',
      items: [
        {
          image: clHomeMobile,
          alt: {
            es: 'Inicio de Comledge en móvil',
            en: 'Comledge home on mobile',
          },
          caption: {
            es: 'Inicio y artículos recientes en una pantalla pequeña.',
            en: 'Home and recent articles on a small screen.',
          },
          mobile: true,
        },
        {
          image: clArticlesMobile,
          alt: {
            es: 'Listado de artículos de Comledge en móvil',
            en: 'Comledge article list on mobile',
          },
          caption: {
            es: 'La biblioteca conserva búsqueda y jerarquía en móvil.',
            en: 'The library keeps search and hierarchy on mobile.',
          },
          mobile: true,
        },
        {
          image: clArticleContentMobile,
          alt: {
            es: 'Artículo de ejemplo de Comledge en móvil',
            en: 'Comledge example article on mobile',
          },
          caption: {
            es: 'El contenido y la tabla se adaptan a la pantalla.',
            en: 'The content and table adapt to the screen.',
          },
          mobile: true,
        },
        {
          image: clSectionsMobile,
          alt: {
            es: 'Secciones de Comledge en móvil',
            en: 'Comledge sections on mobile',
          },
          caption: {
            es: 'La administración de secciones también funciona en móvil.',
            en: 'Section administration also works on mobile.',
          },
          mobile: true,
        },
      ],
    },
  ],
  cestia: [
    {
      title: { es: 'Resumen y grupo', en: 'Overview and group' },
      items: [
        {
          image: ceDashboard,
          alt: {
            es: 'Resumen de Cestia con gasto real, grupos y compras recientes',
            en: 'Cestia overview with actual spend, groups and recent purchases',
          },
          caption: {
            es: 'Resumen con gasto real, grupos y compras recientes.',
            en: 'Overview with actual spend, groups and recent purchases.',
          },
        },
        {
          image: ceGroup,
          alt: {
            es: 'Grupo Casa Demo con su lista compartida y actividad',
            en: 'Casa Demo group with its shared list and activity',
          },
          caption: {
            es: 'Grupo compartido con listas, integrantes y actividad.',
            en: 'Shared group with lists, members and activity.',
          },
        },
      ],
    },
    {
      title: { es: 'Listas y compras', en: 'Lists and purchases' },
      items: [
        {
          image: ceList,
          alt: {
            es: 'Lista Compra semanal con artículos comprados y pendientes',
            en: 'Weekly shopping list with purchased and pending items',
          },
          caption: {
            es: 'Compra semanal: artículos pendientes, comprados y aportaciones.',
            en: 'Weekly shopping: pending and purchased items, plus contributions.',
          },
        },
        {
          image: cePurchaseDialog,
          alt: {
            es: 'Formulario de registro de compra de Cestia con datos ficticios',
            en: 'Cestia purchase form with fictional data',
          },
          caption: {
            es: 'Registro de compra con comprador, pagador e importe real.',
            en: 'Purchase form with purchaser, payer and actual amount.',
          },
        },
      ],
    },
    {
      title: { es: 'Personas y acceso', en: 'People and access' },
      items: [
        {
          image: ceMembers,
          alt: {
            es: 'Integrantes del grupo Casa Demo con roles e invitación por correo',
            en: 'Casa Demo group members with roles and email invitation',
          },
          caption: {
            es: 'Integrantes con roles e invitación por correo.',
            en: 'Members with roles and email invitation.',
          },
        },
        {
          image: ceInvitations,
          alt: {
            es: 'Invitación pendiente del grupo Casa Demo',
            en: 'Pending invitation for the Casa Demo group',
          },
          caption: {
            es: 'Invitación pendiente con reenvío y cancelación.',
            en: 'Pending invitation with resend and cancel actions.',
          },
        },
      ],
    },
    {
      title: { es: 'Gastos e historial', en: 'Expenses and history' },
      items: [
        {
          image: ceExpenses,
          alt: {
            es: 'Gastos reales del grupo Casa Demo sin deudas ni liquidaciones',
            en: 'Actual expenses for Casa Demo without debts or settlements',
          },
          caption: {
            es: 'Gastos reales por grupo, sin balances ni liquidaciones.',
            en: 'Actual expenses by group, without balances or settlements.',
          },
        },
        {
          image: ceHistory,
          alt: {
            es: 'Historial de compras y aportaciones del grupo Casa Demo',
            en: 'Purchase and contribution history for Casa Demo',
          },
          caption: {
            es: 'Historial de compras con atribuciones de comprador y pagador.',
            en: 'Purchase history with purchaser and payer attribution.',
          },
        },
      ],
    },
    {
      title: { es: 'En móvil', en: 'On mobile' },
      layout: 'mobile',
      items: [
        {
          image: ceListMobile,
          alt: {
            es: 'Lista compartida de Cestia en pantalla móvil',
            en: 'Cestia shared list on a mobile screen',
          },
          caption: {
            es: 'La lista conserva artículos y aportaciones en móvil.',
            en: 'The list keeps items and contributions on mobile.',
          },
          mobile: true,
        },
        {
          image: ceGroupMobile,
          alt: {
            es: 'Grupo compartido de Cestia en pantalla móvil',
            en: 'Cestia shared group on a mobile screen',
          },
          caption: {
            es: 'Grupo, listas y actividad en una pantalla pequeña.',
            en: 'Group, lists and activity on a small screen.',
          },
          mobile: true,
        },
        {
          image: ceExpensesMobile,
          alt: {
            es: 'Gastos reales de Cestia en pantalla móvil',
            en: 'Cestia actual expenses on a mobile screen',
          },
          caption: {
            es: 'Gastos del grupo con su resumen real, sin deudas.',
            en: 'Group expenses with the actual summary, without debts.',
          },
          mobile: true,
        },
        {
          image: ceHistoryMobile,
          alt: {
            es: 'Historial de Cestia en pantalla móvil',
            en: 'Cestia history on a mobile screen',
          },
          caption: {
            es: 'Historial con comprador, pagador y registro.',
            en: 'History with purchaser, payer and recorder.',
          },
          mobile: true,
        },
      ],
    },
  ],
}

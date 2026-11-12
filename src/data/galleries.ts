import type { ImageMetadata } from 'astro'
import ncAgenda from '@/assets/projects/neuraclinic/agenda.png'
import ncAgendaMobile from '@/assets/projects/neuraclinic/agenda-mobile.png'
import ncAssessment from '@/assets/projects/neuraclinic/assessment.png'
import ncNote from '@/assets/projects/neuraclinic/note.png'
import ncPatients from '@/assets/projects/neuraclinic/patients.png'
import ncRecord from '@/assets/projects/neuraclinic/record.png'
import clHome from '@/assets/projects/comledge/home.png'
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
  neuraclinic: ncRecord,
  comledge: clHome,
  cestia: ceList,
}

export const galleries: Record<string, GalleryGroup[]> = {
  neuraclinic: [
    {
      title: { es: 'El contexto del caso', en: 'The case context' },
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
      title: { es: 'Agenda, pacientes y evaluación', en: 'Schedule, patients and assessment' },
      items: [
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
      ],
    },
  ],
  comledge: [
    {
      title: { es: 'Administración y acceso', en: 'Administration and access' },
      items: [
        {
          image: clHome,
          alt: {
            es: 'Pantalla de inicio de Comledge con datos de ejemplo',
            en: 'Comledge home screen with example data',
          },
          caption: {
            es: 'Inicio del espacio de conocimiento con artículos y actividad.',
            en: 'Knowledge workspace home with articles and activity.',
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

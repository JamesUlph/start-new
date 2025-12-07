import { addTodo, listTodos } from './todos';
import { addDoc, getCase, newCases } from './cases';
import { consultations } from './consultations';

import { getMultimediaTypes } from './reference';
import { getComments, getExams, getMultimedia } from './exams';
import { getQuickResolveReferences } from './quickresolve';
import { getUsers, getGeneratedDocuments } from './surreal';
import { getGeneratedDocument } from './docs';
import { getBucketImage, getBucketMetadata, getBucketMetaData } from './amazon';

export default {
  listTodos,
  addTodo,
  case: {
    getCase,
    newCases,
    addDoc,
  },
  consultations: {
    consultations,
  },
  docs: {
    getGeneratedDocument,
  },
  reference: {
    getMultimediaTypes,
  },
  exams: {
    getExams,
    getMultimedia,
    getComments,
  },
  quickResolve: {
    getQuickResolveReferences,
  },

  surreal: {
    getUsers,
    getGeneratedDocuments,
  },
  amazon: {
    getBucketImage,
    getBucketMetadata,
  },
};

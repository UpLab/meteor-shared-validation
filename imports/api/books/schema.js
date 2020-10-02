import * as yup from 'yup';
import { pick } from 'lodash';

const fields = {
  title: yup.string().label('Title').trim().uppercase().strict().required(),
  author: yup.string().label('Author').trim().required(),
  createdAt: yup.date().default(() => new Date()),
};
const schema = yup.object().shape(fields);
export default schema;

export const createBookSchema = yup.object().shape({
  ...pick(fields, ['title', 'author']),
});

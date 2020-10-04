import * as yup from 'yup';

export const fields = {
  title: yup.string().label('Title').trim().uppercase().strict().required(),
  author: yup.string().label('Author').trim().required(),
  createdAt: yup.date().default(() => new Date()),
};

const schema = yup.object().shape(fields);
export default schema;

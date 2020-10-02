import BooksCollection from './collection';
import BookSchema from './schema';

class BooksModel {
  collection = BooksCollection;

  async create(formValues) {
    const doc = BookSchema.cast(formValues);
    await BookSchema.validate(doc);
    const id = this.collection.insert(doc);
    return this.collection.findOne(id);
  }

  deleteById(_id) {
    this.collection.remove({ _id });
    return _id;
  }

  getAll() {
    return this.collection.find({}, { sort: { createdAt: -1 } });
  }
}

export default new BooksModel();

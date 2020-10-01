import { Mongo } from 'meteor/mongo';

const LinksCollection = new Mongo.Collection('links');

export default LinksCollection;

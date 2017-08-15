import merge from 'lodash.merge';
import placeResolvers from './Place';
import locationResolvers from './Location';
import userResolvers from './User';

export default merge(placeResolvers, locationResolvers, userResolvers);

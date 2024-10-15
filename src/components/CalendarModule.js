/**
 * This exposes the native CalendarModule module as a JS module. This has a
 * function 'createCalendarEvent' which takes the following parameters:
 *
 * 1. String name: A string representing the name of the destination
 * 2. ReadableMap location: An object representing the location details
 * 3. ReadableArray date: A start and end dates representing the suggested travel date
 */
import {NativeModules} from 'react-native';

const {CalendarModule} = NativeModules;

export default CalendarModule;
